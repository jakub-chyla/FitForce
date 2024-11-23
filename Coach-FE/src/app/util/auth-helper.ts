import {HttpHeaders} from "@angular/common/http";

export class AuthHelper {
    public static getHeaderWithToken() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token') as string}`
      })
    };
  }

  public static getUserId() {
    return localStorage.getItem('userId');
  }

  public static getUserIdAsNumber(): number  {
    return Number(localStorage.getItem('userId'));
  }

  public static getToken() {
    return localStorage.getItem('token');
  }

  public static logOut() {
    return localStorage.setItem('token', '');
  }
}
