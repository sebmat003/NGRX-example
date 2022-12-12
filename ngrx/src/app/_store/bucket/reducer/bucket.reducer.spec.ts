import { IBucket } from 'src/app/bucket/models/bucket.model';
import { IProduct, IProductCount } from 'src/app/products/models/product.model';
import * as BucketActions from '../actions/bucket.actions';
import { bucketReducer } from './bucket.reducer';
describe('Bucket reducer', () => {
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
  const bucket: IBucket = {
    products: [
      {
        product: products[0],
        count: 2
      }
    ],
    overallPrice: 200
  };
  const initialState: IBucket = bucket;
  it('should add productCount to bucket', () => {
    const newProductCount: IProductCount = {
      count: 1,
      product: products[1]
    }
    const action = BucketActions.addProductCountToBucket({ product: newProductCount });
    const expectedState: IBucket = { 
      ...bucket, 
      products: [...bucket.products, newProductCount], 
      overallPrice: 400 
    };
    const result = bucketReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  it('should remove productCount from bucket', () => {
    const action = BucketActions.removeProductCountFromBucket({ product: bucket.products[0] });
    const expectedState: IBucket = { 
      ...bucket, 
      products: [], 
      overallPrice: 0 
    };
    const result = bucketReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  it('should change productCount quantity in bucket', () => {
    const editedProductCount: IProductCount = { ...bucket.products[0], count: 1};
    const action = BucketActions.changeProductCountQuantity({ product: editedProductCount });
    const expectedState: IBucket = { 
      ...bucket, 
      products: [
        editedProductCount
      ], 
      overallPrice: 100
    };
    const result = bucketReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  it('should edit product in bucket', () => {
    const editedProduct: IProduct = { ...products[0], name: 'updated', price: 200 };
    const action = BucketActions.editProductInBucket({ product: editedProduct });
    const expectedState: IBucket = { 
      ...bucket, 
      products: [
        {
          product: editedProduct,
          count: 2
        }
      ], 
      overallPrice: 400
    };
    const result = bucketReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  it('should NOT edit product in bucket if product not found', () => {
    const editedProduct: IProduct = { id: 15, name: 'updated', price: 200, thumbnail: 'abc' };
    const action = BucketActions.editProductInBucket({ product: editedProduct });
    const expectedState: IBucket = bucket;
    const result = bucketReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  it('should delete product from bucket', () => {
    const action = BucketActions.deleteProductFromBucket({ productId: products[0].id });
    const expectedState: IBucket = { 
      ...bucket, 
      products: [], 
      overallPrice: 0
    };
    const result = bucketReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  it('should NOT delete product from bucket if product not found', () => {
    const editedProduct: IProduct = { id: 15, name: 'updated', price: 200, thumbnail: 'abc' };
    const action = BucketActions.deleteProductFromBucket({ productId: editedProduct.id });
    const expectedState: IBucket = bucket;
    const result = bucketReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });
});
