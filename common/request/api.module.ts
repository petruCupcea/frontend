import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';

import {
  ApiClientService,
  ApiErrorHandler,
  AuthInterceptorService,
} from './services';
import { SystemModule } from "../system";


@NgModule({
  imports: [
    SystemModule,
    CommonModule,
    HttpClientModule,
  ],
  declarations: [],
  providers: [
    ApiErrorHandler,
    ApiClientService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
  ],
})
export class RequestsModule {

  static forRoot(data: {configProvider: Provider}): ModuleWithProviders<RequestsModule> {
    return {
      ngModule: RequestsModule,
      providers: [
        ApiClientService,
        ApiErrorHandler,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
        data.configProvider,
      ],
    };
  }

}
