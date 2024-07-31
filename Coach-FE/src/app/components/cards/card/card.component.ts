import {Component, Input, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {Router} from "@angular/router";
import {MatTabsModule} from "@angular/material/tabs";
import {AddComponent} from "../../add/add.component";
import {MatDialog} from "@angular/material/dialog";
import {Member} from "../../../model/Member";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatDividerModule, MatTabsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit{

  @Input() member?: Member

  constructor( private router: Router,
               private dialog: MatDialog) {
  }
  ngOnInit() {

  }

  editMember() {
    const dialogRef = this.dialog.open(AddComponent, {
      autoFocus: false,
      width: '620px',
    });
  }

  openDetails() {
    this.router.navigate(['details', this.member?.id]);
  }

}
