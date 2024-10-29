import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {FullMemberResponse} from "../../../model/fullMemberResponse";

@Component({
  selector: 'app-diet',
  standalone: true,
  imports: [
    BaseChartDirective
  ],
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.scss']
})
export class DietComponent {
  @Input() fullMemberResponse?: FullMemberResponse;

  // Polar Area Chart Data
  public polarAreaChartData: ChartConfiguration<'polarArea'>['data'] = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        data: [90, 85, 80, 83, 88, 80],
        label: 'Weight Distribution',
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(201, 203, 207, 0.6)'
        ],
      }
    ]
  };

  // Polar Area Chart Options
  public polarAreaChartOptions: ChartOptions<'polarArea'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  public polarAreaChartLegend = true;

  ngOnInit() {
    setTimeout(() => {
      console.log(this.fullMemberResponse);
    }, 100);
  }
}
