import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { filter, Observable, of, switchMap, take } from 'rxjs';
import { IBucket } from './../bucket/models/bucket.model';
import { BucketService } from './../bucket/services/bucket.service';
import {
  selectBucket,
  selectBucketProductById
} from './../_store/bucket/bucket.selectors';
import * as ProductActions from './../_store/products/product.actions';
import { selectAllProducts } from './../_store/products/product.selectors';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { IProduct } from './models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public products$!: Observable<(IProduct | undefined)[]>;
  public bucket$!: Observable<IBucket>;
  constructor(
    public bucketService: BucketService,
    private _store: Store<{ products: IProduct[] }>,
    private _dialog: MatDialog
  ) {
    this.products$ = _store.select(selectAllProducts);
    this.bucket$ = _store.select(selectBucket);
  }

  public ngOnInit(): void {
    this.getAllProducts();
  }

  public editProduct(product: IProduct): void {
    const dialogRef = this._dialog.open(AddEditProductComponent, {
      data: product,
    });
    dialogRef
      .afterClosed()
      .pipe(filter(Boolean),
       switchMap((result: IProduct) => of(this._store.dispatch(ProductActions.editProduct({ product: result })))))
      .subscribe();
  }

  public deleteProduct(id: number): void {
    this._store.dispatch(ProductActions.deleteProduct({ productId: id }));
  }

  public changeProductQuantity(product: IProduct, counter: number): void {
    this._store
      .select(selectBucketProductById(product.id))
      .pipe(take(1))
      .subscribe((p) => {
        const selectedProduct = p ? p : { count: 0, product: product };
        this.bucketService.changeProductQuantity(selectedProduct, counter);
      });
  }

  public addProduct(): void {
    const dialogRef = this._dialog.open(AddEditProductComponent);
    dialogRef
    .afterClosed()
      .pipe(filter(Boolean),
       switchMap((result: IProduct) => of(this._store.dispatch(ProductActions.addProduct({ product: result })))))
      .subscribe();
  }

  public getAllProducts(): void {
    this._store.dispatch(ProductActions.getProductList());
  }
}
