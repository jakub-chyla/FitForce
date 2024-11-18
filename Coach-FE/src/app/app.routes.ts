import { Routes } from '@angular/router';
import {DetailsComponent} from "./components/details/details.component";
import {MainComponent} from "./components/main/main.component";
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {LogInComponent} from "./components/log-in/log-in.component";
import {ProgressComponent} from "./components/details/progress/progress.component";
import {TrainingsComponent} from "./components/details/trainings/trainings.component";
import {DietComponent} from "./components/details/diet/diet.component";

export const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainComponent, title: 'Home page' },
  { path: 'sign-in', component: SignInComponent, title: 'Sign in' },
  { path: 'log-in', component: LogInComponent, title: 'Log in' },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Details',
    children: [
      { path: 'progress', component: ProgressComponent },
      { path: 'trainings', component: TrainingsComponent },
      { path: 'diet', component: DietComponent },
      { path: '', redirectTo: 'progress', pathMatch: 'full' }, // Default tab
    ],
  },
  { path: '**', redirectTo: 'main' },
];
