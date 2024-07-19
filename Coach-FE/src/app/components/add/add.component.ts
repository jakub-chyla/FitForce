import {Component, inject, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
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
    MatDialogClose
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

  constructor(private formBuilder: FormBuilder,
              private memberService: MemberService,
              private dialogRef: MatDialogRef<AddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    })
  }


  save() {
    if (this.myForm.valid) {
      console.log(this.myForm.get('firstName')?.value);
      const formData = this.myForm.value;

      let member: Member = {
        firstName: this.myForm.get('firstName')?.value,
        lastName: this.myForm.get('lastName')?.value
      }

      this.memberService.addMember(member).subscribe()

      // const member: Member = {
        // anme: formData.employeeFilter,
        // date:   DateHelper.setSafeDate(formData.date).toISOString(),

      // };
      // this.memberService.save(DTO).subscribe(
      //   (response) => {
      //     this.openSnackBar(response.message);
      //     this.onSave.emit();
      //   }
      // );
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
