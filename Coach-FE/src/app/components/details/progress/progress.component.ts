import {Component, Input, OnInit} from '@angular/core';
import {Member} from "../../../model/Member";

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss'
})
export class ProgressComponent implements OnInit{
  @Input() member?: Member;

  ngOnInit() {
  }

}
