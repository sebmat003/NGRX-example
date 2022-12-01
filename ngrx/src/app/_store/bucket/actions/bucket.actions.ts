import { createAction, props } from '@ngrx/store';
import { IProduct, IProductCount } from 'src/app/products/models/product.model';

export const addProductCountToBucket = createAction(
  '[Bucket] Add ProductCount',
  props<{ product: IProductCount }>()
);
export const removeProductCountFromBucket = createAction(
  '[Bucket] Remove ProductCount',
  props<{ product: IProductCount }>()
);
export const changeProductCountQuantity = createAction(
  '[Bucket] Change ProductCount Quantity',
  props<{ product: IProductCount }>()
);
export const editProductInBucket = createAction(
  '[Bucket] Edit Product',
  props<{ product: IProduct }>() 
);
export const deleteProductFromBucket = createAction(
  '[Bucket] Delete Product',
  props<{ productId: number }>() 
);

