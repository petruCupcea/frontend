import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';

import { ApiRequestService } from '../../../api-module';
import { BaseComponent } from '../../../shared';

@Component({
  selector: 'action-card',
  templateUrl: './action-card.component.html',
  styleUrls: ['./action-card.component.scss']
})
export class ActionCard extends BaseComponent implements OnInit {

  @Input() product: any;
  @Output() deleteEvent: EventEmitter<boolean>;
  imageObject: any;


  constructor(
    private readonly apiRequestService: ApiRequestService,
    private readonly router: Router,
  ) {
    super();
    this.deleteEvent = new EventEmitter<boolean>();
  }


  ngOnInit() {
    this.setProductImage();
  }


  goToProductPage() {
    this.router.navigate(['../product-page'], {queryParams: {productId: this.product.id}}).then();
  }


  goToProductForm() {
    this.router.navigate(['../product-page'], {queryParams: {productId: this.product.id}}).then();
  }


  deleteAction() {
    this.deleteUserProduct();
    this.deleteProduct();
  }


  private deleteUserProduct() {
    this.apiRequestService.callOperation('delete_user_product', {productId: this.product.id})
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.emitDeleteEvent();
      })
  }


  private deleteProduct() {
    this.apiRequestService.callOperation('delete_product', this.product)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
      });
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


  private emitDeleteEvent() {
    this.deleteEvent.emit(true);
  }

}
