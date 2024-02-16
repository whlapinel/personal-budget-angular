import { Component } from '@angular/core';
import { ArticleComponent } from '../article/article.component';
import { PiechartComponent } from '../piechart/piechart.component';
import { DonutchartComponent } from '../donutchart/donutchart.component';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'pb-homepage',
  standalone: true,
  imports: [ArticleComponent, PiechartComponent, DonutchartComponent, BreadcrumbsComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
