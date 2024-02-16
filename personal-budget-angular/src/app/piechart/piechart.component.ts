import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'pb-piechart',
  standalone: true,
  imports: [],
  templateUrl: './piechart.component.html',
  styleUrl: './piechart.component.css'
})
export class PiechartComponent {

  constructor(
    @Inject(DOCUMENT)
    private document: Document,
    private dataService: DataService) {
  }

  getChart() {
    return this.document.getElementById('myChart'); // Return the result of getElementById
  }

  title = 'ng-chart';

  chart: any = [];

  async ngOnInit() {
    const data = await this.dataService.data as any;
    console.log('piechart logging data:', data);
    const budget: any = [];
    const labels: any = [];

    data?.map((item: any) => {
      budget.push(item.budget);
      labels.push(item.title);
    })

    console.log('budget:', budget);
    

    console.log('ngOnInit');
    const ctx = this.getChart() as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Budget Amount',
            data: budget,
            borderWidth: 1,
          },
        ],
      },
      options: {
      },
    });
  }

  // this is for the d3 chart

}