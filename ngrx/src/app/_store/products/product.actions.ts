import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { IProduct } from 'src/app/products/models/product.model';

export const addProduct = createAction(
  '[Product List/API] Add Product',
  props<{ product: IProduct }>()
);

export const editProduct = createAction(
  '[Product List/API] Edit Product',
  props<{ update: Update<IProduct> }>()
);

export const deleteProduct = createAction(
  '[Product List/API] Delete Product',
  props<{ productId: number }>()
);

export const getProductList = createAction(
  '[Product List/API] Get Product List',
  props<{ products: IProduct[] }>()
);