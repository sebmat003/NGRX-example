import { IBucket } from './../../bucket/models/bucket.model';
import { createReducer, on } from '@ngrx/store';
import * as BucketActions from './bucket.actions';
export const initialState: IBucket = {
  products: [],
  overallPrice: 0,
};

export const bucketReducer = createReducer(
  initialState,
  on(BucketActions.addProductToBucket, (state, { product }) => ({
    ...state,
    products: [...state.products, product],
    overallPrice: state.overallPrice + product.product.price * product.count,
  })),
  on(BucketActions.removeProductFromBucket, (state, { product }) => ({
    ...state,
    products: state.products.filter((p) => p.product.id !== product.product.id),
    overallPrice: state.overallPrice - product.product.price * product.count,
  })),
  on(BucketActions.changeProductQuantity, (state, { product }) => {
    const oldProduct = state.products.filter(
      (p) => product.product.id === p.product.id
    )[0];
    const updatedProducts = state.products.filter(
      (p) => p.product.id !== product.product.id
    );
    updatedProducts.push(product);
    return {
      ...state,
      products: updatedProducts,
      overallPrice:
        state.overallPrice -
        (oldProduct ? oldProduct.count * oldProduct.product.price : 0) +
        product.count * product.product.price,
    };
  })
);
