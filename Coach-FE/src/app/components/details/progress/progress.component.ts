import {Component, inject, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';  // Import CommonModule here
import {Member} from "../../../model/Member";
import {MatTableModule} from "@angular/material/table";
import {ChartConfiguration, ChartOptions} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {MatDivider} from "@angular/material/divider";
import {ThemeService} from "../../../service/theme.service";

export interface PeriodicElement {
  month: string;
  weight: number;
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
  @Input() member?: Member;

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

  displayedColumns: string[] = ['month', 'weight'];
  dataSource: PeriodicElement[] = [];

  ngOnInit() {
      this.init();
  }

  init() {
    const tableData: PeriodicElement[] = [
      {month: 'January', weight: 90},
      {month: 'February', weight: 120},
      {month: 'March', weight: 80},
      {month: 'April', weight: 90}
    ];

    this.dataSource = tableData;
    this.updateChartData(tableData);
  }

  updateChartData(data: PeriodicElement[]) {
    const months = data.map(d => d.month);
    const weights = data.map(d => d.weight);

    this.lineChartData.labels = months;
    this.lineChartData.datasets[0].data = weights;
  }
}
