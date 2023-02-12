import { Component, OnInit } from '@angular/core';
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

  constructor(private readonly apiRequestService: ApiRequestService) {
    super();
  }


  ngOnInit() {
    this.setCategories();
  }


  private setCategories() {
    this.apiRequestService.callOperation('get_categories')
      .pipe(takeUntil(this.onDestroy))
      .subscribe({
        next: (data) => {
          this.categories = data.payload
        }
      })
  }

}
