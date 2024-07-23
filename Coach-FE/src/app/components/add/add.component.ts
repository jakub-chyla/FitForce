import {Component, inject, Inject, OnInit} from '@angular/core';
import {
  FormBuilder, FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {DateAdapter, MAT_DATE_FORMATS} from "@angular/material/core";
import {FORM_DATE_FORMATS, FormDateAdapter} from "../../util/form-date-adapter";
import {DateHelper} from "../../util/date-helper";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MyErrorStateMatcher} from "./my-error-state-matcher";
import {NameValidatorPipe} from "./name-validator.pipe";
import {MemberService} from "../../service/member.service";
import {Member} from "../../model/Member";
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {ThemeService} from "../../service/theme.service";
import {CommonModule} from "@angular/common";
import {MatDatepickerModule} from "@angular/material/datepicker";

class AbstractControl {
}

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    NameValidatorPipe,
    CommonModule,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
  providers: [
    {provide: DateAdapter, useClass: FormDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: FORM_DATE_FORMATS},
  ]
})
export class AddComponent implements OnInit {

  themeService: ThemeService = inject(ThemeService);

  myForm!: FormGroup;

  readonly startDate = new Date(1990, 0, 1);

  constructor(private formBuilder: FormBuilder,
              private memberService: MemberService,
              private dialogRef: MatDialogRef<AddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3),]],
      lastName: ['', [Validators.required, Validators.minLength(3),]],
      phone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), this.phoneValidator()]],
      birthday: ['', [Validators.required]]
    })
  }

  phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = (control as FormControl).value;
      const valid = /^\d+$/.test(value);
      return valid ? null : { numeric: true };
    };
  }

  save() {
    if (this.myForm.valid) {

      let member: Member = {
        firstName: this.myForm.get('firstName')?.value,
        lastName: this.myForm.get('lastName')?.value,
        phone: this.myForm.get('phone')?.value,
        birthday: this.myForm.get('birthday')?.value,
      }


      this.memberService.addMember(member).subscribe(
        (response) => {

        }
      );

    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
