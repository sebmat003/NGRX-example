import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { IBucket } from '../bucket/models/bucket.model';
import { BucketService } from '../bucket/services/bucketService/bucket.service';
import { bucketReducer } from '../_store/bucket/reducer/bucket.reducer';
import {
  IProductsState,
  selectAllProducts
} from '../_store/products/selectors/product.selectors';
import * as ProductActions from './../_store/products/actions/product.actions';
import { productsReducer } from './../_store/products/reducer/product.reducer';
import { IProduct, IProductCount } from './models/product.model';
import { GetBucketProductCountPipe } from './pipes/getBucketProductCount.pipe';
import { ProductsComponent } from './products.component';
import { ProductsService } from './services/productsService/products.service';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let mockStore: MockStore<{ products: IProduct[]; bucket: IBucket }>;
  const mockBucketService = {
    changeProductQuantity: () => undefined,
  };
  const initialState: IProduct[] = [];
  let mockAllProductsSelector: MemoizedSelector<
    IProductsState,
    (IProduct | undefined)[]
  >;
  const mockedDialogRef = {
    afterClosed: () => of<IProduct>(),
  };

  const mockedDialog = {
    open: () => mockedDialogRef,
  };
  const mockInitialProducts: IProduct[] = [
    {
      id: 1,
      name: 'product',
      price: 5,
      thumbnail: 'pizza.jpg',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent, GetBucketProductCountPipe],
      providers: [
        ProductsService,
        provideMockStore<IProduct[]>({ initialState }),
        { provide: MatDialog, useValue: mockedDialog },
        { provide: BucketService, useValue: mockBucketService },
      ],
      imports: [
        StoreModule.forRoot({
          products: productsReducer,
          bucket: bucketReducer,
        }),
        MatDialogModule,
        MatIconModule,
      ],
    }).compileComponents();
    mockStore = TestBed.get<Store>(Store);
    mockAllProductsSelector = mockStore.overrideSelector(selectAllProducts, [
      ...mockInitialProducts,
    ]);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add product to product list', () => {
    const newProduct: IProduct = {
      id: 15,
      name: 'newProduct',
      price: 100,
      thumbnail: 'tea.jpg',
    };
    const dispatchSpy = jest.spyOn(mockStore, 'dispatch');
    jest
      .spyOn(mockedDialog, 'open')
      .mockReturnValue({ afterClosed: () => of(newProduct) });
    fixture.debugElement.nativeElement.querySelector('.add-product').click();
    expect(dispatchSpy).toHaveBeenCalledWith(
      ProductActions.addProduct({ product: newProduct })
    );
  });

  it('should edit product in product list', () => {
    const editedProduct: IProduct = {
      id: 1,
      name: 'editedProduct',
      price: 100,
      thumbnail: 'tea.jpg',
    };
    const dispatchSpy = jest.spyOn(mockStore, 'dispatch');
    jest
      .spyOn(mockedDialog, 'open')
      .mockReturnValue({ afterClosed: () => of(editedProduct) });
    fixture.debugElement.nativeElement
      .querySelector('.product-actions')
      .querySelector('mat-icon')
      .click();
    expect(dispatchSpy).toHaveBeenCalledWith(
      ProductActions.editProduct({ product: editedProduct })
    );
  });

  it('should delete product from product list', () => {
    const dispatchSpy = jest.spyOn(mockStore, 'dispatch');
    fixture.debugElement.nativeElement
      .querySelector('.product-actions')
      .querySelectorAll('mat-icon')[1]
      .click();
    expect(dispatchSpy).toHaveBeenCalledWith(
      ProductActions.deleteProduct({ productId: mockInitialProducts[0].id })
    );
  });

  it('should add product quantity', () => {
    const productCount: IProductCount = {
      count: 0,
      product: mockInitialProducts[0],
    };
    const selectBucketProductByIdSpy = jest
      .spyOn(mockStore, 'select')
      .mockReturnValue(of(productCount));
    const changeProductQuantityServiceSpy = jest.spyOn(
      mockBucketService,
      'changeProductQuantity'
    );
    const plusIcon: HTMLElement = Array.from(
      fixture.debugElement.nativeElement.querySelectorAll('mat-icon')
    ).find((i: any) => i.textContent === 'add_circle_outline') as HTMLElement;
    plusIcon.click();
    expect(selectBucketProductByIdSpy).toHaveBeenCalled();
    expect(changeProductQuantityServiceSpy).toHaveBeenCalled();
  });

  it('should set count to 0 if product is not found in bucket', () => {
    const selectBucketProductByIdSpy = jest
      .spyOn(mockStore, 'select')
      .mockReturnValue(of(undefined));
    const changeProductQuantityServiceSpy = jest.spyOn(
      mockBucketService,
      'changeProductQuantity'
    );
    component.changeProductQuantity(mockInitialProducts[0], -1);
    expect(selectBucketProductByIdSpy).toHaveBeenCalled();
    const params = {
      product: mockInitialProducts[0],
      count: 0,
    };
    expect(changeProductQuantityServiceSpy).toHaveBeenCalledWith(params, -1);
  });
});
