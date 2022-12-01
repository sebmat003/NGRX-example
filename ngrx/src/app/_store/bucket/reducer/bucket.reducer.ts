import { createReducer, on } from '@ngrx/store';
import { IProductCount } from 'src/app/products/models/product.model';
import { IBucket } from '../../../bucket/models/bucket.model';
import * as BucketActions from '../actions/bucket.actions';
export const initialBucketState: IBucket = {
  products: [],
  overallPrice: 0,
};

export const bucketReducer = createReducer(
  initialBucketState,
  on(BucketActions.addProductCountToBucket, (state, { product }) => ({
    ...state,
    products: [...state.products, product],
    overallPrice: state.overallPrice + product.product.price * product.count,
  })),
  on(BucketActions.removeProductCountFromBucket, (state, { product }) => ({
    ...state,
    products: state.products.filter((p) => p.product.id !== product.product.id),
    overallPrice: state.overallPrice - product.product.price * product.count,
  })),
  on(BucketActions.changeProductCountQuantity, (state, { product }) => {
    const oldProduct = state.products.filter(
      (p) => product.product.id === p.product.id
    )[0];
    const updatedProducts = [...state.products];
    const index = updatedProducts.indexOf(oldProduct);
    updatedProducts[index] = product;
    return {
      ...state,
      products: updatedProducts,
      overallPrice:
        state.overallPrice -
        (oldProduct ? oldProduct.count * oldProduct.product.price : 0) +
        product.count * product.product.price,
    };
  }),
  on(BucketActions.editProductInBucket, (state, { product }) => {
    const productCount: IProductCount = {
      ...state.products.filter((p) => product.id === p.product.id)[0],
    };
    const updatedProducts = [...state.products].filter(
      (p) => p.product.id !== productCount.product.id
    );
    if (!productCount || !productCount.product) {
      return { ...state };
    }
    const modifiedProductCount = { ...productCount };
    modifiedProductCount.product = product;
    updatedProducts.push(modifiedProductCount);
    return {
      ...state,
      products: updatedProducts,
      overallPrice:
        state.overallPrice -
        productCount.count * productCount.product.price +
        modifiedProductCount.count * modifiedProductCount.product.price,
    };
  }),
  on(BucketActions.deleteProductFromBucket, (state, { productId }) => {
    const productCountToDelete = state.products.filter(
      (p) => p.product.id === productId
    )[0];
    if (!productCountToDelete || !productCountToDelete.product) {
      return { ...state };
    }
    return {
      ...state,
      products: state.products.filter((p) => p.product.id !== productId),
      overallPrice: state.overallPrice - productCountToDelete.product.price * productCountToDelete.count,
    };
  })
);
