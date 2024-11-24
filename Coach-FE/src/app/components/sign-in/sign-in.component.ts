import {Component, inject, OnInit} from '@angular/core';
import {ThemeService} from "../../service/theme.service";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {MemberService} from "../../service/member.service";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {CommonModule} from "@angular/common";
import {MatDialogClose} from "@angular/material/dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-sign-in',
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
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    RouterLink
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit {
  themeService: ThemeService = inject(ThemeService);
  myForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService
  ) {
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3),]],
      lastName: ['', [Validators.required, Validators.minLength(3),]],
      name: ['', [Validators.required, Validators.minLength(3),]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(9)]],
      email: ['', [Validators.required, Validators.minLength(3),]]
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
      const user: User = {
        firstName: this.myForm.get('firstName')?.value,
        lastName: this.myForm.get('lastName')?.value,
        name: this.myForm.get('name')?.value,
        password: this.myForm.get('password')?.value,
        email: this.myForm.get('email')?.value
      }

      this.userService.createUser(user).subscribe(
        (response) => {
        }
      );

    }
  }


}
