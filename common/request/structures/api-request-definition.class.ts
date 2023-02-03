import { HttpHeaders, HttpParams } from '@angular/common/http';

import { ApiRequestBody } from './api-request-body.class';


export class ApiRequestDefinition {

  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string | ((body: ApiRequestBody) => string);
  headers?: HttpHeaders;
  params?: HttpParams;
  body?: ApiRequestBody;
  sync?: boolean;

}
