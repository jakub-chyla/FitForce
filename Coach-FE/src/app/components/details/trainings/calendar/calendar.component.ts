import {
  Component,
  InputSignal,
  Signal,
  WritableSignal,
  computed,
  input,
  signal, OnInit,
} from '@angular/core';
import {DateTime, Info, Interval} from 'luxon';
import {CommonModule} from '@angular/common';
import {Meetings} from "./meetings";
import {DefaultValidity, IfValid} from "luxon/src/_util";

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class CalendarComponent implements OnInit {
  meetings: InputSignal<Meetings> = input.required();
  today: Signal<DateTime> = signal(DateTime.local());
  firstDayOfActiveMonth: WritableSignal<DateTime> = signal(
    this.today().startOf('month'),
  );
  activeDay: WritableSignal<DateTime | null> = signal(null);
  weekDays: Signal<string[]> = signal(Info.weekdays('short'));


  daysOfMonth: Signal<DateTime[]> = computed(() => {
    return Interval.fromDateTimes(
      this.firstDayOfActiveMonth().startOf('week'),
      this.firstDayOfActiveMonth().endOf('month').endOf('week'),
    )
      .splitBy({day: 1})
      .map((d) => {
        if (d.start === null) {
          throw new Error('Wrong dates');
        }
        return d.start;
      });
  });

  DATE_MED = DateTime.DATE_MED;
  activeDayMeetings: Signal<string[]> = computed(() => {
    const activeDay = this.activeDay();
    if (activeDay === null) {
      return [];
    }
    const activeDayISO = activeDay.toISODate();

    if (!activeDayISO) {
      return [];
    }

    return this.meetings()[activeDayISO] ?? [];
  });

  ngOnInit() {
    this.daysOfMonth

  }

  isDayEven(signalDate: DateTime<boolean>) {
    let dateString = signalDate.toString();
    let day = dateString.split('T')[0].split('-')[2]
    return Number(day) % 2 === 0;
  }


  goToPreviousMonth(): void {
    this.firstDayOfActiveMonth.set(
      this.firstDayOfActiveMonth().minus({month: 1}),
    );
  }

  goToNextMonth(): void {
    this.firstDayOfActiveMonth.set(
      this.firstDayOfActiveMonth().plus({month: 1}),
    );
  }

  goToToday(): void {
    this.firstDayOfActiveMonth.set(this.today().startOf('month'));
  }
}
