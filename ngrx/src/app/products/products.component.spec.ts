import { MatIconModule } from '@angular/material/icon';
import { bucketReducer } from './../_store/bucket/bucket.reducer';
import { productsReducer } from './../_store/products/product.reducer';
import { Store, StoreModule } from '@ngrx/store';
import { ProductsService } from './services/products.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      providers: [ProductsService],
      imports: [
        StoreModule.forRoot({ products: productsReducer }),
        MatDialogModule,
        MatIconModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
