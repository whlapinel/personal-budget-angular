import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Input } from '@angular/core';
import { D3Service } from '../d3.service';


@Component({
  selector: 'pb-donutchart',
  standalone: true,
  imports: [],
  templateUrl: './donutchart.component.html',
  styleUrl: './donutchart.component.css'
})
export class DonutchartComponent {

  @Input("data") private data: any = [
    { name: 'Eat Out', value: 100, color: '#FF6384' },
    { name: 'Rent', value: 1000, color: '#36A2EB' },
    { name: 'Groceries', value: 1000, color: '#FFCE56' },
    { name: 'Utilities', value: 150, color: '#FF6384' },
    { name: 'Entertainment', value: 100, color: '#36A2EB' },
    { name: 'Transportation', value: 50, color: '#FFCE56' },
    { name: 'Health', value: 700, color: '#FF6384' },
    { name: 'Clothing', value: 50, color: '#36A2EB' },
    { name: 'Miscellaneous', value: 50, color: '#FFCE56' }  
  ];

  private margin = { top: 10, right: 30, bottom: 30, left: 40 };
  private width = 450;
  private height = 450;
  private svg: any;
  private colors: any;
  private radius = Math.min(this.width, this.height) / 2 - this.margin.left;
  
  constructor(
    @Inject(DOCUMENT)
    private document: Document,
    private dataService: DataService,
    private d3: D3Service) {
  }
  
  async ngOnInit() {
    this.createSvg();
    this.createColors(this.data);
    this.drawChart(this.data);
    this.getData();
  }

  private getData() {
    return this.dataService.getData();
  }

  private createSvg(): void {
    this.svg = this.d3.d3
      .select("figure#donut")
      .append("svg")
      .attr("viewBox", `0 0 ${this.width} ${this.height}`)
      .append("g")
      .attr(
        "transform",
        "translate(" + this.width / 2 + "," + this.height / 2 + ")"
      );
  }

  private createColors(data: any): void {
    let index = 0;
    const defaultColors = [
      "#6773f1",
      "#32325d",
      "#6162b5",
      "#6586f6",
      "#8b6ced",
      "#1b1b1b",
      "#212121"
    ];
    const colorsRange: any = [];
    this.data.forEach((element: any) => {
      if (element.color) colorsRange.push(element.color);
      else {
        colorsRange.push(defaultColors[index]);
        index++;
      }
    });
    this.colors = this.d3.d3
      .scaleOrdinal()
      .domain(data.map((d: any) => d.value.toString()))
      .range(colorsRange);
  }

  private drawChart(data: any): void {
    // Compute the position of each group on the pie:
    var pie = this.d3.d3
      .pie()
      .sort(null) // Do not sort group by size
      .value((d: any) => {
        return d.value;
      });
    var data_ready = pie(this.data);

    // The arc generator
    var arc = this.d3.d3
      .arc()
      .innerRadius(this.radius * 0.5) // This is the size of the donut hole
      .outerRadius(this.radius * 0.8);

    // Another arc that won't be drawn. Just for labels positioning
    var outerArc = this.d3.d3
      .arc()
      .innerRadius(this.radius * 0.9)
      .outerRadius(this.radius * 0.9);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    this.svg
      .selectAll("allSlices")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d: any) => this.colors(d.data.value))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    // Add the polylines between chart and labels:
    this.svg
      .selectAll("allPolylines")
      .data(data_ready)
      .enter()
      .append("polyline")
      .attr("stroke", "black")
      .style("fill", "none")
      .attr("stroke-width", 1)
      .attr("points", (d: any) => {
        var posA = arc.centroid(d); // line insertion in the slice
        var posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
        var posC = outerArc.centroid(d); // Label position = almost the same as posB
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = this.radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC];
      });

    // Add the polylines between chart and labels:
    this.svg
      .selectAll("allLabels")
      .data(data_ready)
      .enter()
      .append("text")
      .text((d: any) => {
        return d.data.name;
      })
      .attr("transform", (d: any) => {
        var pos = outerArc.centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = this.radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return "translate(" + pos + ")";
      })
      .style("text-anchor", (d: any) => {
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midangle < Math.PI ? "start" : "end";
      });
  }

}
