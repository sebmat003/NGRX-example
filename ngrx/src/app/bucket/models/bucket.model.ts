import { IProductCount } from "src/app/products/models/product.model";

export interface IBucket {
  products: IProductCount;
  overallPrice: number;
}