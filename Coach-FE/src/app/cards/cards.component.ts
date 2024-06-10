import { Component, OnInit } from '@angular/core';
import { CardComponent } from "./card/card.component";
import { Card } from "../model/Card";
import { CommonModule } from "@angular/common";
import {MemberService} from "../service/member.service";
import {Member} from "../model/Member";

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    CardComponent,
    CommonModule
  ],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  constructor(private service: MemberService) {
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

    this.service.getUsers().subscribe((response)=>{

      console.log(response);
      this.cards = response;
    });
  }
}
