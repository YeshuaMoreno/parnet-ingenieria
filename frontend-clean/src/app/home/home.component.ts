import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  precio: number;
  estatus: string;
  imagen: string;
}

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
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  seccion: string = 'inicio'; 

  productos: Producto[] = [];
  noticias: Noticia[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.registrarVisita();
    this.cargarProductos();
    this.cargarNoticias();
  }

  cambiarSeccion(seccion: string) {
    this.seccion = seccion;
  }
  registrarVisita(): void {
    this.http.post('http://127.0.0.1:8000/api/visitas', {}).subscribe({
      next: () => {},
      error: err => console.error('Error registrando visita', err)
    });
  }

  cargarProductos(): void {
    this.http.get<Producto[]>('http://127.0.0.1:8000/api/productos').subscribe({
      next: res => this.productos = res.slice(0, 6),
      error: err => console.error('Error cargando productos', err)
    });
  }

  cargarNoticias(): void {
    this.http.get<Noticia[]>('http://127.0.0.1:8000/api/noticias').subscribe({
      next: res => this.noticias = res.slice(0, 3),
      error: err => console.error('Error cargando noticias', err)
    });
  }
}