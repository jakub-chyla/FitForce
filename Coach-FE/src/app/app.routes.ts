import {Routes} from '@angular/router';
import {DetailsComponent} from "./components/details/details.component";
import {ListComponent} from "./components/list/list.component";
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {LogInComponent} from "./components/log-in/log-in.component";
import {ProgressComponent} from "./components/details/progress/progress.component";
import {TrainingsComponent} from "./components/details/trainings/trainings.component";
import {DietComponent} from "./components/details/diet/diet.component";
import {ControlPanelComponent} from "./components/control-panel/control-panel.component";
import {AuthGuard} from "./service/authGuard";
import {Role} from "./enum/role";
import {PricingComponent} from "./components/pricing/pricing.component";

export const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: ListComponent, title: 'Home page'},
  {path: 'pricing', component: PricingComponent, title: 'Pricing'},
  {path: 'sign-in', component: SignInComponent, title: 'Sign in'},
  {path: 'log-in', component: LogInComponent, title: 'Log in'},
  {
    path: 'control-panel',
    component: ControlPanelComponent,
    title: 'Control panel',
    canActivate: [AuthGuard],
    data: {requiredRole: Role.ADMIN},
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Details',
    children: [
      {path: 'progress', component: ProgressComponent},
      {path: 'trainings', component: TrainingsComponent},
      {path: 'diet', component: DietComponent},
      {path: '', redirectTo: 'progress', pathMatch: 'full'},
    ],
  },
  {path: '**', redirectTo: 'main'},
];
