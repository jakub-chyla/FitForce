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

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CardComponent,
    CommonModule,
    MatTooltipModule,
    MatFabButton,
    MatIcon,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit  {

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
