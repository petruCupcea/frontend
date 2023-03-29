import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  AddCategoryList,
  AddSubcategoryList,
  AddProductPageComponent,
  CategoriesList,
  ProductListComponent,
  ProductPageComponent
} from './pages';


const routes: Routes = [
  {
    path: "category-list",
    component: CategoriesList,
  },
  {
    path: "add-category-list",
    component: AddCategoryList,
  },
  {
    path: "add-subcategory-list",
    component: AddSubcategoryList,
  },
  {
    path: "product-list",
    component: ProductListComponent,
  },
  {
    path: "product-page",
    component: ProductPageComponent,
  },
  {
    path: "add-product-page",
    component: AddProductPageComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {
}
