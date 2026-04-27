import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  apiUrl = 'http://127.0.0.1:8000/api';
  cargando = true;

  general = {
    productos: 0,
    servicios: 0,
    sugerencias: 0,
    noticias: 0,
    visitas: 0
  };

  productosStats = {
    total: 0,
    existencia: 0,
    agotado: 0,
    por_categoria: {} as Record<string, number>
  };

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.http.get<any>(`${this.apiUrl}/dashboard/general`).subscribe({
      next: (res) => {
        this.general = res;
        this.cargarProductosStats();
      },
      error: (err) => {
        console.error(err);
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  cargarProductosStats(): void {
    this.http.get<any>(`${this.apiUrl}/dashboard/productos`).subscribe({
      next: (res) => {
        this.productosStats = res;

        this.cargando = false;
        this.cdr.detectChanges();

        setTimeout(() => {
          this.crearGraficas();
        }, 300);
      },
      error: (err) => {
        console.error(err);
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  crearGraficas(): void {
    new Chart('chartEstatus', {
      type: 'doughnut',
      data: {
        labels: ['Existencia', 'Agotado'],
        datasets: [{
          data: [
            this.productosStats.existencia,
            this.productosStats.agotado
          ]
        }]
      }
    });

    new Chart('chartCategorias', {
      type: 'bar',
      data: {
        labels: Object.keys(this.productosStats.por_categoria),
        datasets: [{
          label: 'Productos por categoría',
          data: Object.values(this.productosStats.por_categoria)
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    new Chart('chartGeneral', {
      type: 'bar',
      data: {
        labels: ['Productos', 'Servicios', 'Sugerencias', 'Noticias', 'Visitas'],
        datasets: [{
          label: 'Registros generales',
          data: [
            this.general.productos,
            this.general.servicios,
            this.general.sugerencias,
            this.general.noticias,
            this.general.visitas
          ]
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}