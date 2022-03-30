import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BucketComponent } from './bucket/bucket.component';
import { ProductsComponent } from './products/products.component';
import { ProductEffects } from './_store/products/product.effects';
import { productsReducer } from './_store/products/product.reducer';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    BucketComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    StoreModule.forRoot({ products: productsReducer }),
    EffectsModule.forRoot([ProductEffects]),
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
