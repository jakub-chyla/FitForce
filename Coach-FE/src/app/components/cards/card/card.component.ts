import {Component, Input} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {Card} from "../../../model/Card";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {Router} from "@angular/router";
import {MatTabsModule} from "@angular/material/tabs";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatDividerModule, MatTabsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  constructor( private router: Router) {
  }

  @Input() card?: Card

  editMember() {
    this.router.navigate(['edit', this.card?.id]);
  }

}
