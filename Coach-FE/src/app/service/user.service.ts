import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {User} from "../model/user";
import {AuthRequest} from "../model/auth-request";
import {AuthHelper} from "../util/auth-helper";
import {environment} from "../../environments/environment";
import {AUTH, LOG_IN, REGISTER, V1, VALIDATE} from "../util/api-url";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  domain = environment.gateway + V1 + AUTH;
  private userSource = new BehaviorSubject<User | null>(null);
  user$ = this.userSource.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  createUser(user: User): Observable<string> {
    return this.httpClient.post(this.domain + REGISTER, user, {
      responseType: 'text'
    });
  }

  logIn(authRequest: AuthRequest): Observable<User> {
    return this.httpClient.post<User>(this.domain + LOG_IN, authRequest).pipe(
      tap((response: User) => {
        if (response) {
          this.emitUser(response);
          localStorage.setItem('token', String(response.token));
        }
      })
    );
  }

  checkToken(): Observable<boolean> {
    return this.httpClient.get<boolean>(this.domain + VALIDATE + `?token=${AuthHelper.getToken()}`);
  }

  checkIsTokenValid(): Observable<boolean> {
    return this.checkToken().pipe(
      map(response => {
        return response;
      }),
    );
  }

  emitUser(user: User) {
    this.userSource.next(user);
  }

}
