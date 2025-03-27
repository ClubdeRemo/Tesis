import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, lastValueFrom, Observable } from 'rxjs';
import { environment } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private apiUrl = environment.apiUrl + '/reportes';

  constructor(private http: HttpClient) {}

  async obtenerDatos(): Promise<any> {
    try {
      return await lastValueFrom(this.http.get<any>(`${this.apiUrl}`));
    } catch (error) {
      console.error('Error al obtener datos:', error);
      throw error;
    }
  }

  async enviarDatos(data: any): Promise<any> {
    try {
      return await lastValueFrom(this.http.post<any>(`${this.apiUrl}`, data));
    } catch (error) {
      console.error('Error al enviar datos:', error);
      throw error;
    }
  }

  async eliminarMensaje(IdMensaje: string): Promise<any> {
    try {
      return await lastValueFrom(this.http.delete<any>(`${this.apiUrl}/${IdMensaje}`));
    } catch (error) {
      console.error('Error al eliminar mensaje:', error);
      throw error;
    }
  }
   // Obtener un mensaje específico por ID
    async obtenerMensajePorId(IdMensaje: number): Promise<any> {
    try {
      return await lastValueFrom(this.http.get<any>(`${this.apiUrl}/${IdMensaje}`));
    } catch (error) {
      console.error('Error al obtener el mensaje:', error);
      throw error;
    }
  }

  // Modificar un mensaje
  async modificarMensaje(IdMensaje: number, nuevoMensaje: string): Promise<any> {
    try {
      const data = { Mensaje: nuevoMensaje };
      return await lastValueFrom(this.http.put<any>(`${this.apiUrl}/modificar/${IdMensaje}`, data));
    } catch (error) {
      console.error('Error al modificar mensaje:', error);
      throw error;
    }
  }
}