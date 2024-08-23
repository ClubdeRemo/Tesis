import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:3000/user';


  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>('${this.apiUrl}/user');
  }

  getUser(id:number): Observable<User>{
  return this.http.get<User>('${this.apiUrl}/user/${id}');
} 

  createUser(user:User): Observable<User> {
    return this.http.post<User>('${this.apiUrl}/user/create', user);
  }

  deleteUser(id:number): Observable<User> {
    return this.http.delete<User>('${this.apiUrl}/user/delete?userID=${id}');
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>('${this.apiUrl}/user/update?userID=${id}',user);
  }
}
