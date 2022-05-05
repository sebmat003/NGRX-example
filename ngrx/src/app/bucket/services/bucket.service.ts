import { IProduct } from 'src/app/products/models/product.model';
import { IProductCount } from 'src/app/products/models/product.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as BucketActions from '../../_store/bucket/bucket.actions';

@Injectable({
  providedIn: 'root',
})
export class BucketService {
  constructor(private _store: Store) {}

  public changeProductQuantity(product: IProductCount, counter: number): void {
    if (product.count + counter === 0) {
      this._store.dispatch(BucketActions.removeProductFromBucket({ product }));
    } else {
      const updatedProduct = {
        count: product.count + counter,
        product: product.product,
      };
      console.log(updatedProduct);
      this._store.dispatch(
        BucketActions.changeProductQuantity({ product: updatedProduct })
      );
    }
  }
}
