import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Member} from "../model/member";
import {Goal} from "../model/goal";
import {FullMemberResponse} from "../model/fullMemberResponse";
import {Weight} from "../model/weight";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private baseURL = 'http://localhost:8222/api/v1/members'

  constructor(private httpClient: HttpClient) {

  }

  getMembers(userId: number): Observable<Member[]> {
    return this.httpClient.get<Member[]>(`${this.baseURL}/${userId}`, this.getHeaderWithToken());
  }

  getMemberWithStats(memberId: number): Observable<Member> {
    return this.httpClient.get<FullMemberResponse>(`${this.baseURL}/with-stats/${memberId}`, this.getHeaderWithToken());
  }

  addMember(member: Member): Observable<Member> {
    return this.httpClient.post(`${this.baseURL}`, member, this.getHeaderWithToken());
  }

  updateMember(member: Member): Observable<Member> {
    return this.httpClient.patch(`${this.baseURL}`, member, this.getHeaderWithToken());
  }

  saveWeight(weight: Weight): Observable<Member> {
    return this.httpClient.post(`http://localhost:8222/api/v1/stats`, weight, this.getHeaderWithToken());
  }

  deleteMember(memberId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/with-stats/${memberId}`, this.getHeaderWithToken());
  }

  getGoals(): Observable<Goal[]> {
    return this.httpClient.get<Goal[]>(`${this.baseURL}/goals`, this.getHeaderWithToken());
  }

  private getHeaderWithToken() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token') as string}`
      })
    };
  }
}
