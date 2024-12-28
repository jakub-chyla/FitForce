import {HttpHeaders} from "@angular/common/http";

export class AuthHelper {
  public static getHeaderWithToken() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token') as string}`
      })
    };
  }

  public static getToken() {
    return localStorage.getItem('token');
  }

}
