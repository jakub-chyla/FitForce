import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../card/card.component";
import {NgForOf} from "@angular/common";
import {MemberService} from "../../service/member.service";
import {MemberEventService} from "../../service/member-event-service.service";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {Member} from "../../model/member";
import {AuthHelper} from "../../util/auth-helper";

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [
    CardComponent,
    NgForOf
  ],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss'
})
export class ControlPanelComponent implements OnInit {

  constructor(private service: MemberService) {
  }

  members: Member[] = [];


  ngOnInit() {
    this.getMembers(AuthHelper.getUserIdAsNumber());

  }

  getMembers(userId: number) {
    this.service.getAllMembers(userId).subscribe((response) => {
      this.members = response;
    });
  }

}
