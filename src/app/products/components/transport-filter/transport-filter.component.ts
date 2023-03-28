import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from '../../../api-module';
import { takeUntil } from 'rxjs';
import { BaseComponent } from '../../../shared';

@Component({
  selector: 'transport-filter',
  templateUrl: './transport-filter.component.html',
  styleUrls: ['./transport-filter.component.scss']
})
export class TransportFilterComponent extends BaseComponent implements OnInit {

  showMoreCarBrands: boolean;
  carBrands: Array<any>;


  constructor(private readonly apiRequestService: ApiRequestService) {
    super();
    this.showMoreCarBrands = false;
  }


  ngOnInit() {
    this.setCarBrands();
  }


  private setCarBrands() {
    this.apiRequestService.callOperation('get_car_brands')
      .pipe(takeUntil(this.onDestroy))
      .subscribe({
        next: (data) => {
          this.carBrands = data.payload;
        },
      })
  }

}
