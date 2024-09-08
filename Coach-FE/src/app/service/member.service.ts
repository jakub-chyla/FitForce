import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Member} from "../model/Member";
import {Goal} from "../model/Goal";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private baseURL = 'http://localhost:8222/api/v1/members'

  constructor(private  httpClient: HttpClient) {

  }

  getMembers(): Observable<Member[]>{
    return this.httpClient.get<Member[]>(`${this.baseURL}`);
  }

  getMemberWithStats(memberId: number): Observable<Member> {
    return this.httpClient.get<Member>(`${this.baseURL}/with-stats/${memberId}`);
  }

  addMember(member: Member): Observable<Member>{
    return this.httpClient.post(`${this.baseURL}`, member);
  }

  deleteMember(memberId: number): Observable<void>{
    return this.httpClient.delete<void>(`${this.baseURL}/with-stats/${memberId}`);
  }

  getGoals(): Observable<Goal[]>{
    return this.httpClient.get<Goal[]>(`${this.baseURL}/goals`);
  }
}
