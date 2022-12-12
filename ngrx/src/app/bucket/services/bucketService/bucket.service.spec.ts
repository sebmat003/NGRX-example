import { TestBed } from "@angular/core/testing";
import { Store, StoreModule } from "@ngrx/store";
import { MockStore } from "@ngrx/store/testing";
import { IProduct, IProductCount } from "src/app/products/models/product.model";
import { bucketReducer } from "src/app/_store/bucket/reducer/bucket.reducer";
import { productsReducer } from "src/app/_store/products/reducer/product.reducer";
import * as BucketActions from '../../../_store/bucket/actions/bucket.actions';
import { IBucket } from "../../models/bucket.model";
import { BucketService } from "./bucket.service";

describe('Bucket Service', () => {
  let service: BucketService;
  let mockStore: MockStore<{ products: IProduct[]; bucket: IBucket }>;
  const product: IProduct = {
    id: 1,
    name: 'product',
    price: 12,
    thumbnail: 'tea.jpg'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
      imports: [
        StoreModule.forRoot({
          products: productsReducer,
          bucket: bucketReducer,
        }),
      ]
    });
    service = TestBed.inject(BucketService);
    mockStore = TestBed.inject<Store>(Store) as MockStore<any>;
  });

  it('should dispatch removeProductCountFromBucket', () => {
    const productCount: IProductCount = {
      count: 1,
      product
    };
    const dispatchSpy = jest.spyOn(mockStore, 'dispatch');
    service.changeProductQuantity(productCount, -1);
    expect(dispatchSpy).toHaveBeenCalledWith(BucketActions.removeProductCountFromBucket({ product: productCount }))
  });

  it('should dispatch addProductCountToBucket', () => {
    const productCount: IProductCount = {
      count: 0,
      product
    };
    const dispatchSpy = jest.spyOn(mockStore, 'dispatch');
    service.changeProductQuantity(productCount, 1);
    const expectedProductCount = {
      ...productCount,
      count: 1
    };
    expect(dispatchSpy).toHaveBeenCalledWith(BucketActions.addProductCountToBucket({ product: expectedProductCount }))
  });

  it('should dispatch changeProductCountQuantity', () => {
    const productCount: IProductCount = {
      count: 15,
      product
    };
    const dispatchSpy = jest.spyOn(mockStore, 'dispatch');
    service.changeProductQuantity(productCount, 1);
    const expectedProductCount = {
      ...productCount,
      count: 16
    };
    expect(dispatchSpy).toHaveBeenCalledWith(BucketActions.changeProductCountQuantity({ product: expectedProductCount }))
  });
});