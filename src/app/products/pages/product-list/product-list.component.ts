import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


import { BaseComponent } from '../../../shared';
import { ApiRequestService } from '../../../api-module';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent extends BaseComponent implements OnInit {

  subcategoryId: string;
  subcategoryName: string;
  groupName: string;
  productList: any;


  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly apiRequestService: ApiRequestService,
  ) {
    super();
  }


  ngOnInit() {
    this.getRouteParams();
    this.setProductList();
  }


  private getRouteParams() {
    this.activatedRoute.queryParams.pipe(takeUntil(this.onDestroy)).subscribe({
      next: (params) => {
        this.subcategoryId = params['subcategoryId'];
        this.groupName = params['groupName'];
        this.subcategoryName = params['subcategoryName'];
        console.log(this.groupName);
      }
    });
  }


  private setProductList() {
    console.log(this.subcategoryId);
    this.apiRequestService.callOperation('get_products_by_subcategory', {id: this.subcategoryId})
      .pipe(takeUntil(this.onDestroy))
      .subscribe({
        next: (data) => {
          this.productList = data.payload;
          console.log(this.productList);
        },
      })
  }

}
