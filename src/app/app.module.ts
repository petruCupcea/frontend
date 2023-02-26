import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { ApiRequestModule } from "./api-module";
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login';
import { ProductsModule } from './products';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LoginModule,
    ProductsModule,
    ApiRequestModule,
    FormsModule,
    CommonModule,
    SharedModule.forRoot(),
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
