import {Component, inject, OnInit} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from '@angular/material/button';
import {ThemeService} from "../../service/theme.service";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {Router, RouterModule} from "@angular/router";
import {MatTooltip} from "@angular/material/tooltip";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";
import {NgIf} from "@angular/common";
import {Role} from "../../enum/role";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    RouterModule, MatTooltip, MatMenu, MatMenuItem, MatMenuTrigger, NgIf],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit {
  themeService: ThemeService = inject(ThemeService);
  user?: User;

  constructor(private router: Router,
              private userService: UserService,
  ) {
  }

  ngOnInit() {
    this.userService.user$.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  toggleTheme() {
    this.themeService.updateTheme();
  }

  logOut() {
    this.userService.emitUser(new User());
    this.router.navigate(['/log-in']);
  }

  protected readonly Role = Role;
}
