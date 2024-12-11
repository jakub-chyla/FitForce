import {Component, inject} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from '@angular/material/button';
import {ThemeService} from "../../service/theme.service";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {Router, RouterModule} from "@angular/router";
import {AuthHelper} from "../../util/auth-helper";
import {MatTooltip} from "@angular/material/tooltip";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    RouterModule, MatTooltip, MatMenu, MatMenuItem, MatMenuTrigger],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  themeService: ThemeService = inject(ThemeService);

  constructor(private router: Router) {
  }

  toggleTheme() {
    this.themeService.updateTheme();
  }

  logOut(){
    AuthHelper.logOut();
    this.router.navigate(['/log-in']);
  }
}
