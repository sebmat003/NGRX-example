import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IProductCount } from 'src/app/products/models/product.model';
import * as BucketActions from '../_store/bucket/actions/bucket.actions';
import { selectBucket } from '../_store/bucket/selectors/bucket.selectors';
import { IBucket } from './models/bucket.model';
import { BucketService } from './services/bucketService/bucket.service';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.scss'],
})
export class BucketComponent implements OnInit {
  public bucket$!: Observable<IBucket>;
  constructor(public bucketService: BucketService, private _store: Store) {}

  public ngOnInit(): void {
    this.bucket$ = this._store.select(selectBucket);
  }

  public removeProduct(product: IProductCount): void {
    this._store.dispatch(BucketActions.removeProductCountFromBucket({ product }));
  }
}
