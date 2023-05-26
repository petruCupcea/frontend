import { NgModule } from "@angular/core";

import { AnnouncesComponent, GadgetLoversComponent, RecommendationComponent } from './components';
import { DashboardRouting } from './dashboard-routing.module';
import { DashboardPage } from './pages';
import { NgForOf, NgIf } from '@angular/common';
import { ProductSmallCardComponent } from './components/product-small-card/product-small-card.component';
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
    GadgetLoversComponent,
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
