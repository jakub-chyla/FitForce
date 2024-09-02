import {Component, EventEmitter, Inject, inject, OnInit, Output} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {ThemeService} from "../../service/theme.service";
import {Member} from "../../model/Member";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {MemberService} from "../../service/member.service";
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,

} from "@angular/material/dialog";
import {AddComponent} from "../add/add.component";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {NameValidatorPipe} from "../add/name-validator.pipe";
import {CommonModule} from "@angular/common";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DateAdapter, MAT_DATE_FORMATS} from "@angular/material/core";
import {FORM_DATE_FORMATS, FormDateAdapter} from "../../util/form-date-adapter";
import {MatSelect, MatSelectChange, MatSelectModule} from "@angular/material/select";
import {Goal} from "../../model/Goal";


@Component({
  selector: 'app-edit-member',
  standalone: true,
  imports: [MatCardModule,
    MatTabsModule,
    MatDialogActions,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    NameValidatorPipe,
    CommonModule,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
    MatDatepickerModule,
    MatSelect,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule],
  templateUrl: './edit-member.component.html',
  styleUrl: './edit-member.component.scss',
  providers: [
    {provide: DateAdapter, useClass: FormDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: FORM_DATE_FORMATS},
  ]
})

export class EditMemberComponent implements OnInit {

  themeService: ThemeService = inject(ThemeService);
  @Output() onSave: EventEmitter<Member> = new EventEmitter<Member>();

  myForm!: FormGroup;
  goals: Goal[] = [];
  selectedGoal?: Goal;

  readonly startDate = new Date(1990, 0, 1);

  constructor(private formBuilder: FormBuilder,
              private memberService: MemberService,
              private dialogRef: MatDialogRef<AddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      firstName: [this.data.firstName, [Validators.required, Validators.minLength(3),]],
      lastName: [this.data.lastName, [Validators.required, Validators.minLength(3),]],
      phone: [this.data.phone, [Validators.required, Validators.minLength(9), Validators.maxLength(9), this.phoneValidator()]],
      birthday: [this.data.birthday, [Validators.required]],
      email: [this.data.email, [Validators.required]],
      goal: [this.data.goal, [Validators.required]]
    });
    this.getGoals();
  }

  getGoals() {
    this.memberService.getGoals().subscribe(
      (response) => {
        this.goals = response;
        const goal: Goal = this.myForm.get('goal')?.value;
        this.selectedGoal = this.goals.find(g => g.id === goal.id);
      }
    );
  }

  phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = (control as FormControl).value;
      const valid = /^\d+$/.test(value);
      return valid ? null : {numeric: true};
    };
  }

  onGoalSelected(event: MatSelectChange): void {
    this.selectedGoal = event.value;
  }

  save() {
    if (this.myForm.valid) {
      const member: Member = {
        id: this.data.id,
        firstName: this.myForm.get('firstName')?.value,
        lastName: this.myForm.get('lastName')?.value,
        phone: this.myForm.get('phone')?.value,
        birthday: this.myForm.get('birthday')?.value,
        email: this.myForm.get('email')?.value,
        goal: this.selectedGoal
      };

      this.memberService.addMember(member).subscribe(
        (response) => {
          this.onSave.emit(response);
          this.closeDialog();
        }
      );

    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
