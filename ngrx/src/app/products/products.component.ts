import { BucketService } from './../bucket/services/bucket.service';
import {
  selectBucket,
  selectBucketProductById,
} from './../_store/bucket/bucket.selectors';
import { IBucket } from './../bucket/models/bucket.model';
import { selectAllProducts } from './../_store/products/product.selectors';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { IProduct } from './models/product.model';
import * as ProductActions from './../_store/products/product.actions';
import { MatDialog } from '@angular/material/dialog';

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
      .pipe(take(1))
      .subscribe((result: IProduct) => {
        if (result) {
          this._store.dispatch(ProductActions.editProduct({ product: result }));
        }
      });
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
      .pipe(take(1))
      .subscribe((result: IProduct) => {
        if (result) {
          this._store.dispatch(ProductActions.addProduct({ product: result }));
        }
      });
  }

  public getAllProducts(): void {
    this._store.dispatch(ProductActions.getProductList());
  }
}
