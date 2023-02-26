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
import { PersonalCabinet } from './personal-cabinet';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ApiRequestModule,
    FormsModule,
    CommonModule,
    SharedModule.forRoot(),
    ReactiveFormsModule,
    BrowserModule,
    LoginModule,
    ProductsModule,
    PersonalCabinet,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
