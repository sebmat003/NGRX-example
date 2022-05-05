import { EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IProduct } from 'src/app/products/models/product.model';

export interface IProductsState {
  products: IProduct[];
}

export const selectProductsFeature =
  createFeatureSelector<EntityState<IProduct[]>>('products');

export const selectAllProducts = createSelector(
  selectProductsFeature,
  (products: EntityState<IProduct[]>) => {
    return Object.values(products.entities) as (IProduct | undefined)[];
  }
);
