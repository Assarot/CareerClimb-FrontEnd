import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, tap } from 'rxjs/operators';
import { RegisterDto } from './dto/register-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private isUserAuthenticated: boolean | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {
    window.addEventListener('storage', (event) => {
      if (event.key === 'authToken') {
        const token = localStorage.getItem('authToken');
        if (token && this.isAuthenticated()) {
          console.info('Sesión activa detectada en otra pestaña.');
        } else {
          this.logout();
        }
      }
    });
  }

  login(credentials: {
    username: string;
    password: string;
  }): Observable<{ accessToken: string; refreshToken: string }> {
    return this.http
      .post<{ accessToken: string; refreshToken: string }>(
        `${this.apiUrl}/login`,
        credentials
      )
      .pipe(
        tap((response) => {
          this.setAccessToken(response.accessToken);
          this.setRefreshToken(response.refreshToken);
          console.info('Inicio de sesión exitoso.');
        }),
        catchError((error) => {
          console.error('Error en el login:', error);
          throw error;
        })
      );
  }

  register(registerDto: RegisterDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, registerDto).pipe(
      tap((response) => {
        console.log('Registro exitoso:', response);
      }),
      catchError((error) => {
        console.error('Error al registrar usuario:', error);
        return of(error);
      })
    );
  }

  logout(): void {
    const refreshToken = this.getRefreshToken();
    this.clearTokens();
    localStorage.removeItem('authToken');
    if (refreshToken) {
      this.http.post(`${this.apiUrl}/logout`, { refreshToken }).subscribe({
        next: () => console.info('Sesión cerrada con éxito.'),
        error: (err) => console.error('Error al cerrar sesión:', err),
      });
    }
    this.router.navigate(['']);
  }

  refreshAccessToken(): Observable<string | null> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      console.error('No se encontró un refresh token.');
      return of(null);
    }
    return this.http
      .post<{ accessToken: string }>(`${this.apiUrl}/refresh`, { refreshToken })
      .pipe(
        map((response) => {
          const newAccessToken = response.accessToken;
          if (newAccessToken) {
            this.setAccessToken(newAccessToken);
            return newAccessToken;
          }
          return null;
        }),
        catchError((error) => {
          console.error('Error al renovar el token de acceso:', error);
          this.clearTokens();
          return of(null);
        })
      );
  }

  isAuthenticated(): boolean {
    if (this.isUserAuthenticated !== null) {
      return this.isUserAuthenticated;
    }

    const token = this.getAccessToken();
    this.isUserAuthenticated = token
      ? !this.jwtHelper.isTokenExpired(token)
      : false;
    return this.isUserAuthenticated;
  }

  getFullName(): string | null {
    const token = this.getAccessToken();
    if (!token || this.jwtHelper.isTokenExpired(token)) return null;
    return this.jwtHelper.decodeToken(token)?.nombreCompleto || null;
  }

  getRoles(): string[] {
    const token = this.getAccessToken();
    if (!token) return [];
    try {
      return this.jwtHelper.decodeToken(token)?.roles?.split(',') || [];
    } catch (error) {
      console.error('Error al decodificar roles:', error);
      return [];
    }
  }

  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  private setAccessToken(token: string): void {
    sessionStorage.setItem('accessToken', token);
    localStorage.setItem('authToken', token);
    this.isUserAuthenticated = true;
  }

  private setRefreshToken(token: string): void {
    localStorage.setItem('refreshToken', token);
  }

  public getAccessToken(): string | null {
    return (
      localStorage.getItem('authToken') || sessionStorage.getItem('accessToken')
    );
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  public getRolesSinPrefijo(): string[] {
    const roles = this.getRoles();
    return roles.map((role) =>
      role.startsWith('ROLE_') ? role.substring(5) : role
    );
  }

  private clearTokens(): void {
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('authToken');
    this.isUserAuthenticated = null;
  }
}
