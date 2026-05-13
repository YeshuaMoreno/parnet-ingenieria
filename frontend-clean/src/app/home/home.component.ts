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

interface ServicioCatalogo {
  id: number;
  nombre: string;
  area: string;
  descripcion: string;
  estatus: string;
}

interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  precio: number;
  estatus: string;
  imagen: string;
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
  serviciosCatalogo: ServicioCatalogo[] = [];
  productos: Producto[] = [];
  busquedaProductos = '';
  visitas = 7899;

  // =========================
  // SLIDER
  // =========================

  slideActual = 0;
  sliderTimer: ReturnType<typeof setInterval> | null = null;

  slides: string[] = [
    '/assets/content/representacion_flash.png',
    '/assets/content/bloque 1 content/Callcentre.png',
    '/assets/content/bloque 2 content/Imax.png'
  ];

  serviciosVisuales = [
    {
      nombre: 'Telecomunicaciones',
      imagen: '/assets/content/servicios/telecomunicaciones.png'
    },
    {
      nombre: 'Control de Acceso',
      imagen: '/assets/content/servicios/acceso.png'
    },
    {
      nombre: 'Corriente Regulada',
      imagen: '/assets/content/servicios/regulada.png'
    },
    {
      nombre: 'Sala de Juntas',
      imagen: '/assets/content/servicios/juntas.png'
    },
    {
      nombre: 'Voceo',
      imagen: '/assets/content/servicios/voceo.png'
    },
    {
      nombre: 'CCTV',
      imagen: '/assets/content/servicios/cctv.png'
    }
  ];

  casosExito = [
    {
      nombre: 'Chrysler',
      imagen: '/assets/content/casos/chrysler.png'
    },
    {
      nombre: 'Magna',
      imagen: '/assets/content/casos/magna.jpg'
    },
    {
      nombre: 'Nemak',
      imagen: '/assets/content/casos/nemak.png'
    },
    {
      nombre: 'Holcim Apasco',
      imagen: '/assets/content/casos/logo-apasco_13.jpg'
    },
    {
      nombre: 'Axtel',
      imagen: '/assets/content/casos/axtel.png'
    },
    {
      nombre: 'Stabilus',
      imagen: '/assets/content/casos/stabilus.jpg'
    },
    {
      nombre: 'Takata',
      imagen: '/assets/content/casos/takata.jpg'
    },
    {
      nombre: 'Leon Automotive Interiors',
      imagen: '/assets/content/casos/leon.jpg'
    },
    {
      nombre: 'GST Autoleather',
      imagen: '/assets/content/casos/autoleather.jpg'
    },
    {
      nombre: 'Peñoles',
      imagen: '/assets/content/casos/penoles.jpg'
    },
    {
      nombre: 'PEMSA',
      imagen: '/assets/content/casos/pemsa.jpg'
    },
    {
      nombre: 'Stoneridge',
      imagen: '/assets/content/casos/stoneridge.jpg'
    },
    {
      nombre: 'Amistad Industrial Developers',
      imagen: '/assets/content/casos/amistad.jpg'
    }
  ];
  certificaciones = [
    {
      nombre: 'CommScope',
      imagen: '/assets/content/certificaciones/compose.png'
    },
    {
      nombre: 'Cablofil',
      imagen: '/assets/content/certificaciones/descarga.png'
    },
    {
      nombre: 'Leviton',
      imagen: '/assets/content/certificaciones/leviton_logo.png'
    },
    {
      nombre: 'Syscom',
      imagen: '/assets/content/certificaciones/logo_syscom.png'
    },
    {
      nombre: 'Ortronics',
      imagen: '/assets/content/certificaciones/ortronics_legrand.png'
    },
    {
      nombre: 'Panduit',
      imagen: '/assets/content/certificaciones/panduit-logo.png'
    },
    {
      nombre: 'Rosslare',
      imagen: '/assets/content/certificaciones/rosslare_logo.png'
    }
  ];
  telecomActual = 0;
  telecomTimer: ReturnType<typeof setInterval> | null = null;

  telecomSlides = [
    {
      titulo: 'Instalación F.O. Aérea',
      imagen: '/assets/menu_vertical/servicios/Telecomunicacion/Cables.jpeg'
    },
    {
      titulo: 'Climatización',
      imagen: '/assets/menu_vertical/servicios/Telecomunicacion/Clima.jpeg'
    },
    {
      titulo: 'Conmutadores',
      imagen: '/assets/menu_vertical/servicios/Telecomunicacion/Conmutadores.jpeg'
    },
    {
      titulo: 'Data Center',
      imagen: '/assets/menu_vertical/servicios/Telecomunicacion/DataCenter.jpeg'
    },
    {
      titulo: 'Voz y Datos',
      imagen: '/assets/menu_vertical/servicios/Telecomunicacion/Datos.jpeg'
    },
    {
      titulo: 'Gabinetes',
      imagen: '/assets/menu_vertical/servicios/Telecomunicacion/Gabinetes.jpeg'
    },
    {
      titulo: 'Switches',
      imagen: '/assets/menu_vertical/servicios/Telecomunicacion/Switches.jpeg'
    }
  ];
  corrienteActual = 0;
  corrienteTimer: ReturnType<typeof setInterval> | null = null;

  corrienteSlides = [
    {
      titulo: 'UPS APC',
      imagen: '/assets/menu_vertical/servicios/Corriente/U.jpeg'
    },
    {
      titulo: 'UPS Básico',
      imagen: '/assets/menu_vertical/servicios/Corriente/UP.jpeg'
    },
    {
      titulo: 'UPS Industrial',
      imagen: '/assets/menu_vertical/servicios/Corriente/UPS.jpeg'
    },
    {
      titulo: 'UPS APC Torre',
      imagen: '/assets/menu_vertical/servicios/Corriente/UPPS.jpeg'
    },
    {
      titulo: 'UPS Eaton',
      imagen: '/assets/menu_vertical/servicios/Corriente/UPSS.jpeg'
    },
    {
      titulo: 'UPS Empresarial',
      imagen: '/assets/menu_vertical/servicios/Corriente/UUPS.jpeg'
    },
    {
      titulo: 'UPS Rack',
      imagen: '/assets/menu_vertical/servicios/Corriente/UUPSS.jpeg'
    },
    {
      titulo: 'UPS Respaldo',
      imagen: '/assets/menu_vertical/servicios/Corriente/UUPPS.jpeg'
    },
    {
      titulo: 'UPS Alta Capacidad',
      imagen: '/assets/menu_vertical/servicios/Corriente/UUPPSS.jpeg'
    }
  ];

  cctvActual = 0;
  cctvTimer: ReturnType<typeof setInterval> | null = null;

  cctvSlides = [
    {
      titulo: 'Pantallas',
      imagen: '/assets/menu_vertical/servicios/CCTV/Pantallas.jpeg'
    },
    {
      titulo: 'Cámara Fija',
      imagen: '/assets/menu_vertical/servicios/CCTV/Camara.jpeg'
    },
    {
      titulo: 'Domos IP',
      imagen: '/assets/menu_vertical/servicios/CCTV/DomosIP.jpeg'
    },
    {
      titulo: 'Domos de Movimiento',
      imagen: '/assets/menu_vertical/servicios/CCTV/DomosMovimiento.jpeg'
    }
  ];

  redesActual = 0;
  redesTimer: ReturnType<typeof setInterval> | null = null;

  redesSlides = [
    {
      titulo: 'Tableros y CCM',
      imagen: '/assets/menu_vertical/servicios/Redes/Tableros.jpg',
      descripcion: 'Fabricación de tableros eléctricos, centros de control de motores, transferencias y tableros generales de distribución.',
      puntos: [
        'Tableros de distribución primarios y secundarios.',
        'Centros de control de motores CCM fijos y extraíbles.',
        'Transferencias automáticas y manuales.',
        'Tableros generales de distribución NEMA.'
      ]
    },
    {
      titulo: 'Iluminación',
      imagen: '/assets/menu_vertical/servicios/Redes/Iluminacion.jpg',
      descripcion: 'Diseño e implementación de proyectos llave en mano para iluminación en diferentes industrias y aplicaciones.',
      puntos: [
        'Iluminación perimetral para plantas productivas.',
        'Iluminación para centros de distribución.',
        'Iluminación solar.',
        'Diseño de iluminación para áreas especiales.'
      ]
    },
    {
      titulo: 'Sistemas de Potencia',
      imagen: '/assets/menu_vertical/servicios/Redes/Potencia.jpg',
      descripcion: 'Diseño e instalación de sistemas eléctricos industriales para potencia, control y comunicación.',
      puntos: [
        'Diseño e instalación de subestaciones eléctricas.',
        'Conectividad de fuerza con electroductos.',
        'Comunicaciones industriales en cobre y fibra óptica.',
        'Montajes e instalación de acometidas eléctricas.'
      ]
    },
    {
      titulo: 'Automatización y Control Industrial',
      imagen: '/assets/menu_vertical/servicios/Redes/Automatizacion.jpg',
      descripcion: 'Desarrollo de proyectos integrales con tecnologías de automatización industrial, sistemas SCADA y control de procesos.',
      puntos: [
        'Automatización industrial con PLC.',
        'Supervisión de variables de campo.',
        'Sistemas de control centralizado y descentralizado.',
        'SCADA para supervisión y control en tiempo real.'
      ]
    }
  ];

  datacentersActual = 0;
  datacentersTimer: ReturnType<typeof setInterval> | null = null;

  datacentersSlides = [
    {
      titulo: 'Climatización',
      imagen: '/assets/menu_vertical/servicios/DATACENTERS/Clima.jpeg'
    },
    {
      titulo: 'Gabinetes',
      imagen: '/assets/menu_vertical/servicios/DATACENTERS/gabinete.jpeg'
    },
    {
      titulo: 'Switches',
      imagen: '/assets/menu_vertical/servicios/DATACENTERS/switch.jpeg'
    }
  ];

  // =========================
  // CLIENTES
  // =========================

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
      url: 'https://www.ift.org.mx/'
    }
  ];

  // =========================
  // CONTACTO / SUGERENCIAS
  // =========================

  modoContacto: 'correo' | 'sugerencia' = 'correo';

  contacto = {
    empresa: '',
    nombre: '',
    telefono: '',
    correo: '',
    asunto: 'Contacto desde ParNet Ingeniería',
    mensaje: ''
  };

  sugerencia = {
    nombre: '',
    correo: '',
    mensaje: ''
  };

  // =========================
  // SOLICITUD DE SERVICIO
  // =========================

  servicio = {
    nombre: '',
    correo: '',
    area: 'Telecomunicaciones',
    detalle: ''
  };

  // =========================
  // CAPTCHA
  // =========================

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
  this.cargarServiciosCatalogo();
  this.cargarProductos();
  this.iniciarTelecomSlider();
  this.generarCaptcha();
  this.iniciarSlider();
  this.iniciarCorrienteSlider();
  this.iniciarCctvSlider();
  this.iniciarRedesSlider();
  this.iniciarDatacentersSlider();
}

  ngOnDestroy(): void {
    this.detenerSlider();
    this.detenerTelecomSlider();
    this.detenerCorrienteSlider();
    this.detenerCctvSlider();
    this.detenerDatacentersSlider();
    this.detenerRedesSlider();
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
  // CATÁLOGO DE SERVICIOS
  // =========================

  cargarServiciosCatalogo(): void {
    this.http.get<ServicioCatalogo[]>('http://127.0.0.1:8000/api/servicios').subscribe({
      next: (res) => {
        this.serviciosCatalogo = res.filter(s =>
          s.estatus?.trim().toLowerCase() === 'activo'
        );

        if (this.serviciosCatalogo.length > 0) {
          this.servicio.area = this.serviciosCatalogo[0].nombre;
        }

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando catálogo de servicios', err);

        this.serviciosCatalogo = [
          {
            id: 0,
            nombre: 'Telecomunicaciones',
            area: 'General',
            descripcion: '',
            estatus: 'Activo'
          }
        ];

        this.servicio.area = 'Telecomunicaciones';
        this.cdr.detectChanges();
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

  seleccionarSlide(index: number): void {
    this.slideActual = index;
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
      const mensaje = 'Captcha incorrecto. Intenta de nuevo.';
      this.generarCaptcha();
      this.captchaError = mensaje;
      return false;
    }

    this.captchaError = '';
    return true;
  }

  // =========================
  // CONTACTO POR CORREO
  // =========================

  enviarContacto(): void {
    const correoDestino = 'rylm04@outlook.com';

    const asunto = encodeURIComponent(
      this.contacto.asunto || 'Contacto desde ParNet Ingeniería'
    );

    const cuerpo = encodeURIComponent(
      `Empresa: ${this.contacto.empresa}\n` +
      `Nombre: ${this.contacto.nombre}\n` +
      `Teléfono: ${this.contacto.telefono}\n` +
      `Correo: ${this.contacto.correo}\n\n` +
      `Mensaje:\n${this.contacto.mensaje}`
    );

    window.location.href =
      `mailto:${correoDestino}?subject=${asunto}&body=${cuerpo}`;

    this.contacto = {
      empresa: '',
      nombre: '',
      telefono: '',
      correo: '',
      asunto: 'Contacto desde ParNet Ingeniería',
      mensaje: ''
    };
  }

  // =========================
  // SUGERENCIAS CON CAPTCHA
  // =========================

  enviarSugerencia(): void {
    if (!this.validarCaptcha()) {
      return;
    }

    this.http.post('http://127.0.0.1:8000/api/sugerencias', this.sugerencia)
      .subscribe({
        next: () => {
          alert('Sugerencia enviada correctamente.');

          this.sugerencia = {
            nombre: '',
            correo: '',
            mensaje: ''
          };

          this.generarCaptcha();
        },
        error: (err) => {
          console.error('Error enviando sugerencia', err);
          alert('No se pudo enviar la sugerencia. Revisa el backend.');
        }
      });
  }

  // =========================
  // SOLICITUD DE SERVICIO CON CAPTCHA
  // =========================

  enviarSolicitudServicio(): void {
    if (!this.validarCaptcha()) {
      return;
    }

    this.http.post('http://127.0.0.1:8000/api/servicios/solicitar', this.servicio)
      .subscribe({
        next: () => {
          alert('Solicitud de servicio registrada correctamente.');

          this.servicio = {
            nombre: '',
            correo: '',
            area: this.serviciosCatalogo.length > 0
              ? this.serviciosCatalogo[0].nombre
              : 'Telecomunicaciones',
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

  cargarProductos(): void {
    this.http.get<Producto[]>('http://127.0.0.1:8000/api/productos').subscribe({
      next: (res) => {
        this.productos = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando productos', err);
        this.productos = [];
      }
    });
  }

  get productosFiltrados(): Producto[] {
    const texto = this.busquedaProductos.trim().toLowerCase();

    if (!texto) {
      return this.productos;
    }

    return this.productos.filter(p =>
      p.nombre.toLowerCase().includes(texto) ||
      p.categoria.toLowerCase().includes(texto) ||
      p.descripcion.toLowerCase().includes(texto) ||
      p.estatus.toLowerCase().includes(texto)
    );
  }

  getImagenProducto(producto: Producto): string {
    if (!producto.imagen) {
      return '/assets/content/representacion_flash.png';
    }

    if (producto.imagen.startsWith('http')) {
      return producto.imagen;
    }

    if (producto.imagen.startsWith('/assets')) {
      return producto.imagen;
    }

    if (producto.imagen.startsWith('/static')) {
      return `http://127.0.0.1:8000${producto.imagen}`;
    }

    return producto.imagen;
  }

  abrirPdfProducto(id: number): void {
    window.open(`http://127.0.0.1:8000/api/productos/${id}/pdf`, '_blank');
  }

  iniciarTelecomSlider(): void {
    this.detenerTelecomSlider();

    this.telecomTimer = setInterval(() => {
      this.siguienteTelecomSlide();
      this.cdr.detectChanges();
    }, 3500);
  }

  detenerTelecomSlider(): void {
    if (this.telecomTimer) {
      clearInterval(this.telecomTimer);
      this.telecomTimer = null;
    }
  }

  siguienteTelecomSlide(): void {
    this.telecomActual++;

    if (this.telecomActual >= this.telecomSlides.length) {
      this.telecomActual = 0;
    }
  }

  anteriorTelecomSlide(): void {
    this.telecomActual--;

    if (this.telecomActual < 0) {
      this.telecomActual = this.telecomSlides.length - 1;
    }
  }

  siguienteTelecomManual(): void {
    this.siguienteTelecomSlide();
    this.iniciarTelecomSlider();
  }

  anteriorTelecomManual(): void {
    this.anteriorTelecomSlide();
    this.iniciarTelecomSlider();
  }

  iniciarCorrienteSlider(): void {
    this.detenerCorrienteSlider();

    this.corrienteTimer = setInterval(() => {
      this.siguienteCorrienteSlide();
      this.cdr.detectChanges();
    }, 3500);
  }

  detenerCorrienteSlider(): void {
    if (this.corrienteTimer) {
      clearInterval(this.corrienteTimer);
      this.corrienteTimer = null;
    }
  }

  siguienteCorrienteSlide(): void {
    this.corrienteActual++;

    if (this.corrienteActual >= this.corrienteSlides.length) {
      this.corrienteActual = 0;
    }
  }

  anteriorCorrienteSlide(): void {
    this.corrienteActual--;

    if (this.corrienteActual < 0) {
      this.corrienteActual = this.corrienteSlides.length - 1;
    }
  }

  siguienteCorrienteManual(): void {
    this.siguienteCorrienteSlide();
    this.iniciarCorrienteSlider();
  }

  anteriorCorrienteManual(): void {
    this.anteriorCorrienteSlide();
    this.iniciarCorrienteSlider();
  }

  iniciarCctvSlider(): void {
    this.detenerCctvSlider();

    this.cctvTimer = setInterval(() => {
      this.siguienteCctvSlide();
      this.cdr.detectChanges();
    }, 3500);
  }

  detenerCctvSlider(): void {
    if (this.cctvTimer) {
      clearInterval(this.cctvTimer);
      this.cctvTimer = null;
    }
  }

  siguienteCctvSlide(): void {
    this.cctvActual++;

    if (this.cctvActual >= this.cctvSlides.length) {
      this.cctvActual = 0;
    }
  }

  anteriorCctvSlide(): void {
    this.cctvActual--;

    if (this.cctvActual < 0) {
      this.cctvActual = this.cctvSlides.length - 1;
    }
  }

  siguienteCctvManual(): void {
    this.siguienteCctvSlide();
    this.iniciarCctvSlider();
  }

  anteriorCctvManual(): void {
    this.anteriorCctvSlide();
    this.iniciarCctvSlider();
  }

  iniciarRedesSlider(): void {
    this.detenerRedesSlider();

    this.redesTimer = setInterval(() => {
      this.siguienteRedesSlide();
      this.cdr.detectChanges();
    }, 3500);
  }

  detenerRedesSlider(): void {
    if (this.redesTimer) {
      clearInterval(this.redesTimer);
      this.redesTimer = null;
    }
  }

  siguienteRedesSlide(): void {
    this.redesActual++;

    if (this.redesActual >= this.redesSlides.length) {
      this.redesActual = 0;
    }
  }

  anteriorRedesSlide(): void {
    this.redesActual--;

    if (this.redesActual < 0) {
      this.redesActual = this.redesSlides.length - 1;
    }
  }

  siguienteRedesManual(): void {
    this.siguienteRedesSlide();
    this.iniciarRedesSlider();
  }

  anteriorRedesManual(): void {
    this.anteriorRedesSlide();
    this.iniciarRedesSlider();
  }

  iniciarDatacentersSlider(): void {
    this.detenerDatacentersSlider();

    this.datacentersTimer = setInterval(() => {
      this.siguienteDatacentersSlide();
      this.cdr.detectChanges();
    }, 3500);
  }

  detenerDatacentersSlider(): void {
    if (this.datacentersTimer) {
      clearInterval(this.datacentersTimer);
      this.datacentersTimer = null;
    }
  }

  siguienteDatacentersSlide(): void {
    this.datacentersActual++;

    if (this.datacentersActual >= this.datacentersSlides.length) {
      this.datacentersActual = 0;
    }
  }

  anteriorDatacentersSlide(): void {
    this.datacentersActual--;

    if (this.datacentersActual < 0) {
      this.datacentersActual = this.datacentersSlides.length - 1;
    }
  }

  siguienteDatacentersManual(): void {
    this.siguienteDatacentersSlide();
    this.iniciarDatacentersSlider();
  }

  anteriorDatacentersManual(): void {
    this.anteriorDatacentersSlide();
    this.iniciarDatacentersSlider();
  }


}