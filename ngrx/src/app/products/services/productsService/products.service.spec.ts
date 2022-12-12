import { TestBed } from "@angular/core/testing";
import { PRODUCTS, ProductsService } from "./products.service";

describe('Products Service', () => {
  let service: ProductsService;

  beforeEach(() => {
    service = TestBed.inject(ProductsService);
  });

  it('should get all products', done => {
    const expected = PRODUCTS;
    service.getAllProducts().subscribe((result) => {
      expect(result).toEqual(expected);
      done();
    });
  });
});