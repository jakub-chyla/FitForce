import {Component, OnInit} from '@angular/core';
import {Member} from "../../model/member";
import {MatDialog} from "@angular/material/dialog";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MemberService} from "../../service/member.service";
import {AddComponent} from "../add/add.component";
import {CommonModule} from "@angular/common";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MemberEventService} from "../../service/member-event-service.service";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {AuthHelper} from "../../util/auth-helper";
import {CardComponent} from "../card/card.component";
import {User} from "../../model/user";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CardComponent,
    CommonModule,
    MatTooltipModule,
    MatFabButton,
    MatIcon
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  constructor(private service: MemberService,
              private dialog: MatDialog,
              private memberEventService: MemberEventService,
              private userService: UserService,
              private router: Router) {
  }

  members: Member[] = [];
  isTokenValid = false;
  user?: User;

  ngOnInit() {
    this.userService.user$.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });

    if (AuthHelper.getToken() === null) {
      if (!this.isTokenValid || AuthHelper.getToken() === null) {
        this.router.navigate(['/log-in']);
      }
    }

    this.userService.checkIsTokenValid().subscribe(isValid => {
      if (isValid && this.user?.id) {
        this.isTokenValid = true;
        this.getMembers(this.user?.id);
      }

      if (!this.isTokenValid || AuthHelper.getToken() === null) {
        this.router.navigate(['/log-in']);
      }

      this.memberEventService.member$.subscribe((deletedMember) => {
        if (deletedMember) {
          this.members = this.members.filter(m => m.id !== deletedMember.id);
        }
      });
    });

  }

  getMembers(userId: number) {
    this.service.getMembers(userId).subscribe((response) => {
      this.members = response;
    });
  }

  addMember() {
    const dialogRef = this.dialog.open(AddComponent, {
      autoFocus: false,
      width: '620px',
    });
    dialogRef.componentInstance.onSave.subscribe((response) => {
      this.members.push(response)
    });
  }
}
