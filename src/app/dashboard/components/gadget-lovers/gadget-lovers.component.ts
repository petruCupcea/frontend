import { Component, OnInit } from "@angular/core";
import { takeUntil } from 'rxjs';

import { ApiRequestService } from '../../../api-module';
import { BaseComponent } from '../../../shared';


@Component({
  selector: 'gadget-lovers',
  templateUrl: 'gadget-lovers.component.html',
  styleUrls: ['gadget-lovers.component.scss'],
})
export class GadgetLoversComponent extends BaseComponent implements OnInit {

  productList: any;
  carousel: any;


  constructor(
    private readonly apiRequestService: ApiRequestService,
  ) {
    super();
  }


  ngOnInit() {
    this.setProductList();
  }


  private setProductList() {
    this.apiRequestService.callOperation('get_products_by_group', {id: 3})
      .pipe(takeUntil(this.onDestroy))
      .subscribe({
        next: (data) => {
          this.productList = data.payload;
        },
      })
  }

}
