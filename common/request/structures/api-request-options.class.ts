import { HttpHeaders, HttpParams } from '@angular/common/http';


export class ApiRequestOptions {

  params?: HttpParams;
  headers?: HttpHeaders;
  skipDefaultErrorHandler?: boolean;
  sendVersion?: boolean;
  sync?: boolean;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path?: string;


  constructor() {
    this.sendVersion = true;
    this.sync = false;
    this.method = 'POST';
    this.path = '/json_processor';
  }

}
