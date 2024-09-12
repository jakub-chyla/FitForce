import {Component, inject, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
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
  styleUrls: ['./progress.component.scss']
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
    if (this.fullMemberResponse?.weights) {
      this.fullMemberResponse.weights.forEach(weight => {
        tableData.push({
          created: weight.created ?? '',
          weightValue: weight.weightValue ?? 0
        });
      });

      this.dataSource = tableData;
      this.updateChartData(tableData);
    }
  }

  updateChartData(tableData: weightData[]) {
    const reversedData = tableData.slice().reverse();
    
    const labels = reversedData.map(data => data.created);
    const data = reversedData.map(data => data.weightValue);

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
