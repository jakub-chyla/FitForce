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

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss'],
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatCalendar,
    MatCard,
    MatCardModule, MatDatepickerModule, DatePipe, NgIf, MatButton, MatError, MatFormField, MatHint, MatInput, ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingsComponent implements OnInit, OnChanges  {
  @Input() fullMemberResponse?: FullMemberResponse;
  myForm!: FormGroup;
  trainings?: Training[] = [];

  selected: Date | null = null;
  highlightedDates: Date[] = [
    // new Date(2024, 9, 10),
    // new Date(2024, 9, 15),
  ];

  dateMessages: { [key: string]: string } = {
    '2024-10-10': 'Training on Agile Methodologies',
    '2024-10-15': 'Training on Angular Best Practices'
  };

  message: string = '';

  constructor(private formBuilder: FormBuilder,
              private memberService: MemberService) {
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      created: ['', [Validators.required, Validators.minLength(3),]],
      weightValue: ['', [Validators.required, Validators.minLength(3),]]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fullMemberResponse'] && changes['fullMemberResponse'].currentValue) {
      this.updateCalendar();
    }
  }

  private updateCalendar() {
    this.trainings = this.fullMemberResponse?.trainings
    if (this.trainings) {
      for (let training of this.trainings) {
        if (training.appointment) {
          let date = new Date(training.appointment);
          this.highlightedDates.push(date)
        }
      }
    }
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
      console.log('Selected date:', selectedDate);
      console.log('Message:', this.message);
    } else {
      this.message = '';
      console.log('No date selected');
    }
  }

  save() {
    if (this.myForm.valid) {
      const weight: Weight = {
        id: this.fullMemberResponse?.memberId,
        created: this.myForm.get('created')?.value,
        weightValue: this.myForm.get('weightValue')?.value,
      };

      this.memberService.saveWeight(weight).subscribe(
        (response) => {
          // this.dataSource.unshift(response);
          // this.dataSource.pop();
          // this.dataSource = [...this.dataSource];
          // this.updateChartData(this.dataSource);
        }
      );
    }
  }

}
