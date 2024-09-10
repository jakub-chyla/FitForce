import {Component, inject, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';  // Import CommonModule here
import {Member} from "../../../model/member";
import {MatTableModule} from "@angular/material/table";
import {ChartConfiguration, ChartOptions} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {MatDivider} from "@angular/material/divider";
import {ThemeService} from "../../../service/theme.service";
import {FullMemberResponse} from "../../../model/fullMemberResponse";

export interface weightData {
  created: string;
  weightValue: number;
}

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule, MatTableModule, BaseChartDirective, MatDivider],
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'] // Fixed typo (styleUrl -> styleUrls)
})
export class ProgressComponent implements OnInit {
  themeService: ThemeService = inject(ThemeService);
  @Input() fullMemberResponse?: FullMemberResponse;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Weight',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(65,64,64,0.3)'
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {responsive: true};
  public lineChartLegend = true;

  displayedColumns: string[] = ['created', 'weightValue'];
  dataSource: weightData[] = [];

  ngOnInit() {
    setTimeout(() => {
      this.init();
    }, 100);

  }

  init() {
    const tableData: weightData[] = [];

    // Check if weights array exists in fullMemberResponse
    if (this.fullMemberResponse?.weights) {
      // Loop over the weights array and push the necessary data into tableData
      this.fullMemberResponse.weights.forEach(weight => {
        tableData.push({
          created: weight.crated ?? '',  // Handling undefined values with a fallback
          weightValue: weight.weightValue ?? 0      // Default to 0 if weight value is undefined
        });
      });

      // Assign the tableData to the dataSource
      this.dataSource = tableData;
      console.log(this.dataSource)

      // Update the chart data
      this.updateChartData(tableData);
    }
  }

// Helper function to update chart data
  updateChartData(tableData: weightData[]) {
    const labels = tableData.map(data => data.created);  // Extract dates for the labels
    const data = tableData.map(data => data.weightValue);     // Extract weights for the dataset

    this.lineChartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          label: 'Weight',
          fill: true,
          tension: 0.5,
          borderColor: 'black',
          backgroundColor: 'rgba(65,64,64,0.3)',
        }
      ]
    };
  }
}


// const tableData: weightData[] = [
//   {month: 'January', weight: 90},
//   {month: 'February', weight: 120},
//   {month: 'March', weight: 80},
//   {month: 'April', weight: 90}
// ];
