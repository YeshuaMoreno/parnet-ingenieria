import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-servicios',
  imports: [CommonModule, FormsModule],
  templateUrl: './servicios.component.html'
})
export class ServiciosComponent {

  apiUrl = 'http://127.0.0.1:8000/api';

  form = {
    nombre: '',
    correo: '',
    area: '',
    detalle: ''
  };

  constructor(private http: HttpClient) {}

  enviar() {

      if (
      !this.form.nombre.trim() ||
      !this.form.correo.trim() ||
      !this.form.area.trim() ||
      !this.form.detalle.trim()
    ) {
      alert('Todos los campos son obligatorios 🚫');
      return;
    }

    // Validar correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.form.correo)) {
      alert('Correo inválido ❌');
      return;
    }

    // ENVÍO
    this.http.post(`${this.apiUrl}/servicios/solicitar`, this.form)
      .subscribe({
        next: () => {
          alert('Solicitud enviada ');

          // limpiar form
          this.form = {
            nombre: '',
            correo: '',
            area: '',
            detalle: ''
          };
        },
        error: (err) => {
          console.error(err);
          alert('Error al enviar ❌');
        }
      });
  }
}