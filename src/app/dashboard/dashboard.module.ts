import { NgModule } from "@angular/core";

import {
  AnnouncesComponent,
  DeliveryComponent,
  GadgetLoversComponent,
  ProductSmallCardComponent,
  RealEstate,
  RecommendationComponent,
} from './components';
import { DashboardRouting } from './dashboard-routing.module';
import { DashboardPage } from './pages';
import { NgForOf, NgIf } from '@angular/common';
import { SharedModule } from '../shared';


@NgModule({
  imports: [
    DashboardRouting,
    NgForOf,
    SharedModule,
    NgIf,
  ],
  declarations: [
    AnnouncesComponent,
    DashboardPage,
    DeliveryComponent,
    GadgetLoversComponent,
    RealEstate,
    RecommendationComponent,
    ProductSmallCardComponent,
  ],
  providers: [],
  exports: [
    ProductSmallCardComponent
  ]
})
export class DashboardModule {
}
