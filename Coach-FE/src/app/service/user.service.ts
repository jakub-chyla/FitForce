import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = 'http://localhost:8222/auth/';
  token: string;
  email: string | null = '';

  constructor(private httpClient: HttpClient) {
    this.token = localStorage.getItem('token') as string;
  }

  createUser(user: User): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}register`, user);
  }

  authUser(user: User): Observable<Object> {
    let email = user.email;

    return this.httpClient.post(`${this.baseURL}auth/authenticate`, user).pipe(
      tap((response: any) => {

        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        localStorage.setItem('email', response.email);

        if (typeof email === "string") {
          localStorage.setItem('email', email);
          window.dispatchEvent(new StorageEvent('storage', {
            key: 'email',
            newValue: email
          }));
        }
      })
    );
  }
}
