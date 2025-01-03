import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {User} from "../model/user";
import {AuthRequest} from "../model/auth-request";
import {AuthHelper} from "../util/auth-helper";
import {environment} from "../../environments/environment";
import {AUTH, V1} from "../util/api-url";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  domain = environment.gateway + V1 + AUTH;
  private userSource = new BehaviorSubject<User | null>(null);
  user$ = this.userSource.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  //TODO refactor urls

  createUser(user: User): Observable<string> {
    return this.httpClient.post(`${this.domain}/register`, user, {
      responseType: 'text'
    });
  }

  logIn(authRequest: AuthRequest): Observable<User> {
    return this.httpClient.post<User>(`${this.domain}/log-in`, authRequest).pipe(
      tap((response: User) => {
        if (response) {
          this.emitUser(response);
        }

        //TODO refactor
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

  emitUser(user: User) {
    this.userSource.next(user);
  }

}
