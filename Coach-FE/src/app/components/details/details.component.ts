import { Component } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {AddComponent} from "../add/add.component";
import {MatDividerModule} from "@angular/material/divider";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [MatCardModule, MatTabsModule, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

  editMember() {

  }

}
