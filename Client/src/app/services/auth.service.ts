import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl + '/auth/signin';

  constructor(private http: HttpClient) {}

 // Método para iniciar sesión y almacenar el token
  signIn(credentials: { Id: string; Nombre: string; Contraseña: string }): Observable<{ token: string, user: { id: string, nombre: string, rol: string } }> {
  return this.http.post<{ token: string, user: { id: string, nombre: string, rol: string } }>(this.apiUrl, credentials).pipe(catchError(this.handleError));
}


// Almacenar el token en localStorage (ahora público)
public storeToken(token: string): void {  // Cambiar a public
  localStorage.setItem('token', token);
}

// Obtener el token desde localStorage
getToken(): string | null {
  return localStorage.getItem('token');
}

// Decodificar el token para obtener datos del usuario (incluyendo el Id)
getUserIdFromToken(): string | null {
  const token = this.getToken();
  if (token) {
    try {
      const decoded: { sub: string } = jwtDecode(token); // `sub` representa el ID en el token
      return decoded.sub || null;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }
  return null;
}

public getUserCategoryFromToken(): string | null {
  const token = this.getToken();
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token); // Decodificar el token
    return decoded.categoria; // Campo `categoria` en el token
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null;
  }
}

// Método para cerrar sesión y eliminar el token
logout(): void {
  localStorage.removeItem('token');
}

private handleError(error: HttpErrorResponse) {
  let errorMessage = 'Ocurrió un error inesperado. Por favor, intenta nuevamente.';
  
  if (error.status === 401) {
    errorMessage = 'Credenciales inválidas. Por favor, verifica que tu usuario y contraseña sean correctos.';
  } else if (error.status === 0) {
    errorMessage = 'No se puede conectar al servidor. Verifica tu conexión a Internet.';
  }

  // Devuelve el error para que pueda ser manejado por otros componentes si es necesario
  return throwError(() => new Error(errorMessage));
}
}