import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges
} from '@angular/core';

@Component({
  selector: 'app-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div>
    <canvas baseChart
      [datasets]="barChartData"
      [labels]="barChartLabels"
      [options]="barChartOptions"
      [legend]="barChartLegend"
      [colors]="'#ef6c00'"
      [chartType]="barChartType">
    </canvas>
  </div>
  `,
})
export class ChartComponent implements OnChanges {
  @Input() predictions: Array<number> | undefined = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

  public barChartOptions = barChartOptions;
  public barChartLabels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  public barChartType = 'bar';
  public barChartLegend = false;
  public barChartData: any;

  ngOnChanges() {
    this.barChartData = [
      {
        data: this.predictions,
        label: 'Predictions',
        backgroundColor: '#ef6c00'
      }
    ];
  }
}

const barChartOptions = {
  scaleShowVerticalLines: false,
  responsive: true,
  backgroundColor: '#ef6c00',
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false
        },
        ticks: {
          fontSize: 40
        }
      }
    ],
    yAxes: [
      {
        display: false,
        gridLines: {
          display: false
        }
      }
    ]
  }
};
