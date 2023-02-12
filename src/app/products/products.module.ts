import { NgModule } from '@angular/core';

import { ProductsRoutingModule } from './products-routing.module';
import { CategoriesList } from './pages';


@NgModule({
  imports: [
    ProductsRoutingModule,
  ],
  declarations: [
    CategoriesList,
  ],
  providers: [],
})
export class ProductsModule {
}
