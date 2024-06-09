import {Component, OnInit} from '@angular/core';
import {CardComponent} from "./card/card.component";
import {Card} from "../model/Card";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    CardComponent,
    CommonModule
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit {

  cards: Card[] = [];

  ngOnInit() {
    this.cards = [{id: 1, name: 'a'}, {id: 2, name: 'b'}]
  }

}
