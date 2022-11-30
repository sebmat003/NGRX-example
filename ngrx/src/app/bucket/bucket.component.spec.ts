import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as BucketActions from '../_store/bucket/bucket.actions';
import { selectBucket } from '../_store/bucket/bucket.selectors';
import { bucketReducer } from './../_store/bucket/bucket.reducer';
import { BucketComponent } from './bucket.component';
import { IBucket } from './models/bucket.model';
import { BucketService } from './services/bucket.service';


describe('BucketComponent', () => {
  let component: BucketComponent;
  let fixture: ComponentFixture<BucketComponent>;
  let mockStore: MockStore<{ bucket: IBucket }>;
  let mockBucketSelector: MemoizedSelector<IBucket, IBucket>;
  const initialState: IBucket = {
    products: [
      {
        product: {
          id: 1,
          name: 'product',
          price: 12,
          thumbnail: 'tea.jpg'
        },
        count: 1
      }
    ],
    overallPrice: 12,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BucketComponent],
      providers: [BucketService, provideMockStore<IBucket>({ initialState })],
      imports: [StoreModule.forRoot({ bucket: bucketReducer }), MatIconModule],
    }).compileComponents();
    mockStore = TestBed.get<Store>(Store);
    mockBucketSelector = mockStore.overrideSelector(selectBucket, initialState);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove product from bucket', () => {
    const dispatchSpy = jest.spyOn(mockStore, 'dispatch');
    fixture.debugElement.nativeElement
      .querySelector('.product-remover').querySelector('mat-icon')
      .click();
    expect(dispatchSpy).toHaveBeenCalledWith(BucketActions.removeProductCountFromBucket({ product: initialState.products[0] }));
  });
});
