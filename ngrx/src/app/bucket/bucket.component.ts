import { BucketService } from './services/bucket.service';
import { IProductCount } from 'src/app/products/models/product.model';
import { selectBucket } from './../_store/bucket/bucket.selectors';
import { IBucket } from './models/bucket.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as BucketActions from '../_store/bucket/bucket.actions';

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
    this._store.dispatch(BucketActions.removeProductFromBucket({ product }));
  }
}
