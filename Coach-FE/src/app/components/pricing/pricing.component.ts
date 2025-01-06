import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent {

}
