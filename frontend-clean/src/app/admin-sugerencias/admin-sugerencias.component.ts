import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Sugerencia {
  id: number;
  nombre: string;
  correo: string;
  mensaje: string;
  estatus: string;
  fecha?: string;
}

@Component({
  selector: 'app-admin-sugerencias',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-sugerencias.component.html'
})
export class AdminSugerenciasComponent implements OnInit {

  apiUrl = 'http://127.0.0.1:8000/api/sugerencias';

  sugerencias: Sugerencia[] = [];
  cargando = true;

  // Tu HTML usa "pagina + 1", por eso pagina empieza en 0
  pagina = 0;
  limite = 5;
  total = 0;

  async ngOnInit(): Promise<void> {
    await this.cargarSugerencias();
  }

  async cargarSugerencias(): Promise<void> {
    this.cargando = true;

    try {
      const response = await fetch(this.apiUrl);

      if (!response.ok) {
        throw new Error('Error HTTP: ' + response.status);
      }

      const data = await response.json();

      console.log('SUGERENCIAS RECIBIDAS:', data);

      if (Array.isArray(data)) {
        this.sugerencias = data;
        this.total = data.length;
      } else if (Array.isArray(data.sugerencias)) {
        this.sugerencias = data.sugerencias;
        this.total = data.total ?? data.sugerencias.length;
      } else {
        this.sugerencias = [];
        this.total = 0;
      }

      if (this.pagina > this.totalPaginas - 1) {
        this.pagina = Math.max(this.totalPaginas - 1, 0);
      }

    } catch (error) {
      console.error('ERROR CARGANDO SUGERENCIAS:', error);
      this.sugerencias = [];
      this.total = 0;
      alert('No se pudieron cargar las sugerencias.');
    } finally {
      this.cargando = false;
    }
  }

  get totalPaginas(): number {
    return Math.max(1, Math.ceil(this.total / this.limite));
  }

  get sugerenciasPaginadas(): Sugerencia[] {
    const inicio = this.pagina * this.limite;
    const fin = inicio + this.limite;

    return this.sugerencias.slice(inicio, fin);
  }

  anterior(): void {
    if (this.pagina > 0) {
      this.pagina--;
    }
  }

  siguiente(): void {
    if (this.pagina < this.totalPaginas - 1) {
      this.pagina++;
    }
  }

  abrirPdf(): void {
    window.open(`${this.apiUrl}/reporte/pdf`, '_blank');
  }

  abrirExcel(): void {
    window.open(`${this.apiUrl}/reporte/excel`, '_blank');
  }

  async cambiarEstatus(id: number, nuevoEstatus: string): Promise<void> {
    const sugerencia = this.sugerencias.find(s => s.id === id);

    if (!sugerencia) {
      alert('No se encontró la sugerencia.');
      return;
    }

    const payload = {
      nombre: sugerencia.nombre,
      correo: sugerencia.correo,
      mensaje: sugerencia.mensaje,
      estatus: nuevoEstatus
    };

    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Error HTTP: ' + response.status);
      }

      sugerencia.estatus = nuevoEstatus;

      alert('Estatus actualizado correctamente.');

    } catch (error) {
      console.error('ERROR CAMBIANDO ESTATUS:', error);
      alert('No se pudo cambiar el estatus.');
    }
  }

  async eliminar(id: number): Promise<void> {
    const confirmar = confirm('¿Deseas eliminar esta sugerencia?');

    if (!confirmar) {
      return;
    }

    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error HTTP: ' + response.status);
      }

      this.sugerencias = this.sugerencias.filter(s => s.id !== id);
      this.total = this.sugerencias.length;

      if (this.pagina > this.totalPaginas - 1) {
        this.pagina = Math.max(this.totalPaginas - 1, 0);
      }

      alert('Sugerencia eliminada correctamente.');

    } catch (error) {
      console.error('ERROR ELIMINANDO SUGERENCIA:', error);
      alert('No se pudo eliminar la sugerencia.');
    }
  }
}