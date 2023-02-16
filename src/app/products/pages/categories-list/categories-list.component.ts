import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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


  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly apiRequestService: ApiRequestService,
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
    this.apiRequestService.callOperation('get_categories')
      .pipe(takeUntil(this.onDestroy))
      .subscribe({
        next: (data) => {
          console.log(data);
        }
      })
  }

}
