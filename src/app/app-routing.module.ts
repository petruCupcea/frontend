import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "dashboard",
    loadChildren: () => import("./dashboard").then(module => module.DashboardModule),
  },
  {
    path: "login",
    loadChildren: () => import("./login").then(module => module.LoginModule)
  },
  {
    path: "products",
    loadChildren: () => import("./products").then(module => module.ProductsModule)
  },
  {
    path: "personal",
    loadChildren: () => import("./personal-cabinet").then(module => module.PersonalCabinet)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
