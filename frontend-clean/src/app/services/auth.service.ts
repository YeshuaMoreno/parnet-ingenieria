import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginData {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  login(data: LoginData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data);
  }

  guardarSesion(token: string, rol: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('rol', rol);
    localStorage.setItem('auth', 'true');
  }

  logout(): void {
    localStorage.clear();
  }

  estaLogueado(): boolean {
    return localStorage.getItem('auth') === 'true';
  }

  obtenerRol(): string | null {
    return localStorage.getItem('rol');
  }
}