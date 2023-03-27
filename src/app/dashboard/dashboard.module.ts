import { NgModule } from "@angular/core";

import { AnnouncesComponent, GadgetLoversComponent, RecommendationComponent } from './components';
import { DashboardRouting } from './dashboard-routing.module';
import { DashboardPage } from './pages';
import { NgForOf } from '@angular/common';
import { ProductSmallCardComponent } from './components/product-small-card/product-small-card.component';


@NgModule({
  imports: [
    DashboardRouting,
    NgForOf,
  ],
  declarations: [
    AnnouncesComponent,
    DashboardPage,
    GadgetLoversComponent,
    RecommendationComponent,
    ProductSmallCardComponent,
  ],
  providers: [],
})
export class DashboardModule {
}
