import {Component, EventEmitter, inject, Inject, OnInit, Output} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {DateAdapter, MAT_DATE_FORMATS} from "@angular/material/core";
import {FORM_DATE_FORMATS, FormDateAdapter} from "../../util/form-date-adapter";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MemberService} from "../../service/member.service";
import {Member} from "../../model/member";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {ThemeService} from "../../service/theme.service";
import {CommonModule} from "@angular/common";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {AuthHelper} from "../../util/auth-helper";
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";

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
  @Output() onSave: EventEmitter<Member> = new EventEmitter<Member>();

  myForm!: FormGroup;
  user?: User;

  readonly startDate = new Date(1990, 0, 1);

  constructor(private formBuilder: FormBuilder,
              private memberService: MemberService,
              private dialogRef: MatDialogRef<AddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private userService: UserService) {
  }

  ngOnInit() {
    this.userService.user$.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });

    this.myForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), this.phoneValidator()]],
      birthday: ['']
    })
  }

  phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = (control as FormControl).value;
      const valid = /^\d+$/.test(value);
      return valid ? null : {numeric: true};
    };
  }

  save() {
    if (this.myForm.valid) {
      const member: Member = {
        userId: this.user?.id,
        firstName: this.myForm.get('firstName')?.value,
        lastName: this.myForm.get('lastName')?.value,
        phone: this.myForm.get('phone')?.value,
        birthday: this.myForm.get('birthday')?.value,
      }

      this.memberService.saveMember(member).subscribe(
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
