import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Member} from "../model/member";
import {Goal} from "../model/goal";
import {FullMemberResponse} from "../model/fullMemberResponse";
import {Weight} from "../model/weight";
import {environment} from "../../environments/environment";
import {Training} from "../model/training";
import {WeightDto} from "../dto/weightDto";
import {WeightData} from "../dto/weightData";

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

  getStatsForMemberId(memberId: number): Observable<FullMemberResponse> {
    return this.httpClient.get<FullMemberResponse>(`${this.stats}/${memberId}`, this.getHeaderWithToken());
  }

  getWeightsByMemberID(memberId: number): Observable<WeightDto[]> {
    return this.httpClient.get<WeightDto[]>(`${this.stats}/weights/${memberId}`, this.getHeaderWithToken());
  }

  addMember(member: Member): Observable<Member> {
    return this.httpClient.post(`${this.coach}`, member, this.getHeaderWithToken());
  }

  updateMember(member: Member): Observable<Member> {
    return this.httpClient.patch(`${this.coach}`, member, this.getHeaderWithToken());
  }

  saveWeight(weight: WeightData): Observable<WeightData> {
    return this.httpClient.post<WeightData>(`${this.stats}/save-weight`, weight, this.getHeaderWithToken());
  }

  saveTraining(training: Training): Observable<Training> {
    return this.httpClient.post<Training>(`${this.stats}/save-training`, training, this.getHeaderWithToken());
  }

  deleteTraining(trainingId: number): Observable<number> {
    return this.httpClient.delete<number>(`${this.stats}/training/${trainingId}`, this.getHeaderWithToken());
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
