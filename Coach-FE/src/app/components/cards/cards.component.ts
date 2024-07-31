import {Component, OnInit} from '@angular/core';
import {CardComponent} from "./card/card.component";
import {CommonModule} from "@angular/common";
import {MemberService} from "../../service/member.service";
import {Member} from "../../model/Member";
import {MatDialog} from "@angular/material/dialog";
import {AddComponent} from "../add/add.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    CardComponent,
    CommonModule,
    MatTooltipModule,
    MatFabButton,
    MatIcon,
  ],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  constructor(private service: MemberService,
              private dialog: MatDialog) {
  }

  members: Member[] = [];

  ngOnInit() {
    this.getMembers();
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
