import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Member} from "../model/Member";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private baseURL = 'http://localhost:8222/api/v1/members'

  constructor(private  httpClient: HttpClient) {

  }

  getUsers(): Observable<Member[]>{

    return this.httpClient.get<Member[]>(`${this.baseURL}`);
  }
}
