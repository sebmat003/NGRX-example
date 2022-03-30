import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllBooks } from '../_store/products/product.selectors';
import { IProduct } from './models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less']
})
export class ProductsComponent implements OnInit {
  public products$!: Observable<(IProduct | undefined)[]>;
  constructor(private _store: Store<{products: IProduct[]}>) {
    this.products$ = _store.select(selectAllBooks);
   }

  public ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts(): void {
    this._store.dispatch({
      type: '[Product List/API] Get Product List'
    });
  }
}
