import { Routes } from '@angular/router';
import {AddComponent} from "./components/add/add.component";
import {DetailsComponent} from "./components/details/details.component";
import {MainComponent} from "./components/main/main.component";

export const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: MainComponent, title: 'Home page'},
  {path: 'add', component: AddComponent, title: 'Add'},
  {path: 'details/:id', component: DetailsComponent, title: 'Edit'},
  {path: '**', redirectTo: 'main'}
];
