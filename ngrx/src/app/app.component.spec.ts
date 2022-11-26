import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { BucketService } from './bucket/services/bucket.service';
import { ProductsService } from './products/services/products.service';
import { bucketReducer } from './_store/bucket/bucket.reducer';
import { productsReducer } from './_store/products/product.reducer';
import { StoreModule } from '@ngrx/store';
import { BucketComponent } from './bucket/bucket.component';
import { ProductsComponent } from './products/products.component';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';

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
