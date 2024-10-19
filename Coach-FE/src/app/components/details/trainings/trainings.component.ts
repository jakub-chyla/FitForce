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
  selected = model<Date | null>(null);
  // Initialize selectedDates with the two preset dates
  // selectedDates: Date[] = [
  //   new Date(2024, 9, 10),  // 10 October 2024 (Month is 0-based, so 9 represents October)
  //   new Date(2024, 9, 20)   // 20 October 2024
  // ];

  ngOnInit() {}

  // // Function to handle date selection logic
  // selectDate(selected: Date) {
  //   if (this.selectedDates.length === 2) {
  //     // If two dates are already selected, reset the array
  //     this.selectedDates = [];
  //   }
  //
  //   // Toggle selection of the clicked date
  //   const index = this.selectedDates.findIndex(date => this.isSameDate(date, selected));
  //   if (index === -1) {
  //     this.selectedDates.push(selected);  // Add date if not already selected
  //   } else {
  //     this.selectedDates.splice(index, 1);  // Remove date if already selected
  //   }
  // }
  //
  // // Helper method to compare two dates (ignoring the time)
  // isSameDate(date1: Date, date2: Date): boolean {
  //   return date1.getFullYear() === date2.getFullYear() &&
  //     date1.getMonth() === date2.getMonth() &&
  //     date1.getDate() === date2.getDate();
  // }
}
