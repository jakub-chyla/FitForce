import {Component, inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ChartConfiguration, ChartOptions} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatDivider} from "@angular/material/divider";
import {MatError, MatFormField, MatHint} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ThemeService} from "../../../service/theme.service";
import {MemberService} from "../../../service/member.service";
import {Diet} from "../../../model/diet";
import {DietDto} from "../../../dto/diet.dto";
import {MatIcon} from "@angular/material/icon";
import {ActivatedRoute} from "@angular/router";

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
    MatHeaderCellDef,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.scss']
})
export class DietComponent implements OnChanges {
  themeService: ThemeService = inject(ThemeService);
  @Input() memberId: number = 0;
  myForm: FormGroup = this.formBuilder.group({
    product: ['', [Validators.required, Validators.minLength(3)]],
    carbohydrates: ['', [Validators.required, Validators.minLength(3)]],
    proteins: ['', [Validators.required, Validators.minLength(3)]],
    fats: ['', [Validators.required, Validators.minLength(3)]]
  });

  displayedColumns: string[] = ['product', 'carbohydrates', 'proteins', 'fats', 'blank'];
  dataSource: Diet[] = [];

  public doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Carbohydrates', 'Proteins', 'Fats'],
    datasets: [
      {
        data: [1, 1, 1],
        label: 'Micro elements',
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

  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    cutout: '50%',
  };


  constructor(private formBuilder: FormBuilder,
              private memberService: MemberService,
              private route: ActivatedRoute) {
  }

  public doughnutChartLegend = true;

  ngOnInit() {
    this.route.parent?.paramMap.subscribe(params => {
      this.memberId = Number(params.get('id'));
    })
    this.getDietByMemberId(this.memberId);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fullMemberResponse'] && changes['fullMemberResponse'].currentValue) {
    }
  }

  getDietByMemberId(memberId: number) {
    this.memberService.getDietsByMemberId(memberId).subscribe((response) => {
      this.dataSource = response.diets;
      this.updateChart(response);
    });
  }

  updateChart(dietDto: DietDto) {
    const carbohydrates = dietDto.sumCarbohydrates!;
    const proteins = dietDto.sumProteins!
    const fats = dietDto.sumFats!

    let data: number[] = [carbohydrates, proteins, fats];

    this.doughnutChartData = {
      labels: ['Carbs', 'Proteins', 'Fats'],
      datasets: [
        {
          data: data,
          label: 'Micro elements',
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
  }

  save() {
    if (this.myForm.valid) {
      const diet: Diet = {
        memberId: this.memberId,
        product: this.myForm.get('product')?.value,
        carbohydrates: this.myForm.get('carbohydrates')?.value,
        proteins: this.myForm.get('proteins')?.value,
        fats: this.myForm.get('fats')?.value,
      };

      this.memberService.saveDiet(diet).subscribe(
        (response) => {
          this.dataSource = response.diets;
          this.updateChart(response);
        }
      );
    }
  }

  delete(id: number) {
    this.memberService.deleteDiet(id).subscribe(
      (response) => {
        this.dataSource = response.diets;
        this.updateChart(response);
      }
    );
  }

}
