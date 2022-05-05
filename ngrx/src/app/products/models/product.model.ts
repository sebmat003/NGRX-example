export interface IProduct {
  id: number;
  name: string;
  price: number;
  thumbnail: string;
}

export interface IProductCount {
  product: IProduct;
  count: number;
}
