import { Injectable } from '@angular/core';
import {Member} from "../model/Member";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MemberEventService {
  private memberDeletedSource = new BehaviorSubject<Member | null>(null);
  memberDeleted$ = this.memberDeletedSource.asObservable();

  deleteMember(member: Member) {
    this.memberDeletedSource.next(member);
  }
}
