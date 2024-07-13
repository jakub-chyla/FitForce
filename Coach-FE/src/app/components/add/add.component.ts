import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DateAdapter, MAT_DATE_FORMATS} from "@angular/material/core";
import {FORM_DATE_FORMATS, FormDateAdapter} from "../../util/form-date-adapter";
import {DateHelper} from "../../util/date-helper";

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
  providers: [
    {provide: DateAdapter, useClass: FormDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: FORM_DATE_FORMATS},
  ]
})
export class AddComponent implements OnInit {

  myForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      date: [DateHelper.setSafeDate(new Date()), [Validators.required]],
    })
  }


  save() {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
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
}
