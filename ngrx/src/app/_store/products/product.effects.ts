import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ProductsService } from 'src/app/products/services/products.service';
import * as BucketActions from './../bucket/bucket.actions';
import * as ProductActions from './product.actions';

@Injectable()
export class ProductEffects {
  constructor(
    private _actions$: Actions,
    private _productsService: ProductsService
  ) {}
  public loadProducts$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ProductActions.getProductList),
      switchMap(() =>
        this._productsService.getAllProducts().pipe(
          map((products) =>
            ProductActions.productListLoadSuccessfully({ products })
          ),
          catchError((error) =>
            of(ProductActions.productListLoadFailure({ error }))
          )
        )
      )
    );
  });

  public editProduct$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ProductActions.editProduct),
      switchMap((action) => of(BucketActions.editProductInBucket( { product: action.product })))
    );
  });

  public deleteProduct$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ProductActions.deleteProduct),
      switchMap((action) => of(BucketActions.deleteProductFromBucket( { productId: action.productId })))
    );
  });
}
