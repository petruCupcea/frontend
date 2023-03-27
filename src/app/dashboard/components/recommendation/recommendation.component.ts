import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';

import { ApiRequestService } from '../../../api-module';
import { BaseComponent } from '../../../shared';


@Component({
  selector: 'recommendation',
  templateUrl: 'recommendation.component.html',
  styleUrls: ['recommendation.component.scss']
})
export class RecommendationComponent extends BaseComponent implements OnInit {

  products: any;
  url: any;


  constructor(
    private readonly apiRequestService: ApiRequestService,
  ) {
    super();
  }


  ngOnInit() {
    this.setProducts();
  }


  private setProducts() {
    this.apiRequestService.callOperation('get_products')
      .pipe(takeUntil(this.onDestroy))
      .subscribe({
        next: (data) => {
          this.products = data.payload;
          console.log(this.products);
        }
      });
  }

}
