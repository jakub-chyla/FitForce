import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {CardsComponent} from "./components/cards/cards.component";
import {ThemeService} from "./service/theme.service";
import {AddComponent} from "./components/add/add.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToolbarComponent, CardsComponent, AddComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Coach-FE';
  themeService: ThemeService = inject(ThemeService);
}
