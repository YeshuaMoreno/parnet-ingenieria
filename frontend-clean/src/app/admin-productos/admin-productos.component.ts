import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Producto {
  id?: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  precio: number;
  estatus: string;
  imagen: string;
}

@Component({
  selector: 'app-admin-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-productos.component.html'
})
export class AdminProductosComponent implements OnInit {

  apiUrl = 'http://127.0.0.1:8000/api/productos';

  productos: Producto[] = [];
  busqueda = '';

  producto: Producto = {
    nombre: '',
    categoria: '',
    descripcion: '',
    precio: 0,
    estatus: 'Existencia',
    imagen: ''
  };

  editando = false;
  idEditando: number | null = null;
  eliminandoId: number | null = null;
  imagenPreview: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.http.get<Producto[]>(this.apiUrl).subscribe({
      next: (res) => this.productos = res,
      error: (err) => console.error(err)
    });
  }

  guardar(): void {
    if (!this.producto.nombre.trim() || !this.producto.categoria.trim()) {
      alert('Nombre y categoría son obligatorios');
      return;
    }

    if (this.editando && this.idEditando !== null) {
      this.http.put(`${this.apiUrl}/${this.idEditando}`, this.producto).subscribe({
        next: () => {
          this.resetForm();
          this.cargarProductos();
        }
      });
    } else {
      this.http.post(this.apiUrl, this.producto).subscribe({
        next: () => {
          this.resetForm();
          this.cargarProductos();
        }
      });
    }
  }

  editar(p: Producto): void {
    this.editando = true;
    this.idEditando = p.id ?? null;

    this.producto = {
      nombre: p.nombre,
      categoria: p.categoria,
      descripcion: p.descripcion,
      precio: p.precio,
      estatus: p.estatus,
      imagen: p.imagen
    };

    this.imagenPreview = p.imagen;
  }

  eliminar(id: number | undefined): void {
    if (!id || this.eliminandoId === id) return;

    if (!confirm('¿Eliminar producto?')) return;

    this.eliminandoId = id;

    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.productos = this.productos.filter(p => p.id !== id);
        this.eliminandoId = null;
      },
      error: (err) => {
        console.error('Error eliminando producto', err);
        this.eliminandoId = null;
      }
    });
  }

  buscar(): void {
    if (!this.busqueda.trim()) {
      this.cargarProductos();
      return;
    }

    this.http.get<Producto[]>(`${this.apiUrl}/buscar/?q=${this.busqueda}`).subscribe({
      next: (res) => this.productos = res
    });
  }

  subirImagen(event: any): void {
    const file = event.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    this.http.post<any>('http://127.0.0.1:8000/api/productos/upload-imagen', formData)
      .subscribe({
        next: (res) => {
          this.producto.imagen = res.url;
          this.imagenPreview = res.url;
        },
        error: (err) => {
          console.error('Error subiendo imagen', err);
          alert('No se pudo subir la imagen');
        }
      });
  }

  abrirPdf(id: number | undefined): void {
    if (!id) return;
    window.open(`${this.apiUrl}/${id}/pdf`, '_blank');
  }

  abrirReportePdf(): void {
    window.open(`${this.apiUrl}/reporte/pdf`, '_blank');
  }

  abrirReporteExcel(): void {
    window.open(`${this.apiUrl}/reporte/excel`, '_blank');
  }

  resetForm(): void {
    this.producto = {
      nombre: '',
      categoria: '',
      descripcion: '',
      precio: 0,
      estatus: 'Existencia',
      imagen: ''
    };

    this.editando = false;
    this.idEditando = null;
    this.imagenPreview = null;
  }
}