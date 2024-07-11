import { Routes } from '@angular/router';
import {CardsComponent} from "./components/cards/cards.component";
import {AddComponent} from "./components/add/add.component";

export const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: CardsComponent, title: 'Home page'},
  {path: 'add', component: AddComponent, title: 'Add'},
  {path: '**', redirectTo: 'main'}
];
