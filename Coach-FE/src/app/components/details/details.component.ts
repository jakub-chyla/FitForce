import {Component, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {NgForOf} from "@angular/common";
import {MemberEventService} from "../../service/member-event-service.service";
import {Member} from "../../model/member";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    RouterModule, NgForOf],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  id: number = 0;
  member!: Member;
  tabLinks: { path: string; label: string }[] = [];

  constructor(private route: ActivatedRoute,
              private memberEventService: MemberEventService
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
    });

    this.memberEventService.member$.subscribe((member) => {
      if (member) {
        this.member = member;
      }
    });

    this.tabLinks = [
      {path: `progress`, label: 'Progress'},
      {path: `trainings`, label: 'Trainings'},
      {path: `diet`, label: 'Diet'},
    ];
  }

}
