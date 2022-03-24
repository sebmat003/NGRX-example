import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProduct } from './models/product.model';

const PRODUCTS: IProduct[] = [
  {
    id: 1, name: 'Burger', price: 30, thumbnail: 'burger.jpg'
  },
  {
    id: 1, name: 'French Fries', price: 10, thumbnail: 'fries.jpg'
  },
  {
    id: 1, name: 'Pizza', price: 45, thumbnail: 'pizza.jpg'
  },
  {
    id: 1, name: 'Hot-dog', price: 15, thumbnail: 'hotdog.jpg'
  }
];

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less']
})
export class ProductsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

  getAllProducts(): Observable<IProduct[]> {
    return of(PRODUCTS);
  }
}
