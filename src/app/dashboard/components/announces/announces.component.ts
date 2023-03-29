import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import { ApiRequestService } from '../../../api-module';
import { BaseComponent } from '../../../shared';


@Component({
  selector: 'announces',
  templateUrl: 'announces.component.html',
  styleUrls: ['announces.component.scss']
})
export class AnnouncesComponent extends BaseComponent implements OnInit {

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
      ['products/category-list'],
      {queryParams: {categoryId: item.categoryId, name: item.name}}).then()
  }


  private setCategories() {
    this.apiRequestService.callOperation('get_groups')
      .pipe(takeUntil(this.onDestroy))
      .subscribe({
        next: (data) => {
          this.categories = data.payload;
        }
      })
  }

}
