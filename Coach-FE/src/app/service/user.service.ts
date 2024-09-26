import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of, tap} from "rxjs";
import {User} from "../model/user";
import {AuthRequest} from "../model/auth-request";
import {AuthHelper} from "../util/auth-helper";
import {UserDto} from "../dto/UserDto";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = 'http://localhost:8222/auth/';
  constructor(private httpClient: HttpClient) {
  }

  createUser(user: User): Observable<string> {
    return this.httpClient.post<string>(`${this.baseURL}register`, user);
  }

  singIn(authRequest: AuthRequest): Observable<UserDto> {
    return this.httpClient.post<UserDto>(`${this.baseURL}token`, authRequest).pipe(
      tap((response: UserDto) => {
        console.log(response.id)
        localStorage.setItem('name', String(authRequest.username));
        localStorage.setItem('userId', String(response.id));
        localStorage.setItem('token', String(response.token));
      })
    );
  }


  checkToken(): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseURL}validate?token=${AuthHelper.getToken()}`);
  }

  checkIsTokenValid(): Observable<boolean> {
    return this.checkToken().pipe(
      map(response => {
        return response;
      }),
    );
  }
}
