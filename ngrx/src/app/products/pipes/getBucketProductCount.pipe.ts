import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { IProduct } from 'src/app/products/models/product.model';
import { selectBucketProductById } from '../../_store/bucket/selectors/bucket.selectors';

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
