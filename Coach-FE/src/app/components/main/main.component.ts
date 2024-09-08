import {Component, Input, OnInit} from '@angular/core';
import {Member} from "../../model/Member";
import {MatDialog} from "@angular/material/dialog";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MemberService} from "../../service/member.service";
import {AddComponent} from "../add/add.component";
import {CardComponent} from "./card/card.component";
import {CommonModule} from "@angular/common";
import {MatTooltipModule} from "@angular/material/tooltip";
import {NotificationComponent} from "./card/notification/notification.component";
import {MemberEventService} from "../../service/member-event-service.service";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CardComponent,
    CommonModule,
    MatTooltipModule,
    MatFabButton,
    MatIcon,
    NotificationComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit  {

  constructor(private service: MemberService,
              private dialog: MatDialog,
              private memberEventService: MemberEventService) {
  }

  members: Member[] = [];

  ngOnInit() {
    this.getMembers();

    this.memberEventService.memberDeleted$.subscribe((deletedMember) => {
      if (deletedMember) {
        this.members = this.members.filter(m => m.id !== deletedMember.id);
      }
    });
  }

  getMembers() {
    this.service.getMembers().subscribe((response) => {
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
