import { Component, OnInit } from '@angular/core';

import { ApiRequestService } from '../../../api-module';
import { BaseComponent } from '../../../shared';


@Component({
  selector: 'personal-page',
  templateUrl: 'personal-page.component.html',
  styleUrls: ['personal-page.component.scss'],
})
export class PersonalPage extends BaseComponent implements OnInit {

  constructor(
    private readonly apiRequestService: ApiRequestService,
  ) {
    super();
  }


  ngOnInit() {
  }

}
