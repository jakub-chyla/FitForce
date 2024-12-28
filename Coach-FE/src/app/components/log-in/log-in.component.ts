import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {ThemeService} from "../../service/theme.service";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatDialogClose} from "@angular/material/dialog";
import {MatDivider} from "@angular/material/divider";
import {MatError, MatFormField, MatHint} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgClass} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {AuthRequest} from "../../model/auth-request";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardFooter,
    MatCardHeader,
    MatCardTitle,
    MatDialogClose,
    MatDivider,
    MatError,
    MatFormField,
    MatHint,
    MatInput,
    ReactiveFormsModule,
    NgClass,
    RouterLink
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent implements OnInit {
  themeService: ThemeService = inject(ThemeService);
  myForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3),]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(9)]],
    });

  }

  openSnackBar() {
    this._snackBar.open('Wrong credentials', '', {
      duration: 1000,
      panelClass: ['custom-snackbar']
    });
  }

  logIn() {
    if (this.myForm.valid) {
      const authRequest: AuthRequest = {
        username: this.myForm.get('username')?.value,
        password: this.myForm.get('password')?.value
      }
      this.userService.logIn(authRequest).subscribe(
        (response) => {
          this.router.navigate(['/main']);
        },
        (error) => {
          this.openSnackBar()
        }
      );
    }
  }
}


