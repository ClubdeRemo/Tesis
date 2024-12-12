import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { Pagos } from '../interfaces/Pagos';

@Injectable({
  providedIn: 'root',
})
export class PagosService {
  private apiUrl = 'http://localhost:3000/historial/pagos';
  

  constructor(private http: HttpClient) {}

  async obtenerDatos(UserId: number): Promise<{ pagos: Pagos[]; estado: string }> {
    try {
      return await lastValueFrom(this.http.get<{ pagos: Pagos[]; estado: string }>(`${this.apiUrl}/${UserId}`));
    } catch (error) {
      console.error('Error al obtener datos de pagos:', error);
      return { pagos: [], estado: 'Desconocido' }; // Devuelve valores predeterminados en caso de error
    }
  }
  
  agregarPago(pago: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, pago); //La función this.http.post realiza una solicitud POST al endpoint configurado en apiUrl, 
                                                    //enviando el objeto pago en el cuerpo de la solicitud.
  }

  async obtenerTodosPagos(): Promise<{ pagos: Pagos[]; estado: string }> {
    try {
      return await lastValueFrom(this.http.get<{ pagos: Pagos[]; estado: string }>(`${this.apiUrl}/todos`));
    } catch (error) {
      console.error('Error al obtener los pagos de todos los socios:', error);
      return { pagos: [], estado: 'Desconocido' }; // Devuelve valores predeterminados en caso de error
    }
  }

  eliminarPago(idPago: number): Observable<{ mensaje: string; estado: string }> {
    return this.http.delete<{ mensaje: string; estado: string }>(`${this.apiUrl}/${idPago}`);
  }
  


}
