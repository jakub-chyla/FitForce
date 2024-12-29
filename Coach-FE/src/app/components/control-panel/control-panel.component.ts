import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../card/card.component";
import {NgForOf} from "@angular/common";
import {MemberService} from "../../service/member.service";
import {UserService} from "../../service/user.service";
import {Member} from "../../model/member";

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [
    CardComponent,
    NgForOf
  ],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss'
})
export class ControlPanelComponent implements OnInit {

  constructor(private service: MemberService,
              private userService: UserService) {
  }

  members: Member[] = [];

  ngOnInit() {
    this.userService.user$.subscribe((user) => {
      if (user && user.id !== undefined) {
        this.getMembers(user.id);
      }
    });
  }

  getMembers(userId: number) {
    this.service.getAllMembers(userId).subscribe((response) => {
      this.members = response;
    });

    // this.userService.sendEmail().subscribe(() => {
    //   console.log('sent')
    // });
  }

}
