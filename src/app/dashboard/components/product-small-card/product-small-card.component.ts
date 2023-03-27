import { Component, Input, OnInit } from '@angular/core';
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


  constructor(private readonly apiRequestService: ApiRequestService) {
    super();
  }


  ngOnInit() {
    this.setProductImage()
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
