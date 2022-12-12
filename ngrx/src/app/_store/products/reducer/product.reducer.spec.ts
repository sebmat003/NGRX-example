import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IProduct } from 'src/app/products/models/product.model';
import { convertArrayToEntityState } from '../../_utilities/functions/convert-array-to-entity-state.function';
import * as ProductActions from './../actions/product.actions';
import { productsReducer } from './product.reducer';

describe('Product reducer', () => {
  const adapter: EntityAdapter<IProduct> = createEntityAdapter<IProduct>();
  const initialState: EntityState<IProduct> = adapter.getInitialState([]);
  const products: IProduct[] = [
    {
      id: 1,
      name: 'name',
      price: 100,
      thumbnail: 'test.jpg',
    },
    {
      id: 2,
      name: 'name2',
      price: 200,
      thumbnail: 'test2.jpg',
    },
  ];
  const productEntityState: EntityState<IProduct> = {
    ...convertArrayToEntityState(products),
  };
  it('should set all products', () => {
    const action = ProductActions.productListLoadSuccessfully({
      products: [...products],
    });
    const expectedState: EntityState<IProduct> = { ...productEntityState };
    const result = productsReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  it('should add product', () => {
    const newProduct: IProduct = {
      id: 3,
      name: 'name3',
      price: 300,
      thumbnail: 'test3.jpg',
    };
    const updatedProducts = [...products, newProduct];
    const action = ProductActions.addProduct({ product: { ...newProduct } });
    const expectedState: EntityState<IProduct> = {
      ...convertArrayToEntityState(updatedProducts),
    };
    const result = productsReducer(productEntityState, action);
    expect(result).toEqual(expectedState);
  });

  it('should delete product', () => {
    const product: IProduct = {
      id: 3,
      name: 'name3',
      price: 300,
      thumbnail: 'test3.jpg',
    };
    const initialProducts = [...products, product];
    const action = ProductActions.deleteProduct({ productId: product.id });
    const initialState: EntityState<IProduct> = {
      ...convertArrayToEntityState(initialProducts),
    };
    const result = productsReducer(initialState, action);
    expect(result).toEqual(productEntityState);
  });

  it('should edit product', () => {
    const editedProduct = {
      ...products[0],
      name: 'updated',
    };
    const action = ProductActions.editProduct({
      product: { ...editedProduct },
    });
    const result = productsReducer(productEntityState, action);
    const expectedProducts = [editedProduct, products[1]];
    const expectedState = {
      ...convertArrayToEntityState(expectedProducts)
    };
    expect(result).toEqual(expectedState);
  });
});
