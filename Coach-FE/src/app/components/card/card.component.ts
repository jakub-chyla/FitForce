import {Component, Input, OnInit, Output} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import {Member} from "../../model/member";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {EditMemberComponent} from "../edit-member/edit-member.component";
import {NotificationComponent} from "./notification/notification.component";
import {MemberEventService} from "../../service/member-event-service.service";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatDividerModule, MatTabsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  @Input() member?: Member
  @Output() onDelete?: Member;

  constructor(private router: Router,
              private dialog: MatDialog,
              private memberEventService: MemberEventService ) {
  }

  ngOnInit() {
  }

  editMember() {
    const dialogRef = this.dialog.open(EditMemberComponent, {
      autoFocus: false,
      width: '620px',
      data: this.member
    });
    dialogRef.componentInstance.onSave.subscribe((response) => {
      this.member = (response);
    });
  }

  deleteMember() {
    const dialogRef = this.dialog.open(NotificationComponent, {
      autoFocus: false,
      width: '620px',
      data: this.member
    });

    dialogRef.componentInstance.onDelete.subscribe(() => {
      this.router.navigate(['main', this.member?.id]);
    });
  }

  openDetails() {
    if (this.member) {
      this.memberEventService.passMember(this.member);
    }
    this.router.navigate(['details', this.member?.id]);
  }

}
