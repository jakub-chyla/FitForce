import {HttpHeaders} from "@angular/common/http";

export class AuthHelper {
  public static getTokenHeader() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token') as string}`
      })
    };
  }

  public static getId() {
    return localStorage.getItem('userId');
  }

  public static getIdAsNumber(): number  {
    return Number(localStorage.getItem('userId'));
  }


  public static getToken() {
    return localStorage.getItem('token');
  }

  public static logOut() {
    return localStorage.setItem('token', '');
  }
}
