import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersonalPage } from './pages';


const routes: Routes = [
  {
    path: "cabinet",
    component: PersonalPage,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalCabinetRouting {}
