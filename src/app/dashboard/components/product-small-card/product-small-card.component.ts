import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import { ApiRequestService } from '../../../api-module';
import { BaseComponent } from '../../../shared';


@Component({
  selector: 'product-small-card',
  templateUrl: './product-small-card.component.html',
  styleUrls: ['./product-small-card.component.scss']
})
export class ProductSmallCardComponent extends BaseComponent implements OnInit {

  @Input() product: any;
  imageObject: any;


  constructor(
    private readonly apiRequestService: ApiRequestService,
    private readonly router: Router,
  ) {
    super();
  }


  ngOnInit() {
    this.setProductImage()
  }


  goToProductPage() {
    this.router.navigate(
      ['../products/product-page'],
      {queryParams: {productId: this.product.id}}).then();
  }


  private setProductImage() {
    this.apiRequestService.callOperation('get_single_image', {id: this.product.id})
      .pipe(takeUntil(this.onDestroy))
      .subscribe({
        next: (data) => {
          this.imageObject = data.payload;
        },
      })
  }

}
