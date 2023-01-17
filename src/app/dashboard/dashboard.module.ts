import { NgModule } from "@angular/core";

import { AnnouncesComponent, RecommendationComponent } from './components';
import { DashboardRouting } from './dashboard-routing.module';
import { DashboardPage } from './pages';


@NgModule({
  imports: [
    DashboardRouting,
  ],
  declarations: [
    AnnouncesComponent,
    DashboardPage,
    RecommendationComponent,
  ],
  providers: [],
})
export class DashboardModule { }