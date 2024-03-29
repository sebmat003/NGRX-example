import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { IProduct } from 'src/app/products/models/product.model';
import * as ProductActions from './../actions/product.actions';

export const adapter: EntityAdapter<IProduct> = createEntityAdapter<IProduct>();
export const initialState: EntityState<IProduct> = adapter.getInitialState([]);

export const productsReducer = createReducer(
  initialState,
  on(ProductActions.productListLoadSuccessfully, (state, { products }) =>
    adapter.setAll(products, state)
  ),
  on(ProductActions.addProduct, (state, { product }) =>
    adapter.addOne(product, state)
  ),
  on(ProductActions.deleteProduct, (state, { productId }) =>
    adapter.removeOne(productId, state)
  ),
  on(ProductActions.editProduct, (state, { product }) =>
    adapter.updateOne({ id: product.id, changes: product }, state)
  )
);
