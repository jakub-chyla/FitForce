import { Routes } from '@angular/router';
import {CardsComponent} from "./components/cards/cards.component";
import {AddComponent} from "./components/add/add.component";
import {DetailsComponent} from "./components/details/details.component";

export const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: CardsComponent, title: 'Home page'},
  {path: 'add', component: AddComponent, title: 'Add'},
  {path: 'details/:id', component: DetailsComponent, title: 'Edit'},
  {path: '**', redirectTo: 'main'}
];
