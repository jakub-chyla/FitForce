import {Component, inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {FullMemberResponse} from "../../../model/fullMemberResponse";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatDivider} from "@angular/material/divider";
import {MatError, MatFormField, MatHint} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ThemeService} from "../../../service/theme.service";
import {WeightData} from "../../../dto/weightData";
import {Weight} from "../../../model/weight";
import {MemberService} from "../../../service/member.service";
import {WeightDto} from "../../../dto/weightDto";

@Component({
  selector: 'app-diet',
  standalone: true,
  imports: [
    BaseChartDirective,
    FormsModule,
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatDivider,
    MatError,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatHint,
    MatInput,
    MatRow,
    MatRowDef,
    MatTable,
    ReactiveFormsModule,
    MatHeaderCellDef
  ],
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.scss']
})
export class DietComponent implements OnChanges  {
  themeService: ThemeService = inject(ThemeService);
  @Input() fullMemberResponse?: FullMemberResponse;
  @Input() id: number = 0;
  myForm: FormGroup = this.formBuilder.group({
    created: ['', [Validators.required, Validators.minLength(3)]],
    weightValue: ['', [Validators.required, Validators.minLength(3)]]
  });

  public lineChartOptions: ChartOptions<'line'> = {responsive: true};
  public lineChartLegend = true;
  displayedColumns: string[] = ['created', 'weightValue'];
  dataSource: WeightData[] = [];
  weights: WeightDto[] = [];

  // Doughnut Chart Data
  public doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Carbohydrates', 'Protein', 'Fat'],
    datasets: [
      {
        data: [60, 25, 15],
        label: 'Weight Distribution',
        backgroundColor: [
          'rgba(255, 206, 86, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ],
        hoverBackgroundColor: [
          'rgba(255, 206, 86, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(153, 102, 255, 0.8)'
        ]
      }
    ]
  };

  // Doughnut Chart Options
  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    cutout: '50%',  // Optional: Adjusts the doughnut's hole size
  };

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

  constructor(private formBuilder: FormBuilder,
              private memberService: MemberService) {
  }

  public doughnutChartLegend = true;

  ngOnInit() {
    this.getWeightByMemberId(this.id);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fullMemberResponse'] && changes['fullMemberResponse'].currentValue) {
      this.initTable();
    }
  }

  getWeightByMemberId(memberId: number) {
    this.memberService.getWeightsByMemberID(memberId).subscribe((response) => {
      this.weights = response;
      this.initTable();
    });
  }

  initTable() {
    const tableData: WeightData[] = [];

    this.weights.forEach(weight => {
      tableData.push({
        created: weight.created ?? '',
        weightValue: weight.weightValue ?? 0
      });
    });
    this.dataSource = tableData;
    this.updateChartData(tableData);

  }

  updateChartData(tableData: WeightData[]) {
    const reversedData = tableData.slice().reverse();

    const labels = reversedData.map(data => data.created);
    const data = reversedData.map(data => data.weightValue ?? 0);

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

  save() {
    if (this.myForm.valid) {
      const weight: Weight = {
        id: this.fullMemberResponse?.memberId,
        created: this.myForm.get('created')?.value,
        weightValue: this.myForm.get('weightValue')?.value,
      };

      this.memberService.saveWeight(weight).subscribe(
        (response) => {
          this.dataSource.unshift(response);
          this.dataSource.pop();
          this.dataSource = [...this.dataSource];
          this.updateChartData(this.dataSource);
        }
      );
    }
  }
}
