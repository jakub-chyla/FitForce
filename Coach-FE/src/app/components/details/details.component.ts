import {Component, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {MemberService} from "../../service/member.service";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {


  constructor(private service: MemberService,
              private route: ActivatedRoute ) {
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const memberId = params.get('id');
      if (memberId !== null) {
        this.getMemberWithStats(Number(memberId));
      }
    });
  }

  getMemberWithStats(memberId: number) {
    this.service.getMemberWithStats(memberId).subscribe((response) => {
      console.log(response);
    });
  }

}
