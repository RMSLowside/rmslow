import { Component, OnInit } from '@angular/core';
import { ColorHelper } from '@swimlane/ngx-charts';

@Component({
  selector: 'rms-frontend-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  schedules = [
    {
      name: 'GRS1',
      value: 894
    },
    {
      name: 'RCS2',
      value: 500
    },
    {
      name: 'RCS3',
      value: 720
    },
    {
      name: 'GRS2',
      value: 400
    },
    {
      name: 'Needs Review',
      value: 210
    },
    {
      name: 'Non-Record',
      value: 100
    }
  ];
  recordsPerDay = [
    {
      name: 'Records',
      series: [
        {
          name: '5/15',
          value: 520
        },
        {
          name: '5/16',
          value: 600
        },
        {
          name: '5/17',
          value: 472
        },
        {
          name: '5/18',
          value: 381
        },
        {
          name: '5/19',
          value: 125
        },
        {
          name: '5/20',
          value: 236
        }
      ]
    }
  ];
  gridColumns = ['days', 'count'];
  gridData = [
    { days: 'Past Due', count: '5', rowClass: 'error' },
    { days: '7', count: '25', rowClass: 'warning' },
    { days: '30', count: '852' },
    { days: '60', count: '900' },
    { days: '90', count: '1500' }
  ];

  onSelect(event) {
    console.log(event);
  }
  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  timeline: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'right';

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
