import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import { ApiRequestService } from '../../../api-module';
import { AuthenticateService, BaseComponent } from '../../../shared';


@Component({
  selector: 'personal-page',
  templateUrl: 'personal-page.component.html',
  styleUrls: ['personal-page.component.scss'],
})
export class PersonalPage extends BaseComponent implements OnInit {

  productData: Array<any>;
  userProduct: Array<any>;


  constructor(
    private readonly apiRequestService: ApiRequestService,
    private readonly authenticateService: AuthenticateService,
    private readonly router: Router,
  ) {
    super();
    this.productData = [];
  }


  ngOnInit() {
    this.authenticateService.getLoggedInValue()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((value) => {
        if (value) {
          this.setUserProducts();
        } else {
          this.router.navigate(['../../dashboard']).then();
        }
      })
  }


  private setUserProducts() {
    this.apiRequestService.callOperation('get_user_products',{userId: this.authenticateService.userId})
      .pipe(takeUntil(this.onDestroy))
      .subscribe((data) => {
        this.userProduct = data.payload;
        console.log(this.userProduct);
        this.userProduct.map((item) => {
          this.setProductData(item.productId);
        })
      })
  }


  private setProductData(productId) {
    this.apiRequestService.callOperation('get_product_by_id', {productId: productId})
      .pipe(takeUntil(this.onDestroy))
      .subscribe((data) => {
        this.productData.push(data.payload[0]);
        console.log(this.productData);
      })
  }

}
