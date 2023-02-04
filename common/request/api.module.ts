import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';

import {
  ApiClientService,
  ApiErrorHandler,
  AuthInterceptorService,
} from './services';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  declarations: [],
  providers: [
  ],
})
export class RequestsModule {

  static forRoot(data: {configProvider: Provider}): ModuleWithProviders<RequestsModule> {
    return {
      ngModule: RequestsModule,
      providers: [
        ApiErrorHandler,
        ApiClientService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
        data.configProvider,
      ],
    };
  }

}
