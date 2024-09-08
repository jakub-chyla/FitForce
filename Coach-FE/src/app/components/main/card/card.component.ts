import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {Router} from "@angular/router";
import {MatTabsModule} from "@angular/material/tabs";
import {MatDialog} from "@angular/material/dialog";
import {Member} from "../../../model/Member";
import {EditMemberComponent} from "../../edit-member/edit-member.component";
import {NotificationComponent} from "./notification/notification.component";

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
              private dialog: MatDialog) {
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
    this.router.navigate(['details', this.member?.id]);
  }

}
