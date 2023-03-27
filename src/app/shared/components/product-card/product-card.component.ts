import { Component, Input, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
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
