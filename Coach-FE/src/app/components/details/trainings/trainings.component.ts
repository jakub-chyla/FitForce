import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {MatCalendar, MatDatepickerModule} from "@angular/material/datepicker";
import {MatCard, MatCardModule} from "@angular/material/card";
import {provideNativeDateAdapter} from "@angular/material/core";
import {DatePipe, NgIf} from '@angular/common';
import {FullMemberResponse} from "../../../model/fullMemberResponse";
import {Weight} from "../../../model/weight";
import {Training} from "../../../model/training";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MemberService} from "../../../service/member.service";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatHint} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {DateTimeHelper} from "../../../util/date-time-helper";
import _default from "chart.js/dist/plugins/plugin.tooltip";
import numbers = _default.defaults.animations.numbers;
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {WeightData} from "../../../dto/weightData";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss'],
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatCalendar,
    MatCard,
    MatCardModule, MatDatepickerModule, DatePipe, NgIf, MatButton, MatError, MatFormField, MatHint, MatInput, ReactiveFormsModule, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatHeaderCellDef, MatProgressSpinner
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingsComponent implements OnInit, OnChanges {
  @Input() fullMemberResponse?: FullMemberResponse;
  @Input() id: number = 0;
  @Input() selectedTab: number = 0;
  trainings: Training[] = [];

  myForm: FormGroup = this.formBuilder.group({
    time: ['', [Validators.required, Validators.minLength(3),]],
    note: ['', [Validators.minLength(3),]],
  });

  showCalendar = false;

  // selectedDate: Date = new Date();
  selectedDate: Date = new Date(2000, 1, 1);
  startDate: Date = new Date();

  highlightedDates: Date[] = [];
  dataSource: WeightData[] = [];
  displayedColumns: string[] = ['created', 'weightValue'];
  dateMessages: { [key: string]: string } = {};

  message: string = '';

  constructor(private formBuilder: FormBuilder,
              private memberService: MemberService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.getTrainingsByMemberId(this.id);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fullMemberResponse'] && changes['fullMemberResponse'].currentValue) {
      this.updateHighlightedDates();
    }
    if (changes['selectedTab']) {
      if (this.selectedTab === 1) {
        this.getTrainingsByMemberId(this.id);
      }
    }
  }

  getTrainingsByMemberId(memberId: number) {
    this.showCalendar = false;
    this.cdr.detectChanges();
    this.memberService.getTrainingsByMemberID(memberId).subscribe((response) => {
      this.trainings = response;
      this.updateHighlightedDates()
    });
  }

  updateHighlightedDates() {
    for (let training of this.trainings) {
      if (training.appointment) {
        let date = new Date(training.appointment);
        this.highlightedDates.push(date)
        this.updateCalendarNotes(date, training.note!)
      }      console.log('here');
      this.showCalendar = true;
      this.cdr.detectChanges();
    }
  }

  updateCalendarNotes(date: Date | string, message: string): void {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    const formattedDate = DateTimeHelper.formatDateToString(date);
    this.dateMessages[formattedDate] = message;
    this.message = message;
  }

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
    } else {
      this.message = '';

    }
  }

  getDate(date: Date): Date {
    let appointment = new Date(date);
    appointment.setDate(appointment.getDate() + 1);
    return appointment
  }

  save() {
    this.showCalendar = false
    if (this.myForm.valid) {
      const training: Training = {
        memberId: this.id,
        time: this.myForm.get('time')?.value,
        appointment: this.getDate(this.selectedDate),
        note: this.myForm.get('note')?.value,
      };

      this.memberService.saveTraining(training).subscribe(
        (response) => {
          if (response !== undefined) {
            // @ts-ignore
            let date = new Date(response.appointment)
            this.highlightedDates.push(date)
            // @ts-ignore
            this.updateCalendarNotes(response.appointment, response.note)
            this.updateHighlightedDates()
            setTimeout(() => {
              this.showCalendar = true
              // console.log(this.showCalendar)
              this.cdr.detectChanges();
            }, 1);
          }
        }
      );
    }
  }

  deleteTraining() {
    const selectedDate = this.selectedDate;
    const normalizedSelectedDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    );

    this.memberService.deleteTraining(this.getSelectedTraining(selectedDate)).subscribe((response) => {
      this.trainings = this.trainings.filter(training => training.id !== response);
      this.highlightedDates = this.highlightedDates.filter(date => {
        const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        return normalizedDate.getTime() !== normalizedSelectedDate.getTime();
      });

      setTimeout(() => {
        this.cdr.detectChanges();
      }, 1);

    });
  }

  getSelectedTraining(selectedDate: Date): number {
    const training = this.trainings.find(d => {
      if (!d.appointment) return false;

      const appointmentDate = d.appointment instanceof Date ? d.appointment : new Date(d.appointment);
      return (
        !isNaN(appointmentDate.getTime()) &&
        appointmentDate.getDate() === selectedDate?.getDate() &&
        appointmentDate.getMonth() === selectedDate.getMonth() &&
        appointmentDate.getFullYear() === selectedDate.getFullYear()
      );
    });
    return training?.id ?? -1;
  }

}
