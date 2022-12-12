import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { IBucket } from 'src/app/bucket/models/bucket.model';
import { bucketReducer } from 'src/app/_store/bucket/reducer/bucket.reducer';
import { productsReducer } from 'src/app/_store/products/reducer/product.reducer';
import { IProduct } from '../models/product.model';
import { GetBucketProductCountPipe } from './getBucketProductCount.pipe';

describe('GetBucketProductCountPipe', () => {
  let pipe: GetBucketProductCountPipe;
  let mockStore: MockStore<{ products: IProduct[]; bucket: IBucket }>;
  const product: IProduct = {
    id: 1,
    name: 'product',
    price: 12,
    thumbnail: 'tea.jpg'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          products: productsReducer,
          bucket: bucketReducer,
        }),
      ],
      providers: [
        GetBucketProductCountPipe
      ]
    });
    pipe = TestBed.inject(GetBucketProductCountPipe);
    mockStore = TestBed.inject<Store>(Store) as MockStore<any>;
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return count number from existed product', done => {
    const productCount = {
      count: 5,
      product
    }

    jest.spyOn(mockStore, 'select').mockReturnValue(of(productCount));
    const expectedResult = productCount.count;
    pipe.transform(product).subscribe(result => {
      expect(result).toBe(expectedResult);
      done();
    });
  });

  it('should return count number 0 if product not exists in bucket', done => {
    jest.spyOn(mockStore, 'select').mockReturnValue(of(undefined));
    const expectedResult = 0;
    pipe.transform(product).subscribe(result => {
      expect(result).toBe(expectedResult);
      done();
    });
  });
});
