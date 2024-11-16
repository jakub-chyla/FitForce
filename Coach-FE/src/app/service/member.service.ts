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
import {DietDto} from "../dto/dietDto";
import {Diet} from "../model/diet";

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

  getWeightsByMemberId(memberId: number): Observable<WeightDto[]> {
    return this.httpClient.get<WeightDto[]>(`${this.stats}/weights/${memberId}`, this.getHeaderWithToken());
  }

  getTrainingsByMemberId(memberId: number): Observable<Training[]> {
    return this.httpClient.get<Training[]>(`${this.stats}/trainings/${memberId}`, this.getHeaderWithToken());
  }

  getDietsByMemberId(memberId: number): Observable<DietDto> {
    return this.httpClient.get<DietDto>(`${this.stats}/diets/${memberId}`, this.getHeaderWithToken());
  }

  addMember(member: Member): Observable<Member> {
    return this.httpClient.post(`${this.coach}`, member, this.getHeaderWithToken());
  }

  updateMember(member: Member): Observable<Member> {
    return this.httpClient.patch(`${this.coach}`, member, this.getHeaderWithToken());
  }

  saveWeight(weight: WeightDto): Observable<WeightDto[]> {
    return this.httpClient.post<WeightDto[]>(`${this.stats}/save-weight`, weight, this.getHeaderWithToken());
  }

  saveTraining(training: Training): Observable<Training> {
    return this.httpClient.post<Training>(`${this.stats}/save-training`, training, this.getHeaderWithToken());
  }

  saveDiet(diet: Diet): Observable<DietDto> {
    return this.httpClient.post<DietDto>(`${this.stats}/save-diet`, diet, this.getHeaderWithToken());
  }

  deleteMember(memberId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.coach}/with-stats/${memberId}`, this.getHeaderWithToken());
  }

  deleteWeight(weightId: number): Observable<WeightDto[]> {
    return this.httpClient.delete<WeightDto[]>(`${this.stats}/weight/${weightId}`, this.getHeaderWithToken());
  }

  deleteTraining(trainingId: number): Observable<number> {
    return this.httpClient.delete<number>(`${this.stats}/training/${trainingId}`, this.getHeaderWithToken());
  }

  deleteDiet(dietId: number): Observable<DietDto> {
    return this.httpClient.delete<DietDto>(`${this.stats}/diet/${dietId}`, this.getHeaderWithToken());
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
