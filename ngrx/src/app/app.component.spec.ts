import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { BucketComponent } from './bucket/bucket.component';
import { BucketService } from './bucket/services/bucketService/bucket.service';
import { ProductsComponent } from './products/products.component';
import { ProductsService } from './products/services/productsService/products.service';
import { bucketReducer } from './_store/bucket/reducer/bucket.reducer';
import { productsReducer } from './_store/products/reducer/product.reducer';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({
          products: productsReducer,
          bucket: bucketReducer,
        }),
      ],
      declarations: [AppComponent, ProductsComponent, BucketComponent],
      providers: [ProductsService, BucketService],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
