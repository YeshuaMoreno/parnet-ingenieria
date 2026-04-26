import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sugerencias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sugerencias.component.html'
})
export class SugerenciasComponent {

  sugerencia = {
    nombre: '',
    correo: '',
    mensaje: '',
    captcha: ''
  };

  mensajeExito = '';
  error = '';

  constructor(private http: HttpClient) {}

  enviar(): void {
    this.mensajeExito = '';
    this.error = '';

    if (!this.sugerencia.nombre.trim() || !this.sugerencia.correo.trim() || !this.sugerencia.mensaje.trim()) {
      this.error = 'Completa todos los campos.';
      return;
    }

    this.http.post<any>('http://127.0.0.1:8000/api/sugerencias', this.sugerencia).subscribe({
      next: () => {
        this.mensajeExito = 'Sugerencia enviada correctamente.';
        this.sugerencia = {
          nombre: '',
          correo: '',
          mensaje: '',
          captcha: ''
        };
      },
      error: (err) => {
        this.error = err.error?.detail || 'No se pudo enviar la sugerencia.';
      }
    });
  }
}