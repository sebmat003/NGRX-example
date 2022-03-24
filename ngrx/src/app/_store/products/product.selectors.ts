import { createFeatureSelector } from "@ngrx/store";
import { IProduct } from "src/app/products/models/product.model";

export const selectProducts = createFeatureSelector<IProduct[]>('products');