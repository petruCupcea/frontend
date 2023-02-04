import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiClientService } from 'common/request';

import { DataSync } from '../classes';
import { REQUESTS_DEFINITION } from '../types';


@Injectable()
export class DataList {

  private readonly countries: DataSync<Array<any>>;


  constructor(private readonly apiClientService: ApiClientService) {
    this.countries = new DataSync<Array<any>>(this.apiClientService);
  }


  getCountries(): Observable<Array<any>> {
    return this.countries.requestData(REQUESTS_DEFINITION.KEY_GET_COUNTRIES, 'countries');
  }

}
