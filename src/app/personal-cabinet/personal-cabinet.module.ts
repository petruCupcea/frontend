import { NgModule } from '@angular/core';

import { PersonalCabinetRouting } from './personal-cabinet-routing.module';
import { PersonalPage } from './pages';


@NgModule({
  imports: [
    PersonalCabinetRouting,
  ],
  declarations: [
    PersonalPage,
  ],
})
export class PersonalCabinet {}
