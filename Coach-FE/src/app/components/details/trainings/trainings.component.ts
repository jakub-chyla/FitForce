import {ChangeDetectionStrategy, Component, model, OnInit} from '@angular/core';
import {MatCalendar, MatDatepickerModule} from "@angular/material/datepicker";
import {MatCard, MatCardModule} from "@angular/material/card";
import {provideNativeDateAdapter} from "@angular/material/core";
import { DatePipe} from '@angular/common';
import {CalendarComponent} from "./calendar/calendar.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-trainings',
  standalone: true,
  imports: [
    MatCalendar,
    MatCard,
    MatCardModule, MatDatepickerModule, DatePipe,
    RouterOutlet, CalendarComponent
  ],
  templateUrl: './trainings.component.html',
  styleUrl: './trainings.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingsComponent implements OnInit {
  meetings = {
    '2024-10-05': ['Dring Coffee', 'Learn React', 'Sleep'],
    '2024-10-06': ['Dring Coffee', 'Learn Angular', 'Sleep'],
  };
  ngOnInit() {}
}
