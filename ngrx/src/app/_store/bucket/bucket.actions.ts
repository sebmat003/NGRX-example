import { IProductCount } from 'src/app/products/models/product.model';
import { props, createAction } from '@ngrx/store';

export const addProductToBucket = createAction(
  '[Bucket] Add Product',
  props<{ product: IProductCount }>()
);
export const removeProductFromBucket = createAction(
  '[Bucket] Remove Product',
  props<{ product: IProductCount }>()
);
export const changeProductQuantity = createAction(
  '[Bucket] Change Product Quantity',
  props<{ product: IProductCount }>()
);
