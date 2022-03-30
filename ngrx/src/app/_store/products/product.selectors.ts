import { EntityState } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IProduct } from "src/app/products/models/product.model";

export interface IProductsState {
  products: IProduct[];
}

export const selectBooksFeature = createFeatureSelector<EntityState<IProduct[]>>('products');
 
export const selectAllBooks = createSelector(
  selectBooksFeature,
  (products: EntityState<IProduct[]>) => {
    return Object.values(products.entities) as (IProduct | undefined)[];
  }
)