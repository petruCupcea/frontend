import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ApiRequestModule } from "./api-module";
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login';
import { ProductsModule } from './products';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LoginModule,
    ProductsModule,
    ApiRequestModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
