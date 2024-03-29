import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { BaseComponent } from '../../../shared';
import { ApiRequestService } from '../../../api-module';


@Component({
  selector: 'product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent extends BaseComponent implements OnInit {

  productId: string;
  product: any;
  productImages: Array<any>;
  favoriteProduct: boolean;
  group: any;
  subcategory: any;
  recommendedProducts: Array<any>;


  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly apiRequestService: ApiRequestService,

  ) {
    super();
    this.favoriteProduct = false;
  }


  ngOnInit(): void {
    this.getRouteParams();
    this.setProduct();
    this.setProductImages();
  }


  private getRouteParams() {
    this.activatedRoute.queryParams.pipe(takeUntil(this.onDestroy)).subscribe({
      next: (params) => {
        this.productId = params['productId'];
      }
    });
  }


  private setProduct() {
    this.apiRequestService.callOperation('get_product_by_id', {productId: this.productId})
      .pipe(takeUntil(this.onDestroy))
      .subscribe({
        next: (data) => {
          this.product = data.payload[0];
          this.setGroup();
          this.setSubCategory();
        },
      })
  }


  private setProductImages() {
    this.apiRequestService.callOperation('get_product_images', {id: this.productId})
      .pipe(takeUntil(this.onDestroy))
      .subscribe({
        next: (data) => {
          this.productImages = data.payload;
        },
      })
  }


  private setGroup() {
    this.apiRequestService.callOperation('get_group_by_id', {id: this.product?.groupId})
      .pipe(takeUntil(this.onDestroy))
      .subscribe({
        next: (data) => {
          this.group = data.payload[0];
        },
      })
  }


  private setSubCategory() {
    this.apiRequestService.callOperation('get_subcategory_by_id', {id: this.product?.subcategoryId})
      .pipe(takeUntil(this.onDestroy))
      .subscribe({
        next: (data) => {
          this.subcategory = data.payload[0];
          this.setRecommendedProducts();
        },
      })
  }


  private setRecommendedProducts() {
    this.apiRequestService.callOperation(
      'get_recommended_products_by_subcategory',
      {subcategoryId: this.subcategory.id, productId: this.product.id}
    ).pipe(takeUntil(this.onDestroy))
      .subscribe({
        next: (data) => {
          this.recommendedProducts = data.payload;
          console.log(this.recommendedProducts);
        },
      })
  }

}
