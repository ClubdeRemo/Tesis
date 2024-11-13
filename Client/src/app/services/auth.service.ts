import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/auth/signin';

  constructor(private http: HttpClient) {}
  
  signIn(credentials: { Id: string; Nombre: string; Contraseña: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials);
  }
}
