import { Routes } from '@angular/router';
import {CardsComponent} from "./components/cards/cards.component";
import {AddComponent} from "./components/add/add.component";
import {EditMemberComponent} from "./components/edit-member/edit-member.component";

export const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: CardsComponent, title: 'Home page'},
  {path: 'add', component: AddComponent, title: 'Add'},
  {path: 'edit/:id', component: EditMemberComponent, title: 'Edit'},
  {path: '**', redirectTo: 'main'}
];
