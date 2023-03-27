import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import { BaseComponent } from '../../../shared';
import { ApiRequestService } from '../../../api-module';


@Component({
  selector: 'categories-list',
  templateUrl: 'categories-list.component.html',
  styleUrls: ['categories-list.component.scss'],
})
export class CategoriesList extends BaseComponent implements OnInit {

  groupName: string;
  groupId: number;
  categoryList: Array<any>;


  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly apiRequestService: ApiRequestService,
    private readonly router: Router,
  ) {
    super();
  }


  ngOnInit() {
    this.getRouteParams();
    this.getCategories();
  }


  navigateToProductList(id: string, name: string) {
    this.router.navigate(['../product-list'],
      {
        queryParams: {
          groupId: this.groupId,
          groupName: this.groupName,
          subcategoryId: id,
          subcategoryName: name,
        },
      }).then();
  }


  private getRouteParams() {
    this.activatedRoute.queryParams.pipe(takeUntil(this.onDestroy)).subscribe({
      next: (params) => {
        this.groupId = params['categoryId'];
        this.groupName = params['name'];
      }
    });
  }


  private getCategories() {
    this.apiRequestService.callOperation('get_categories', {groupId: this.groupId})
      .pipe(takeUntil(this.onDestroy))
      .subscribe({
        next: (data) => {
          this.categoryList = data.payload;
          this.categoryList.forEach((item) => {
            this.setSubCategories(item);
          });
        }
      })
  }


  private setSubCategories(category: any) {
    this.apiRequestService.callOperation('get_subcategories', {categoryId: category.id})
      .pipe(takeUntil(this.onDestroy))
      .subscribe({
        next: (data) => {
          category['subCategoryList'] = data.payload;
        },
      })
  }

}
