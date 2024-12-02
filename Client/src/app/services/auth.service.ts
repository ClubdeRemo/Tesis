import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/auth/signin';

  constructor(private http: HttpClient) {}

 // Método para iniciar sesión y almacenar el token
 signIn(credentials: { Id: string; Nombre: string; Contraseña: string }): Observable<{ token: string, user: { id: string, nombre: string, rol: string } }> {
  return this.http.post<{ token: string, user: { id: string, nombre: string, rol: string } }>(this.apiUrl, credentials);
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
}