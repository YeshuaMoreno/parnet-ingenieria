import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

interface Noticia {
  id: number;
  titulo: string;
  contenido: string;
  imagen: string;
  estatus: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  seccion = 'inicio';
  noticias: Noticia[] = [];
  visitas = 7899;

  constructor(private http: HttpClient, private router: Router) {}


  ngOnInit(): void {
    this.registrarVisita();
    this.cargarNoticias();
  }

  cargarNoticias(): void {
    this.http.get<Noticia[]>('http://127.0.0.1:8000/api/noticias').subscribe({
      next: (res) => {
        console.log('Noticias recibidas:', res);

        this.noticias = res
          .filter(n => n.estatus?.trim().toLowerCase() === 'activo')
          .slice(0, 5);

        console.log('Noticias filtradas:', this.noticias);
      },
      error: (err) => {
        console.error('Error cargando noticias', err);
      }
    });
  }

  irLogin(): void {
    this.router.navigate(['/login']);
  }

  registrarVisita(): void {
    const guardadas = localStorage.getItem('parnet_visitas');
    this.visitas = guardadas ? parseInt(guardadas) + 1 : this.visitas + 1;
    localStorage.setItem('parnet_visitas', this.visitas.toString());
  }

  get visitasArray(): string[] {
    return this.visitas.toString().padStart(5, '0').split('');
  }
}