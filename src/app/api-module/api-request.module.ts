import { NgModule } from '@angular/core';

import { ApiRequestService } from './services';
import { HttpClient, HttpClientModule } from "@angular/common/http";


@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
  ],
  exports: [],
  providers: [
    ApiRequestService,
    HttpClient,
  ],
})
export class ApiRequestModule {
}
