import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {User} from "../model/user";
import {AuthRequest} from "../model/auth-request";
import {AuthHelper} from "../util/auth-helper";
import {UserDto} from "../dto/user-dto";
import {environment} from "../../environments/environment";
import {AUTH, V1} from "../util/api-url";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  domain = environment.gateway + V1 + AUTH;

  constructor(private httpClient: HttpClient) {
  }

  createUser(user: User): Observable<string> {
    return this.httpClient.post<string>(`${this.domain}/register`, user);
  }

  singIn(authRequest: AuthRequest): Observable<UserDto> {
    return this.httpClient.post<UserDto>(`${this.domain}/log-in`, authRequest).pipe(
      tap((response: UserDto) => {
        localStorage.setItem('name', String(authRequest.username));
        localStorage.setItem('userId', String(response.id));
        localStorage.setItem('token', String(response.token));
        localStorage.setItem('role', String(response.role));
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
