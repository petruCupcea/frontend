import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';

import { AuthenticateService, BaseComponent } from '../../../shared';
import { ApiRequestService } from '../../../api-module';


@Component({
  selector: 'add-product-page',
  templateUrl: './add-product-page.component.html',
  styleUrls: ['./add-product-page.component.scss']
})
export class AddProductPageComponent extends BaseComponent implements OnInit {

  groupId: string;
  groupName: string;
  productId: string;
  subcategoryId: string;
  subcategoryName: string;
  requestInProgress: boolean;
  imagesAdded: boolean;
  userProductAdded: boolean;
  formGroup: UntypedFormGroup;


  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly apiRequestService: ApiRequestService,
    private readonly router: Router,
    private readonly authenticateService: AuthenticateService,
    formBuilder: FormBuilder,
  ) {
    super();
    this.formGroup = formBuilder.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      currency: new FormControl('', [Validators.required]),
      images: new FormControl('', [Validators.required]),
    });
    this.requestInProgress = false;
  }


  ngOnInit(): void {
    this.authenticateService.loggedIn.pipe(takeUntil(this.onDestroy))
      .subscribe((value: boolean) => {
        if (!value) {
          this.navigateToLoginPage();
        }
      })
    this.getRouteParams();
  }


  handleProductAdding() {
    let product = {
      name: this.formGroup.get("name").value,
      description: this.formGroup.get("description").value,
      price: this.formGroup.get("price").value.toString(),
      currency: this.formGroup.get("currency").value,
      groupId: this.groupId,
      subcategoryId: this.subcategoryId,
    }
    if (this.productId !== undefined) {
      product['id'] = this.productId;
    }
    if (product.name && product.description && product.price && product.currency) {
      (this.productId === undefined) ? this.createNewProduct(product) : this.editProduct(product);
    } else {
      alert('Nu au fost adaugate toate datele necesare. Va rugam sa completati formularul');
    }
  }


  private createNewProduct(product: any) {
    this.requestInProgress = true;
    this.apiRequestService.callOperation('create_product', product)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((data) => {
        let createdProductId = data.payload.id?.id;
        if (createdProductId !== undefined) {
          this.createUserProduct(createdProductId);
          this.createProductImages(createdProductId);
        }
      })
  }


  private editProduct(product: any) {
    this.requestInProgress = true;
    this.apiRequestService.callOperation('update_product', product)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.userProductAdded = true;
        this.imagesAdded = true;
        this.navigateToPersonalCabinet();
      });
  }


  private createUserProduct(productId: string) {
    this.apiRequestService.callOperation(
      'create_user_product',
      {userId: this.authenticateService.userId, productId: productId},
    ).pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.userProductAdded = true;
        this.navigateToPersonalCabinet();
        if (!this.formGroup.get('images').value) {
          this.imagesAdded = true;
          this.navigateToPersonalCabinet();
        }
      })
  }


  private createProductImages(productId: string) {
    this.apiRequestService.callOperation(
      'create_product_images',
      {}
    ).pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.imagesAdded = true;
        this.navigateToPersonalCabinet();
      })
  }


  private navigateToPersonalCabinet() {
    setTimeout(() => {
      if (this.userProductAdded && this.imagesAdded) {
        this.requestInProgress = false;
        this.router.navigate(['personal/cabinet']).then();
      }
    }, 3000);
  }


  private navigateToLoginPage() {
    this.router.navigate(['login/authenticate']).then();
  }


  private getRouteParams() {
    this.activatedRoute.queryParams.pipe(takeUntil(this.onDestroy)).subscribe({
      next: (params) => {
        this.groupId = params['groupId'];
        this.setGroupNameById(this.groupId);
        this.subcategoryId = params['subcategoryId'];
        this.setSubcategoryNameById(this.subcategoryId);
        if (params['productId']) {
          this.formGroup.get('images').disable();
          this.productId = params['productId'];
          this.patchProductToForm(this.productId);
        }
      }
    });
  }


  private setGroupNameById(id: string) {
    this.apiRequestService.callOperation('get_group_by_id', {id: id})
      .pipe(takeUntil(this.onDestroy))
      .subscribe((value) => {
        this.groupName = value.payload[0].name;
      });
  }


  private setSubcategoryNameById(id: string) {
    this.apiRequestService.callOperation('get_subcategory_by_id', {id: id})
      .pipe(takeUntil(this.onDestroy))
      .subscribe((value) => {
        this.subcategoryName = value.payload[0].name;
      });
  }


  private patchProductToForm(productId: string) {
    this.apiRequestService.callOperation('get_product_by_id', {productId: productId})
      .pipe(takeUntil(this.onDestroy))
      .subscribe((product) => {
        this.formGroup.patchValue(product.payload[0]);
      })
  }

}
