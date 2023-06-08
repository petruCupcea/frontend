import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { ApiRequestService } from '../../../api-module';
import { BaseComponent } from '../../../shared';


@Component({
  selector: 'real-estate',
  templateUrl: 'real-estate.component.html',
  styleUrls: ['real-estate.component.scss'],
})
export class RealEstate extends BaseComponent implements OnInit {

  productList: any;


  constructor(
    private readonly apiRequestService: ApiRequestService,
  ) {
    super();
  }


  ngOnInit() {
    this.setRealEstateProducts();
  }


  private setRealEstateProducts() {
    this.apiRequestService.callOperation('get_products_by_group', {id: 2})
      .pipe(takeUntil(this.onDestroy))
      .subscribe({
        next: (data) => {
          this.productList = data.payload;
          console.log(this.productList);
        },
      })
  }

}
