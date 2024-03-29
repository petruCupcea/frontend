import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent, RegisterComponent } from './pages';


const routes: Routes = [
  {
    path: "authenticate",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule { }
