import { Component } from '@angular/core';
import { ArticleComponent } from '../article/article.component';
import { ChartsComponent } from '../charts/charts.component';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'pb-homepage',
  standalone: true,
  imports: [ArticleComponent, ChartsComponent, BreadcrumbsComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
