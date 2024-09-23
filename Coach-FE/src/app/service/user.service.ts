import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of, tap} from "rxjs";
import {User} from "../model/user";
import {AuthRequest} from "../model/auth-request";
import {DateHelper} from "../util/date-helper";
import {AuthHelper} from "../util/auth-helper";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = 'http://localhost:8222/auth/';
  constructor(private httpClient: HttpClient) {

  }

  check(): Observable<string> {
    return this.httpClient.get<string>(`${this.baseURL}validate?token=${AuthHelper.getToken()}`);
  }

  createUser(user: User): Observable<string> {
    return this.httpClient.post<string>(`${this.baseURL}register`, user);
  }

  singIn(authRequest: AuthRequest): Observable<string> {
    return this.httpClient.post(`${this.baseURL}token`, authRequest, { responseType: 'text' }).pipe(
      tap((response: any) => {
        localStorage.setItem('name', <string>authRequest.username);
        localStorage.setItem('token', response);
      })
    );
  }

  checkIsTokenValid()  {
    this.check().subscribe(
      (response) => {
        console.log(response)
      }
    );
    return true
  }
}
