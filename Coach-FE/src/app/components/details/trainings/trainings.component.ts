import {ChangeDetectionStrategy, Component, model, OnInit} from '@angular/core';
import {MatCalendar, MatDatepickerModule} from "@angular/material/datepicker";
import {MatCard, MatCardModule} from "@angular/material/card";
import {provideNativeDateAdapter} from "@angular/material/core";
import {DatePipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrl: './trainings.component.scss',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatCalendar,
    MatCard,
    MatCardModule, MatDatepickerModule, DatePipe, NgIf
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingsComponent implements OnInit {
  selected: Date | null = null;
  highlightedDates: Date[] = [
    new Date(2024, 9, 10), // October 10, 2024
    new Date(2024, 9, 15), // October 15, 2024
  ];

  ngOnInit() {}

  // Simplified dateClass function
  dateClass = (date: Date): string => {
    return this.isHighlighted(date) ? 'highlight-date' : '';
  };

  // Helper function to check if the date is in the highlightedDates array
  private isHighlighted(date: Date): boolean {
    return this.highlightedDates.some(d =>
      d.getDate() === date.getDate() &&
      d.getMonth() === date.getMonth() &&
      d.getFullYear() === date.getFullYear()
    );
  }
}
