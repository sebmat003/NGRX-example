import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jest-marbles';
import { Observable, of } from 'rxjs';
import { IProduct } from 'src/app/products/models/product.model';
import { ProductsService } from 'src/app/products/services/productsService/products.service';
import * as BucketActions from '../../bucket/actions/bucket.actions';
import * as ProductActions from '../actions/product.actions';
import { ProductEffects } from './product.effects';
 
 
describe('Product Effects', () => {
  let effects: ProductEffects;
  let actions: Observable<any>;
  const product: IProduct = {
    id: 1,
    name: 'name',
    price: 100,
    thumbnail: 'tea.jpg'
  }
  const mockProductsService = {
    getAllProducts: () => {}
  }
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ProductEffects,
        { provide: ProductsService, useValue: mockProductsService },
        provideMockActions(() => actions),
      ],
    });
 
    effects = TestBed.inject(ProductEffects);
  });

  it('should load product list successfully', () => {
    mockProductsService.getAllProducts = () => of([]);
    const action = ProductActions.getProductList();
    const completion = ProductActions.productListLoadSuccessfully({ products: []})
    actions = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });
 
    expect(effects.loadProducts$).toBeObservable(expected);
  });

  it('should fail loading product list', () => {
    const action = ProductActions.getProductList();
    const error = new Error();
    const failure = ProductActions.productListLoadFailure({ error });
    const errorResponse = cold('-#', {}, error);
    mockProductsService.getAllProducts = jest.fn(() => errorResponse);
    actions = hot('-a', { a: action });
    const expected = cold('--b', { b: failure });
 
    expect(effects.loadProducts$).toBeObservable(expected);
  });

  it('should edit product in bucket', () => {
    const action = ProductActions.editProduct({ product });
    const completion = BucketActions.editProductInBucket({ product })
    actions = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });
 
    expect(effects.editProduct$).toBeObservable(expected);
  });

  it('should delete product from bucket', () => {
    const action = ProductActions.deleteProduct({ productId: product.id });
    const completion = BucketActions.deleteProductFromBucket({ productId: product.id })
    actions = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });
 
    expect(effects.deleteProduct$).toBeObservable(expected);
  });

});