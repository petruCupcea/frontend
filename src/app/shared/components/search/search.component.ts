import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, UntypedFormGroup } from '@angular/forms';

import { ApiRequestService } from '../../../api-module';
import { BaseComponent } from '../../classes';
import { debounceTime, Subscription, takeUntil, window } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss'],
})
export class SearchComponent extends BaseComponent implements OnInit, OnDestroy {

  products: Array<any>;
  subscription: Subscription;
  formGroup: UntypedFormGroup;
  showSearchCard: boolean;


  constructor(
    private readonly apiRequestService: ApiRequestService,
    private readonly router: Router,
    formBuilder: FormBuilder,
  ) {
    super();
    this.showSearchCard = false;
    this.formGroup = formBuilder.group({
      search: new FormControl(''),
    });
  }


  ngOnInit() {
    this.createOutsideClickListener();
    this.formGroup.get('search').valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe((value) => {
        if (value !== '') {
          this.setSearchedProducts(value);
          this.showSearchCard = true;
        } else {
          this.showSearchCard = false;
        }
      })
  }


  goToProductPage(id: string) {
    this.router.navigate(['../product-page'], {queryParams: {productId: id}}).then();
    if (this.router.url.slice(0,13) === '/product-page') {
      console.log(this.router.url);
    }
    this.formGroup.get('search').reset();
    this.showSearchCard = false;
  }


  override ngOnDestroy() {
    super.ngOnDestroy();
  }


  private setSearchedProducts(productName: string) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.apiRequestService.callOperation('get_products_by_name', {productName: productName})
      .pipe(debounceTime(200), takeUntil(this.onDestroy))
      .subscribe((value) => {
        this.products = value.payload;
      })
  }


  private createOutsideClickListener() {
    const window =  document.defaultView;
    window.addEventListener('click', (event) => {
      if (!document.getElementById('searchBox')) {
        return;
      }
      // @ts-ignore
      if (document.getElementById('searchBox').contains(event?.target) || document.getElementById('searchInput').contains(event?.target)){

      } else{
        this.formGroup.get('search').reset();
        this.showSearchCard = false;
      }
    })
  }

}
