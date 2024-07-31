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
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {MemberService} from "../../service/member.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AddComponent} from "../add/add.component";

@Component({
  selector: 'app-edit-member',
  standalone: true,
  imports: [MatCardModule, MatTabsModule],
  templateUrl: './edit-member.component.html',
  styleUrl: './edit-member.component.scss'
})
export class EditMemberComponent implements OnInit {

  themeService: ThemeService = inject(ThemeService);
  @Output() onSave: EventEmitter<Member> = new EventEmitter<Member>();

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
      const member: Member = {
        firstName: this.myForm.get('firstName')?.value,
        lastName: this.myForm.get('lastName')?.value,
        phone: this.myForm.get('phone')?.value,
        birthday: this.myForm.get('birthday')?.value,
      }

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
