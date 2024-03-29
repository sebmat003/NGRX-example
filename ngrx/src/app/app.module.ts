import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BucketComponent } from './bucket/bucket.component';
import { AddEditProductComponent } from './products/components/add-edit-product/add-edit-product.component';
import { GetBucketProductCountPipe } from './products/pipes/getBucketProductCount.pipe';
import { ProductsComponent } from './products/products.component';
import { bucketReducer } from './_store/bucket/reducer/bucket.reducer';
import { ProductEffects } from './_store/products/effects/product.effects';
import { productsReducer } from './_store/products/reducer/product.reducer';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    BucketComponent,
    AddEditProductComponent,
    GetBucketProductCountPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    StoreModule.forRoot({ products: productsReducer, bucket: bucketReducer }),
    EffectsModule.forRoot([ProductEffects]),
    StoreDevtoolsModule.instrument(),
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { minWidth: '50vw', hasBackdrop: true },
    },
  ],
  entryComponents: [AddEditProductComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
