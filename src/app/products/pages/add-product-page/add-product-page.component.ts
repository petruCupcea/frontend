import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { BaseComponent } from '../../../shared';
import { FormBuilder, FormControl, UntypedFormGroup } from '@angular/forms';
import { ApiRequestService } from '../../../api-module';

@Component({
  selector: 'add-product-page',
  templateUrl: './add-product-page.component.html',
  styleUrls: ['./add-product-page.component.scss']
})
export class AddProductPageComponent extends BaseComponent implements OnInit {

  groupId: string;
  groupName: string;
  subcategoryId: string;
  subcategoryName: string;
  formGroup: UntypedFormGroup;


  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly apiRequestService: ApiRequestService,
    formBuilder: FormBuilder,
  ) {
    super();
    this.formGroup = formBuilder.group({
      name: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(''),
      currency: new FormControl(''),
    })
  }


  ngOnInit(): void {
    this.getRouteParams();
  }


  handleProductAdding() {
    this.createNewProduct();
  }


  private createNewProduct() {
    this.apiRequestService.callOperation('create_product')
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        //need the id of the product
      })
  }


  private getRouteParams() {
    this.activatedRoute.queryParams.pipe(takeUntil(this.onDestroy)).subscribe({
      next: (params) => {
        this.groupId = params['groupId'];
        this.groupName = params['groupName'];
        this.subcategoryId = params['subcategoryId'];
        this.subcategoryName = params['subcategoryName'];
      }
    });
  }

}
