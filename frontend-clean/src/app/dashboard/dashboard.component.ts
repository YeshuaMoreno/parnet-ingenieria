import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface DashboardGeneral {
  productos: number;
  servicios: number;
  sugerencias: number;
  noticias: number;
  visitas: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  stats: DashboardGeneral = {
    productos: 0,
    servicios: 0,
    sugerencias: 0,
    noticias: 0,
    visitas: 0
  };

  cargando = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<DashboardGeneral>('http://127.0.0.1:8000/api/dashboard/general')
      .subscribe({
        next: (res) => {
          this.stats = res;
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error cargando dashboard', err);
          this.cargando = false;
        }
      });
  }
}