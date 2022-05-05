import { bucketReducer } from './_store/bucket/bucket.reducer';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BucketComponent } from './bucket/bucket.component';
import { ProductsComponent } from './products/products.component';
import { ProductEffects } from './_store/products/product.effects';
import { productsReducer } from './_store/products/product.reducer';
import { AddEditProductComponent } from './products/components/add-edit-product/add-edit-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GetBucketProductCountPipe } from './products/pipes/getBucketProductCount.pipe';

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
