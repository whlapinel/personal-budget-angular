import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { DataService } from '../data.service';
import { D3DonutChartComponent } from '../d3-donut-chart/d3-donut-chart.component';
import d3 from 'd3';


@Component({
  selector: 'pb-charts',
  standalone: true,
  imports: [D3DonutChartComponent],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent {

  constructor(
    @Inject(DOCUMENT)
    private document: Document,
    private http: HttpClient,
    private dataService: DataService) {
  }

  getChart() {
    return this.document.getElementById('myChart'); // Return the result of getElementById
  }

  title = 'ng-chart';

  chart: any = [];

  async ngOnInit() {
    const data = await this.dataService.data as any;
    console.log('data:', data);
    const budget: any = [];
    const labels: any = [];

    data.map((item: any) => {
      budget.push(item.budget);
      labels.push(item.title);
    })

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