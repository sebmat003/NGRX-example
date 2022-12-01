import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { IProduct } from 'src/app/products/models/product.model';

export const addProduct = createAction(
  '[Product List/API] Add Product',
  props<{ product: IProduct }>()
);

export const editProduct = createAction(
  '[Product List/API] Edit Product',
  props<{ product: IProduct }>()
);

export const deleteProduct = createAction(
  '[Product List/API] Delete Product',
  props<{ productId: number }>()
);

export const getProductList = createAction(
  '[Product List/API] Get Product List'
);

export const productListLoadSuccessfully = createAction(
  '[Product List/API] Product List Success',
  props<{ products: IProduct[] }>()
);

export const productListLoadFailure = createAction(
  '[Product List/API] Product List Error',
  props<{ error: any }>()
);
