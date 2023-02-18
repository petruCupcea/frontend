import { NgModule } from '@angular/core';

import { ProductsRoutingModule } from './products-routing.module';
import { CategoriesList } from './pages';
import { NgForOf } from '@angular/common';


@NgModule({
  imports: [
    ProductsRoutingModule,
    NgForOf,
  ],
  declarations: [
    CategoriesList,
  ],
  providers: [],
})
export class ProductsModule {
}
