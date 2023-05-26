import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { PersonalCabinetRouting } from './personal-cabinet-routing.module';
import { PersonalPage } from './pages';
import { SharedModule } from '../shared';
import { ActionCard } from './components';


@NgModule({
  imports: [
    PersonalCabinetRouting,
    CommonModule,
    SharedModule,
  ],
  declarations: [
    ActionCard,
    PersonalPage,
  ],
})
export class PersonalCabinet {}
