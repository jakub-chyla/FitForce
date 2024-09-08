import {Component, EventEmitter, inject, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MemberService} from "../../../../service/member.service";
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {AddComponent} from "../../../add/add.component";
import {Member} from "../../../../model/Member";
import {ThemeService} from "../../../../service/theme.service";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {NameValidatorPipe} from "../../../add/name-validator.pipe";
import {CommonModule} from "@angular/common";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelect, MatSelectModule} from "@angular/material/select";
import {MemberEventService} from "../../../../service/member-event-service.service";

@Component({
  selector: 'app-notification',
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
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit {

  themeService: ThemeService = inject(ThemeService);
  @Output() onDelete: EventEmitter<Member> = new EventEmitter<Member>();
  member?: Member;

  constructor(private memberService: MemberService,
              private dialogRef: MatDialogRef<NotificationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private memberEventService: MemberEventService) {
  }

  ngOnInit() {
    this.member = this.data
  }

  delete() {
    const memberId = this.member?.id!;
    this.memberService.deleteMember(memberId).subscribe(() => {
      this.memberEventService.deleteMember(this.member!);
      this.closeDialog();
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
