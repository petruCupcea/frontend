import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SystemService } from "common/system";
import { ApiErrorHandler, RequestsModule } from "common/request";
import { Environment } from "common/core";
import { environmentFactory } from "common/core/core.module";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiCustomErrorHandler } from "./shared";
import { LoginModule } from './login';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    RequestsModule,
  ],
  providers: [
    {provide: ApiErrorHandler, useClass: ApiCustomErrorHandler, deps: [SystemService, Injector]},
    {provide: Environment, useFactory: environmentFactory},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
