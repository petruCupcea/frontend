import { NgModule } from "@angular/core";

import { AnnouncesComponent, GadgetLoversComponent, RecommendationComponent } from './components';
import { DashboardRouting } from './dashboard-routing.module';
import { DashboardPage } from './pages';
import { NgForOf } from '@angular/common';


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
  ],
  providers: [],
})
export class DashboardModule {
}
