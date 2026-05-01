import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-solicitudes-servicio.component.html'
})
export class AdminSolicitudesServicioComponent implements OnInit {

  apiUrl = 'http://127.0.0.1:8000/api/servicios/solicitudes';

  solicitudes: SolicitudServicio[] = [];
  cargando = true;

  async ngOnInit(): Promise<void> {
    console.log('Componente solicitudes cargado');
    await this.cargarSolicitudes();
  }

  async cargarSolicitudes(): Promise<void> {
    try {
      const response = await fetch(this.apiUrl);

      if (!response.ok) {
        throw new Error('Error HTTP: ' + response.status);
      }

      const data = await response.json();

      console.log('SOLICITUDES RECIBIDAS:', data);

      this.solicitudes = data;
    } catch (error) {
      console.error('ERROR CARGANDO SOLICITUDES:', error);
      alert('No se pudieron cargar las solicitudes');
    } finally {
      this.cargando = false;
    }
  }
}