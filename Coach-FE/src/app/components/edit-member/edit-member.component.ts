import {Component} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";

@Component({
  selector: 'app-edit-member',
  standalone: true,
  imports: [MatCardModule, MatTabsModule],
  templateUrl: './edit-member.component.html',
  styleUrl: './edit-member.component.scss'
})
export class EditMemberComponent {

}
