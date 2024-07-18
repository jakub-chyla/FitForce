import { Component, OnInit } from '@angular/core';
import { CardComponent } from "./card/card.component";
import { Card } from "../../model/Card";
import { CommonModule } from "@angular/common";
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

  cards: Member[] = [];

  ngOnInit() {
    // this.cards = [
    //   { id: 1, name: 'a' },
    //   { id: 3, name: 'c' },
    //   { id: 4, name: 'd' },
    //   { id: 5, name: 'e' },
    //   { id: 7, name: 'f' }
    // ];


    this.service.getMembers().subscribe((response)=>{

      console.log(response);
      this.cards = response;
    });
  }

  addClock() {
    const dialogRef = this.dialog.open(AddComponent, {
      autoFocus: false,
      width: '620px',
    });
    // dialogRef.componentInstance.onSave.subscribe(() => {
    //   this.handleSaveEvent();
    // });
  }
}
