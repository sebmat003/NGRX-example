import { selectBucketProductById } from './../../_store/bucket/bucket.selectors';
import { Store } from '@ngrx/store';
import { IProduct } from 'src/app/products/models/product.model';
import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable } from 'rxjs';

@Pipe({
  name: 'getBucketProductCount',
})
export class GetBucketProductCountPipe implements PipeTransform {
  constructor(private _store: Store) {}
  transform(product: IProduct): Observable<number> {
    const storeProduct = this._store.select(
      selectBucketProductById(product.id)
    );
    return storeProduct.pipe(map((p) => (p && p.count ? p.count : 0)));
  }
}
