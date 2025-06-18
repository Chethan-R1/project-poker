import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface UserDetails{
  userId:string;
  username:string;
  firstUser:boolean;
  
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = 'http://localhost:8080/api/users';

  constructor(private http:HttpClient) { }

   getAllUsers(): Observable<UserDetails[]> {
    return this.http.get<UserDetails[]>(`${this.baseUrl}`);
  }

  addUser(user: UserDetails): Observable<UserDetails> {
    return this.http.post<UserDetails>(`${this.baseUrl}`, user);
  }

   isFirstUser(userId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/isFirstUser/${userId}`);
  }

deleteUser(user: UserDetails) {
  return this.http.delete<void>(`${this.baseUrl}/${user.userId}`);
}

}
