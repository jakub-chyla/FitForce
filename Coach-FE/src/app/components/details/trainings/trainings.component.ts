import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatCalendar, MatDatepickerModule } from "@angular/material/datepicker";
import { MatCard, MatCardModule } from "@angular/material/card";
import { provideNativeDateAdapter } from "@angular/material/core";
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss'],
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

  // Date to message mapping
  dateMessages: { [key: string]: string } = {
    '2024-10-10': 'Training on Agile Methodologies',
    '2024-10-15': 'Training on Angular Best Practices'
  };

  message: string = ''; // Store the message for the selected date

  ngOnInit() {}

  dateClass = (date: Date): string => {
    const highlight = this.highlightedDates.some(d =>
      d.getDate() === date.getDate() &&
      d.getMonth() === date.getMonth() &&
      d.getFullYear() === date.getFullYear()
    );
    return highlight ? 'highlight-date' : '';
  };

  onDateChange(selectedDate: Date | null) {
    if (selectedDate) {
      const dateKey = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;

      this.message = this.dateMessages[dateKey] || 'No training scheduled on this date';
      console.log('Selected date:', selectedDate);
      console.log('Message:', this.message);
    } else {
      this.message = '';
      console.log('No date selected');
    }
  }

}
