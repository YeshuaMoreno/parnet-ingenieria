import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Noticia {
  id: number;
  titulo: string;
  contenido: string;
  imagen: string;
  estatus: string;
}

interface Cliente {
  nombre: string;
  imagen: string;
  url: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  seccion = 'inicio';

  noticias: Noticia[] = [];
  visitas = 7899;

  // SLIDER
  slideActual = 0;
  sliderTimer: ReturnType<typeof setInterval> | null = null;

  slides: string[] = [
    '/assets/content/representacion_flash.png',
    '/assets/content/bloque 1 content/Callcentre.png',
    '/assets/content/bloque 2 content/Imax.png'
  ];

  // CLIENTES
  clientes: Cliente[] = [
    {
      nombre: 'Cisco Systems',
      imagen: '/assets/footer/vista.png',
      url: 'https://www.cisco.com/'
    },
    {
      nombre: 'Panduit',
      imagen: '/assets/header/logotipo.png',
      url: 'https://www.panduit.com/'
    },
    {
      nombre: 'Telecomunicaciones',
      imagen: '/assets/header/antenas.png',
      url: 'https://www.google.com/search?q=telecomunicaciones'
    }
  ];

  // CONTACTO
  contacto = {
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: ''
  };

  // SOLICITUD DE SERVICIO
  servicio = {
    nombre: '',
    correo: '',
    area: 'Telecomunicaciones',
    detalle: ''
  };

  // CAPTCHA
  captchaA = 0;
  captchaB = 0;
  captchaRespuesta = '';
  captchaError = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.registrarVisita();
    this.cargarNoticias();
    this.generarCaptcha();
    this.iniciarSlider();
  }

  ngOnDestroy(): void {
    this.detenerSlider();
  }

  // =========================
  // NAVEGACIÓN
  // =========================

  cambiarSeccion(valor: string): void {
    this.seccion = valor;
  }

  irLogin(): void {
    this.router.navigate(['/login']);
  }

  // =========================
  // NOTICIAS
  // =========================

  cargarNoticias(): void {
    this.http.get<Noticia[]>('http://127.0.0.1:8000/api/noticias').subscribe({
      next: (res) => {
        this.noticias = res
          .filter(n => n.estatus?.trim().toLowerCase() === 'activo')
          .slice(0, 5);
      },
      error: (err) => {
        console.error('Error cargando noticias', err);
        this.noticias = [];
      }
    });
  }

  // =========================
  // VISITAS
  // =========================

  registrarVisita(): void {
    const guardadas = localStorage.getItem('parnet_visitas');

    if (guardadas) {
      this.visitas = parseInt(guardadas, 10) + 1;
    } else {
      this.visitas = this.visitas + 1;
    }

    localStorage.setItem('parnet_visitas', this.visitas.toString());
  }

  get visitasArray(): string[] {
    return this.visitas.toString().padStart(5, '0').split('');
  }

  // =========================
// SLIDER
// =========================

iniciarSlider(): void {
  this.detenerSlider();

  this.sliderTimer = setInterval(() => {
    this.siguienteSlide();
    this.cdr.detectChanges();
  }, 3500);
}

detenerSlider(): void {
  if (this.sliderTimer) {
    clearInterval(this.sliderTimer);
    this.sliderTimer = null;
  }
}

siguienteSlide(): void {
  this.slideActual++;

  if (this.slideActual >= this.slides.length) {
    this.slideActual = 0;
  }
}

anteriorSlide(): void {
  this.slideActual--;

  if (this.slideActual < 0) {
    this.slideActual = this.slides.length - 1;
  }
}

siguienteSlideManual(): void {
  this.siguienteSlide();
  this.iniciarSlider();
}

anteriorSlideManual(): void {
  this.anteriorSlide();
  this.iniciarSlider();
}

  // =========================
  // CAPTCHA
  // =========================

  generarCaptcha(): void {
    this.captchaA = Math.floor(Math.random() * 8) + 1;
    this.captchaB = Math.floor(Math.random() * 8) + 1;
    this.captchaRespuesta = '';
    this.captchaError = '';
  }

  validarCaptcha(): boolean {
    const esperado = this.captchaA + this.captchaB;
    const recibido = Number(this.captchaRespuesta);

    if (recibido !== esperado) {
      this.captchaError = 'Captcha incorrecto. Intenta de nuevo.';
      this.generarCaptcha();
      return false;
    }

    this.captchaError = '';
    return true;
  }

  // =========================
  // CONTACTO
  // =========================

  enviarContacto(): void {
    if (!this.validarCaptcha()) {
      return;
    }

    const asunto = encodeURIComponent(
      this.contacto.asunto || 'Contacto desde ParNet Ingeniería'
    );

    const cuerpo = encodeURIComponent(
      `Nombre: ${this.contacto.nombre}\n` +
      `Correo: ${this.contacto.correo}\n\n` +
      `Mensaje:\n${this.contacto.mensaje}`
    );

    window.location.href =
      `mailto:contacto@parnetingenieria.com?subject=${asunto}&body=${cuerpo}`;

    this.contacto = {
      nombre: '',
      correo: '',
      asunto: '',
      mensaje: ''
    };

    this.generarCaptcha();
  }

  // =========================
  // SOLICITUD DE SERVICIO
  // =========================

  enviarSolicitudServicio(): void {
    if (!this.validarCaptcha()) {
      return;
    }

    this.http.post('http://127.0.0.1:8000/api/servicios/solicitudes', this.servicio)
      .subscribe({
        next: () => {
          alert('Solicitud de servicio registrada correctamente.');

          this.servicio = {
            nombre: '',
            correo: '',
            area: 'Telecomunicaciones',
            detalle: ''
          };

          this.generarCaptcha();
        },
        error: (err) => {
          console.error('Error registrando solicitud', err);
          alert('No se pudo registrar la solicitud. Revisa el backend.');
        }
      });
  }
}