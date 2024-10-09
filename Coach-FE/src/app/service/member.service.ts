import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Member} from "../model/member";
import {Goal} from "../model/goal";
import {FullMemberResponse} from "../model/fullMemberResponse";
import {Weight} from "../model/weight";
import {environment} from "../../environments/environment";
import {weightData} from "../dto/weightData";

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private readonly coach: string | undefined;
  private readonly stats: string | undefined;

  constructor(private httpClient: HttpClient) {
    this.coach = environment.gateway + '/api/v1/members';
    this.stats = environment.gateway + '/api/v1/stats';
  }

  getMembers(userId: number): Observable<Member[]> {
    return this.httpClient.get<Member[]>(`${this.coach}/${userId}`, this.getHeaderWithToken());
  }

  getMemberWithStats(memberId: number): Observable<Member> {
    return this.httpClient.get<FullMemberResponse>(`${this.coach}/with-stats/${memberId}`, this.getHeaderWithToken());
  }

  addMember(member: Member): Observable<Member> {
    return this.httpClient.post(`${this.coach}`, member, this.getHeaderWithToken());
  }

  updateMember(member: Member): Observable<Member> {
    return this.httpClient.patch(`${this.coach}`, member, this.getHeaderWithToken());
  }

  saveWeight(weight: weightData): Observable<weightData> {
    return this.httpClient.post<weightData>(`${this.stats}`, weight, this.getHeaderWithToken());
  }

  deleteMember(memberId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.coach}/with-stats/${memberId}`, this.getHeaderWithToken());
  }

  getGoals(): Observable<Goal[]> {
    return this.httpClient.get<Goal[]>(`${this.coach}/goals`, this.getHeaderWithToken());
  }

  private getHeaderWithToken() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token') as string}`
      })
    };
  }
}
