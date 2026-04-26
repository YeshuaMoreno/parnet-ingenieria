import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  username = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    this.error = '';

    const data = {
      username: this.username,
      password: this.password
    };

    this.authService.login(data).subscribe({
      next: (res) => {
        this.authService.guardarSesion(res.token, res.rol);

        if (res.rol === 'admin') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/productos']);
        }
      },
      error: () => {
        this.error = 'Usuario o contraseña incorrectos';
      }
    });
  }
}