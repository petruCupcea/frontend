import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';

import { BaseComponent } from '../../../shared';
import { ApiRequestService } from '../../../api-module';


@Component({
  selector: 'add-category-list',
  templateUrl: 'add-category-list.component.html',
  styleUrls: ['add-category-list.component.scss'],
})
export class AddCategoryList extends BaseComponent implements OnInit {

  categories: Array<any>;


  constructor(
    private readonly apiRequestService: ApiRequestService,
    private readonly router: Router,
  ) {
    super();
  }


  ngOnInit() {
    this.setCategories();
  }


  goToCategoryListPage(item: {categoryId: any; name: any}) {
    this.router.navigate(
      ['products/add-subcategory-list'],
      {queryParams: {categoryId: item.categoryId, name: item.name}}).then()
  }


  private setCategories() {
    this.apiRequestService.callOperation('get_groups')
      .pipe(takeUntil(this.onDestroy))
      .subscribe((data) => {
        this.categories = data.payload;
      })
  }

}
