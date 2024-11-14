import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of, tap} from "rxjs";
import {User} from "../model/user";
import {AuthRequest} from "../model/auth-request";
import {AuthHelper} from "../util/auth-helper";
import {UserDto} from "../dto/UserDto";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private domain: string | undefined;

  constructor(private httpClient: HttpClient) {
    this.domain = environment.gateway + '/auth';
  }

  createUser(user: User): Observable<string> {
    return this.httpClient.post<string>(`${this.domain}/register`, user);
  }

  singIn(authRequest: AuthRequest): Observable<UserDto> {
    return this.httpClient.post<UserDto>(`${this.domain}/token`, authRequest).pipe(
      tap((response: UserDto) => {
        localStorage.setItem('name', String(authRequest.username));
        localStorage.setItem('userId', String(response.id));
        localStorage.setItem('token', String(response.token));
      })
    );
  }


  checkToken(): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.domain}/validate?token=${AuthHelper.getToken()}`);
  }

  checkIsTokenValid(): Observable<boolean> {
    return this.checkToken().pipe(
      map(response => {
        return response;
      }),
    );
  }
}
