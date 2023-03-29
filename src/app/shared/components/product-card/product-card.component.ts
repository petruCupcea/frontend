import { Component, Input, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';

import { ApiRequestService } from '../../../api-module';
import { BaseComponent } from '../../classes';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent extends BaseComponent implements OnInit {

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
    this.router.navigate(['../product-page'], {queryParams: {productId: this.product.id}}).then();
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
