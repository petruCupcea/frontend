import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from "@angular/common/http";

import { AppComponent } from './app.component';
import { ApiRequestModule } from "./api-module";
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    ApiRequestModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
