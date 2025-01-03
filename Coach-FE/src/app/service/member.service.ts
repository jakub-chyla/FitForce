import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Member} from "../model/member";
import {Goal} from "../model/goal";
import {environment} from "../../environments/environment";
import {Training} from "../model/training";
import {WeightDto} from "../dto/weight.dto";
import {DietDto} from "../dto/diet.dto";
import {Diet} from "../model/diet";
import {AuthHelper} from "../util/auth-helper";
import {ADMIN, DIETS, GOALS, MEMBERS, STATS, TRAININGS, V1, WEIGHTS} from "../util/api-url";

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  coach = environment.gateway + V1 + MEMBERS;
  stats = environment.gateway + V1 + STATS;

  constructor(private httpClient: HttpClient) {
  }

  getMembers(userId: number): Observable<Member[]> {
    return this.httpClient.get<Member[]>(this.coach + `/${userId}`, AuthHelper.getHeaderWithToken());
  }

  getAllMembers(userId: number): Observable<Member[]> {
    return this.httpClient.get<Member[]>(this.coach + ADMIN + `/${userId}`, AuthHelper.getHeaderWithToken());
  }

  getWeightsByMemberId(memberId: number): Observable<WeightDto[]> {
    return this.httpClient.get<WeightDto[]>(this.stats + WEIGHTS + `/${memberId}`, AuthHelper.getHeaderWithToken());
  }

  getTrainingsByMemberId(memberId: number): Observable<Training[]> {
    return this.httpClient.get<Training[]>(this.stats + TRAININGS + `/${memberId}`, AuthHelper.getHeaderWithToken());
  }

  getDietsByMemberId(memberId: number): Observable<DietDto> {
    return this.httpClient.get<DietDto>(this.stats + DIETS + `/${memberId}`, AuthHelper.getHeaderWithToken());
  }

  getGoals(): Observable<Goal[]> {
    return this.httpClient.get<Goal[]>(this.coach + GOALS, AuthHelper.getHeaderWithToken());
  }

  saveMember(member: Member): Observable<Member> {
    return this.httpClient.post(this.coach, member, AuthHelper.getHeaderWithToken());
  }

  saveWeight(weight: WeightDto): Observable<WeightDto[]> {
    return this.httpClient.post<WeightDto[]>(this.stats + WEIGHTS, weight, AuthHelper.getHeaderWithToken());
  }

  saveTraining(training: Training): Observable<Training> {
    return this.httpClient.post<Training>(this.stats + TRAININGS, training, AuthHelper.getHeaderWithToken());
  }

  saveDiet(diet: Diet): Observable<DietDto> {
    return this.httpClient.post<DietDto>(this.stats + DIETS, diet, AuthHelper.getHeaderWithToken());
  }

  updateMember(member: Member): Observable<Member> {
    return this.httpClient.put(this.coach, member, AuthHelper.getHeaderWithToken());
  }

  deleteMember(memberId: number): Observable<void> {
    return this.httpClient.delete<void>(this.coach + `/${memberId}`, AuthHelper.getHeaderWithToken());
  }

  deleteWeight(weightId: number): Observable<WeightDto[]> {
    return this.httpClient.delete<WeightDto[]>(this.stats + WEIGHTS + `/${weightId}`, AuthHelper.getHeaderWithToken());
  }

  deleteTraining(trainingId: number): Observable<Training> {
    return this.httpClient.delete<Training>(this.stats + TRAININGS + `/${trainingId}`, AuthHelper.getHeaderWithToken());
  }

  deleteDiet(dietId: number): Observable<DietDto> {
    return this.httpClient.delete<DietDto>(this.stats + DIETS + `/${dietId}`, AuthHelper.getHeaderWithToken());
  }

}
