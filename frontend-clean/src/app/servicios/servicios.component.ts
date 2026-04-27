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
    this.http.post(`${this.apiUrl}/servicios/solicitar`, this.form)
      .subscribe({
        next: () => {
          alert('Solicitud enviada 🚀');
          this.form = { nombre:'', correo:'', area:'', detalle:'' };
        },
        error: () => alert('Error al enviar')
      });
  }
}