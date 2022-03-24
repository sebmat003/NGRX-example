import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BucketComponent } from './bucket/bucket.component';
import { ProductsComponent } from './products/products.component';
import { productsReducer } from './_store/products/product.reducer';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    BucketComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ products: productsReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
