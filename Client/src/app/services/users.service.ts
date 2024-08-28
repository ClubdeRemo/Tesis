import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:3000/user';


  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/user`);
  }

  getUser(id:number): Observable<User>{
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
}


/* Cuando usas un servicio en un componente, como UsersService, lo que haces es invocar métodos del servicio para realizar 
tareas como enviar datos al backend. Estos métodos del servicio devuelven observables (Observable), 
que es una manera de manejar datos asincrónicos en Angular. */