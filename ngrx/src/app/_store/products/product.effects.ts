import { Update } from '@ngrx/entity';
import { IProduct } from './../../products/models/product.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ProductsService } from 'src/app/products/services/products.service';
import * as ProductActions from './product.actions';

@Injectable()
export class ProductEffects {
  constructor(
    private _actions$: Actions,
    private _productsService: ProductsService
  ) {}
  public loadProducts$ = createEffect(() => {
    return this._actions$.pipe(
      ofType('[Product List/API] Get Product List'),
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
}
