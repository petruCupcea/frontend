import { NgModule } from '@angular/core';

import { ProductsRoutingModule } from './products-routing.module';
import { AddCategoryList, AddSubcategoryList, CategoriesList, ProductListComponent } from './pages';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { TransportFilterComponent } from './components';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProductsRoutingModule,
  ],
  declarations: [
    AddCategoryList,
    AddSubcategoryList,
    CategoriesList,
    ProductListComponent,
    TransportFilterComponent,
  ],
  providers: [],
})
export class ProductsModule {
}
