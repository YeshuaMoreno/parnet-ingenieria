import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Sugerencia {
  id: number;
  nombre: string;
  correo: string;
  mensaje: string;
  estatus: string;
  fecha: string;
}

@Component({
  selector: 'app-admin-sugerencias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-sugerencias.component.html'
})
export class AdminSugerenciasComponent implements OnInit {

  apiUrl = 'http://127.0.0.1:8000/api/sugerencias';

  sugerencias: Sugerencia[] = [];
  total = 0;
  pagina = 0;
  limit = 5;
  eliminandoId: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    const skip = this.pagina * this.limit;

    this.http.get<any>(`${this.apiUrl}?skip=${skip}&limit=${this.limit}`).subscribe({
      next: (res) => {
        this.sugerencias = res.sugerencias;
        this.total = res.total;
      }
    });
  }

  siguiente(): void {
    if ((this.pagina + 1) * this.limit >= this.total) return;
    this.pagina++;
    this.cargar();
  }

  anterior(): void {
    if (this.pagina === 0) return;
    this.pagina--;
    this.cargar();
  }

  cambiarEstatus(id: number, estatus: string): void {
    this.http.put(`${this.apiUrl}/${id}`, { estatus }).subscribe({
      next: () => this.cargar()
    });
  }

eliminar(id: number): void {
    if (!id || this.eliminandoId === id) return;

    if (!confirm('¿Eliminar sugerencia?')) return;

    this.eliminandoId = id;

    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.sugerencias = this.sugerencias.filter(s => s.id !== id);
        this.total = Math.max(0, this.total - 1);
        this.eliminandoId = null;
      },
      error: (err) => {
        console.error('Error eliminando sugerencia', err);
        this.eliminandoId = null;
      }
    });
  }

  abrirPdf(): void {
    window.open(`${this.apiUrl}/reporte/pdf`, '_blank');
  }

  abrirExcel(): void {
    window.open(`${this.apiUrl}/reporte/excel`, '_blank');
  }
}