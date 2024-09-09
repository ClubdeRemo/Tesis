import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:3000/user';


  constructor(private http: HttpClient) {}

  async obtenerDatos() : Promise<any>{
    try {
      const datos = await lastValueFrom(this.http.get<User>(`${this.apiUrl}`));
      return datos;
    } catch (error) {
      console.error('Error al obtener datos:', error);
      throw error;
    }
  }
  
  async enviarDatos(data: any) : Promise<any>{
    try {
      const res = await lastValueFrom(this.http.post<User>(`${this.apiUrl}/form`, data)); //toPromise estaba deprecado NO FUNCIONA
      return res;
    } catch (error) {
      console.error('Error al obtener datos:', error);
      throw error;
    }
}
}
  /* getUser(id:number): Observable<User>{
  return this.http.get<User>(`${this.apiUrl}/user/${id}`);
} 

  createUser(user:User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/form`, user);
  }

  deleteUser(id:number): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/delete?userID=${id}`);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update?userID=${id}`,user);
  }
} */


/* Cuando usas un servicio en un componente, como UsersService, lo que haces es invocar métodos del servicio para realizar 
tareas como enviar datos al backend. Estos métodos del servicio devuelven observables (Observable), 
que es una manera de manejar datos asincrónicos en Angular.*/