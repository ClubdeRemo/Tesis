import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private apiUrl = 'http://localhost:3000/reportes';

  constructor(private http: HttpClient) {}

  async obtenerDatos() : Promise<any>{
    try {
      const datos = await lastValueFrom(this.http.get<any>(`${this.apiUrl}`));
      return datos;
    } catch (error) {
      console.error('Error al obtener datos:', error);
      throw error;
    }
  }
  
  async enviarDatos(data: any) : Promise<any>{
    try {
      const res = await lastValueFrom(this.http.post<any>(`${this.apiUrl}`, data)); 
      return res;
    } catch (error) {
      console.error('Error al obtener datos:', error);
      throw error;
    }
}
}
