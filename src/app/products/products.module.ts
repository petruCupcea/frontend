import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { AddCategoryList, AddSubcategoryList, CategoriesList, ProductListComponent, ProductPageComponent } from './pages';
import { SharedModule } from '../shared';
import { TransportFilterComponent } from './components';
import { AddProductPageComponent } from './pages/add-product-page/add-product-page.component';


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
    ProductPageComponent,
    AddProductPageComponent,
  ],
  providers: [],
})
export class ProductsModule {
}
