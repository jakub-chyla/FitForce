import {
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
import {NgIf} from '@angular/common';
import {Training} from "../../../model/training";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MemberService} from "../../../service/member.service";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatError, MatFormField, MatHint} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {DateTimeHelper} from "../../../util/date-time-helper";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatDivider} from "@angular/material/divider";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss'],
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatCalendar,
    MatCard,
    MatCardModule, MatDatepickerModule, NgIf, MatButton, MatError, MatFormField, MatHint, MatInput, ReactiveFormsModule, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatHeaderCellDef, MatIcon, MatIconButton, MatDivider
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingsComponent implements OnInit, OnChanges {
  @Input() memberId: number = 0;
  @Input() selectedTab: number = 0;
  trainings: Training[] = [];

  myForm: FormGroup = this.formBuilder.group({
    time: ['', [Validators.required, Validators.minLength(3),]],
    note: ['', [Validators.minLength(3),]],
  });

  showCalendar = false;
  selectedDate: Date = new Date();
  highlightedDates: Date[] = [];
  displayedColumns: string[] = ['time', 'note', 'blank'];
  dateMessages: { [key: string]: string } = {};
  message: string = '';

  dataSource: Training[] = [];

  constructor(private formBuilder: FormBuilder,
              private memberService: MemberService,
              private cdr: ChangeDetectorRef,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.parent?.paramMap.subscribe(params => {
      this.memberId = Number(params.get('id'));
    });
    this.getTrainingsByMemberId(this.memberId);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fullMemberResponse'] && changes['fullMemberResponse'].currentValue) {
      this.updateHighlightedDates();
    }
    if (changes['selectedTab']) {
      if (this.selectedTab === 1) {
        this.getTrainingsByMemberId(this.memberId);
      }
    }
  }

  getTrainingsByMemberId(memberId: number) {
    this.showCalendar = false;
    this.memberService.getTrainingsByMemberId(memberId).subscribe((response) => {
      this.trainings = response;
      this.updateHighlightedDates()
    });
  }

  updateTable() {
    this.dataSource = this.trainings.filter((training) => {
      if (!training.appointment) return false;
      const trainingDate = new Date(training.appointment);
      return (
        trainingDate.getFullYear() === this.selectedDate.getFullYear() &&
        trainingDate.getMonth() === this.selectedDate.getMonth() &&
        trainingDate.getDate() === this.selectedDate.getDate()
      );
    });

    setTimeout(() => {
      this.showCalendar = true
      this.cdr.detectChanges();
    }, 100);

  }

  updateHighlightedDates() {
    for (let training of this.trainings) {
      if (training.appointment) {
        let date = new Date(training.appointment);
        this.highlightedDates.push(date)
        this.updateCalendarNotes(date, training.note!)
      }
      this.updateTable();
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

  // 2
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
      this.message = this.dateMessages[dateKey] || 'No training';
    } else {
      this.message = '';
    }
    this.updateTable()
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
        memberId: this.memberId,
        time: this.myForm.get('time')?.value,
        appointment: this.getDate(this.selectedDate),
        note: this.myForm.get('note')?.value,
      };

      this.memberService.saveTraining(training).subscribe(
        (response) => {
          if (response !== undefined) {
            // @ts-ignore
            let date = new Date(response.appointment)
            this.trainings.push(response)
            this.highlightedDates.push(date)
            // @ts-ignore
            this.updateCalendarNotes(response.appointment, response.note)
            this.updateHighlightedDates()
            setTimeout(() => {
              this.updateTable();
              this.showCalendar = true
              this.cdr.detectChanges();
            }, 1);
          }
        }
      );
    }
  }

  delete(id: number) {
    this.showCalendar = false
    this.memberService.deleteTraining(id).subscribe(
      (response) => {
        if (response !== undefined) {
          this.trainings = this.trainings.filter((training) => training.id !== response.id);
          // @ts-ignore
          let dateToRemove = new Date(response.appointment);
          this.highlightedDates = this.highlightedDates.filter(
            (date) => date.getTime() !== dateToRemove.getTime()
          );

          // @ts-ignore
          this.updateCalendarNotes(response.appointment, response.note)
          this.updateHighlightedDates()
          setTimeout(() => {
            this.updateTable();
            this.showCalendar = true
          }, 1);
        }
      }
    );
  }
}
