import {Component, inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {ChartConfiguration, ChartOptions} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {MatDivider} from "@angular/material/divider";
import {ThemeService} from "../../../service/theme.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MemberService} from "../../../service/member.service";
import {Weight} from "../../../model/weight";
import {WeightDto} from "../../../dto/weight.dto";
import {ActivatedRoute} from "@angular/router";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-progress',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule,
    MatTableModule,
    BaseChartDirective,
    MatFormField,
    MatInput,
    FormsModule,
    MatCardModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton, MatDivider, MatIcon, MatIconButton, MatDatepickerToggle, MatDatepicker, MatDatepickerInput,
  ],
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit, OnChanges {
  themeService: ThemeService = inject(ThemeService);
  @Input() memberId: number = 0;
  @Input() selectedTab: number = 1;
  weights: WeightDto[] = [];

  myForm: FormGroup = this.formBuilder.group({
    created: ['', [Validators.required, Validators.minLength(3)]],
    weightValue: ['', [Validators.required, Validators.minLength(3)]]
  });

  public lineChartOptions: ChartOptions<'line'> = {responsive: true};
  public lineChartLegend = true;
  displayedColumns: string[] = ['created', 'weightValue', 'blank'];
  dataSource: WeightDto[] = [];

  showChart: boolean = false;

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
              private memberService: MemberService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.parent?.paramMap.subscribe(params => {
      this.memberId = Number(params.get('id'));
    });
    this.getWeightByMemberId(this.memberId);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fullMemberResponse'] && changes['fullMemberResponse'].currentValue) {
      this.initTable();
    }
    if (changes['selectedTab']) {
      if (this.selectedTab === 0) {
        this.getWeightByMemberId(this.memberId);
      }
      if (this.selectedTab !== 0) {
        this.showChart = false;

      }
    }
  }

  getWeightByMemberId(memberId: number) {
    this.memberService.getWeightsByMemberId(memberId).subscribe((response) => {
      this.weights = response;
      this.initTable();
    });
  }

  initTable() {
    const tableData: WeightDto[] = [];

    this.weights.forEach(weight => {
      tableData.push({
        id: weight.id ?? 0,
        created: weight.created ?? '',
        weightValue: weight.weightValue ?? 0
      });
    });
    this.dataSource = tableData;
    this.updateChart(tableData);

  }

  updateChart(tableData: WeightDto[]) {
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
    this.showChart = true;
  }

  save() {
    if (this.myForm.valid) {
      const weight: Weight = {
        id: this.memberId,
        created: this.myForm.get('created')?.value,
        weightValue: this.myForm.get('weightValue')?.value,
      };

      this.memberService.saveWeight(weight).subscribe(
        (response) => {
          this.dataSource = response;
          this.updateChart(response);
        }
      );
    }
  }

  delete(id: number) {
    this.memberService.deleteWeight(id).subscribe(
      (response) => {
        this.dataSource = response;
        this.updateChart(response);
      }
    );
  }
}
