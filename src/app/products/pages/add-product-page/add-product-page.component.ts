import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { BaseComponent } from '../../../shared';

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


  constructor(
    private readonly activatedRoute: ActivatedRoute,
  ) {
    super();
  }


  ngOnInit(): void {
    this.getRouteParams();
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
