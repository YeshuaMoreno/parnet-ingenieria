import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface SolicitudServicio {
  id: number;
  nombre: string;
  correo: string;
  area: string;
  detalle: string;
  fecha: string;
}

@Component({
  selector: 'app-admin-solicitudes-servicio',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule],
  templateUrl: './admin-solicitudes-servicio.component.html'
})
export class AdminSolicitudesServicioComponent implements OnInit {

  apiUrl = 'http://127.0.0.1:8000/api/servicios/solicitudes';

  solicitudes: SolicitudServicio[] = [];
  cargando = false;
  error = '';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes(): void {
    this.cargando = true;
    this.error = '';
    this.cdr.detectChanges();

    this.http.get<SolicitudServicio[]>(this.apiUrl).subscribe({
      next: (res) => {
        console.log('SOLICITUDES RECIBIDAS EN ANGULAR:', res);

        this.solicitudes = Array.isArray(res) ? res : [];
        this.cargando = false;

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('ERROR CARGANDO SOLICITUDES:', err);

        this.solicitudes = [];
        this.error = 'No se pudieron cargar las solicitudes.';
        this.cargando = false;

        this.cdr.detectChanges();
      }
    });
  }

  eliminarSolicitud(id: number): void {
    const confirmar = confirm('¿Deseas eliminar esta solicitud?');

    if (!confirmar) {
      return;
    }

    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.solicitudes = this.solicitudes.filter(s => s.id !== id);
        this.cdr.detectChanges();
        alert('Solicitud eliminada correctamente.');
      },
      error: (err) => {
        console.error('ERROR ELIMINANDO SOLICITUD:', err);
        alert('No se pudo eliminar la solicitud.');
      }
    });
  }
}