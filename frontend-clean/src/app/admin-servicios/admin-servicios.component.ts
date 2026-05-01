import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

interface Servicio {
  id?: number;
  nombre: string;
  area: string;
  descripcion: string;
  estatus: string;
}

@Component({
  selector: 'app-admin-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-servicios.component.html'
})
export class AdminServiciosComponent implements OnInit {

  apiUrl = 'http://127.0.0.1:8000/api/servicios';

  servicios: Servicio[] = [];
  busqueda = '';

  servicio: Servicio = {
    nombre: '',
    area: '',
    descripcion: '',
    estatus: 'Activo'
  };

  editando = false;
  idEditando: number | null = null;
  eliminandoId: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarServicios();
  }

  cargarServicios(): void {
    this.http.get<Servicio[]>(this.apiUrl).subscribe({
      next: (res) => this.servicios = res,
      error: (err) => console.error('Error cargando servicios', err)
    });
  }

  guardar(): void {
    if (!this.servicio.nombre.trim() || !this.servicio.area.trim()) {
      alert('Nombre y área son obligatorios');
      return;
    }

    if (this.editando && this.idEditando !== null) {
      this.http.put(`${this.apiUrl}/${this.idEditando}`, this.servicio).subscribe({
        next: () => {
          this.resetForm();
          this.cargarServicios();
        },
        error: (err) => console.error('Error actualizando servicio', err)
      });
    } else {
      this.http.post(this.apiUrl, this.servicio).subscribe({
        next: () => {
          this.resetForm();
          this.cargarServicios();
        },
        error: (err) => console.error('Error creando servicio', err)
      });
    }
  }

  editar(s: Servicio): void {
    this.editando = true;
    this.idEditando = s.id ?? null;

    this.servicio = {
      nombre: s.nombre,
      area: s.area,
      descripcion: s.descripcion,
      estatus: s.estatus
    };
  }

  eliminar(id: number | undefined): void {
    if (!id || this.eliminandoId === id) return;

    if (!confirm('¿Eliminar servicio?')) return;

    this.eliminandoId = id;

    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.servicios = this.servicios.filter(s => s.id !== id);
        this.eliminandoId = null;
      },
      error: (err) => {
        console.error('Error eliminando servicio', err);
        this.eliminandoId = null;
      }
    });
  }

  serviciosFiltrados(): Servicio[] {
    const q = this.busqueda.toLowerCase().trim();

    if (!q) return this.servicios;

    return this.servicios.filter(s =>
      s.nombre.toLowerCase().includes(q) ||
      s.area.toLowerCase().includes(q) ||
      s.descripcion.toLowerCase().includes(q) ||
      s.estatus.toLowerCase().includes(q)
    );
  }

  resetForm(): void {
    this.servicio = {
      nombre: '',
      area: '',
      descripcion: '',
      estatus: 'Activo'
    };

    this.editando = false;
    this.idEditando = null;
  }
}