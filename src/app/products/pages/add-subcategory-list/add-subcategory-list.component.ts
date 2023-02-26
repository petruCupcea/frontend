import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { BaseComponent } from '../../../shared';
import { ApiRequestService } from '../../../api-module';


@Component({
  selector: 'add-subcategory-list',
  templateUrl: 'add-subcategory-list.component.html',
  styleUrls: ['add-subcategory-list.component.scss'],
})
export class AddSubcategoryList extends BaseComponent implements OnInit {

  groupId: string;
  groupName: string;
  categoryList: Array<any>;


  constructor(
    private readonly apiRequestService: ApiRequestService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    super();
  }


  ngOnInit() {
    this.getRouteParams();
    this.getCategories();
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
