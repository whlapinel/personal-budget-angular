import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pb-breadcrumbs',
  standalone: true,
  imports: [],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css'
})
export class BreadcrumbsComponent {
  constructor(public router: Router) { }

  ngOnInit() {
    console.log('path', this.router.url); // e.g. /products
  }

}
