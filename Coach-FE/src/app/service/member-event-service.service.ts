import {Injectable} from '@angular/core';
import {Member} from "../model/member";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MemberEventService {
  private memberSource = new BehaviorSubject<Member | null>(null);
  member$ = this.memberSource.asObservable();

  passMember(member: Member) {
    this.memberSource.next(member);
  }

}
