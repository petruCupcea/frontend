import { NgModule } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

import { LoginTile } from './components';
import { LoginComponent, RegisterComponent } from './pages';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    LoginRoutingModule,
    RouterLinkWithHref,
    SharedModule.forChild(),
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    LoginTile,
  ],
  declarations: [
    LoginTile,
    LoginComponent,
    RegisterComponent,
  ],
})
export class LoginModule { }
