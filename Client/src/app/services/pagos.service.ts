import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Pagos } from '../interfaces/Pagos';

@Injectable({
  providedIn: 'root',
})
export class PagosService {
  private apiUrl = 'http://localhost:3000/historial/pagos';

  constructor(private http: HttpClient) {}

  async obtenerDatos(UserId: number): Promise<Pagos[]> {
    try {
      // Usa lastValueFrom para manejar el observable
      return await lastValueFrom(this.http.get<Pagos[]>(`${this.apiUrl}/${UserId}`));
    } catch (error) {
      console.error('Error al obtener datos de pagos:', error);
      return []; // Devuelve un array vacío en caso de error
    }
  }
}
