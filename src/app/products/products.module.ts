import { NgModule } from '@angular/core';

import { ProductsRoutingModule } from './products-routing.module';
import { AddCategoryList, AddSubcategoryList, CategoriesList } from './pages';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    ProductsRoutingModule,
    CommonModule,
  ],
  declarations: [
    AddCategoryList,
    AddSubcategoryList,
    CategoriesList,
  ],
  providers: [],
})
export class ProductsModule {
}
