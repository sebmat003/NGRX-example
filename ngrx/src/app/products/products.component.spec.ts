import { GetBucketProductCountPipe } from './pipes/getBucketProductCount.pipe';
import { productsReducer } from './../_store/products/product.reducer';
import {
  selectAllProducts,
  IProductsState,
} from './../_store/products/product.selectors';
import { of } from 'rxjs';
import { IProduct } from './models/product.model';
import { MatIconModule } from '@angular/material/icon';
import * as ProductActions from './../_store/products/product.actions';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { ProductsService } from './services/products.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { ProductsComponent } from './products.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let mockStore: MockStore<{ products: IProduct[] }>;
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
      ],
      imports: [
        StoreModule.forRoot({ products: productsReducer }),
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
});
