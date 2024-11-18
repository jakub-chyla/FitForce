import {Component, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {MemberService} from "../../service/member.service";
import {ProgressComponent} from "./progress/progress.component";
import {Member} from "../../model/member";
import {FullMemberResponse} from "../../model/fullMemberResponse";
import {TrainingsComponent} from "./trainings/trainings.component";
import {DietComponent} from "./diet/diet.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    RouterModule, ProgressComponent, TrainingsComponent, DietComponent, NgForOf],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  id: number = 0;
  selectedTab: number = 0;
  tabLinks: { path: string; label: string }[] = [];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
    });

    this.tabLinks = [
      { path: `progress`, label: 'Progress' },
      { path: `trainings`, label: 'Trainings' },
      { path: `diet`, label: 'Diet' },
    ];
  }

  logSelectedIndex(index: number): void {
    this.selectedTab = index;
  }

}
