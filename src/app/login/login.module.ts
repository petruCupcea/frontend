import { NgModule } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

import { LoginTile } from './components';
import { LoginComponent, RegisterComponent } from './pages';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    LoginRoutingModule,
    RouterLinkWithHref,
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
