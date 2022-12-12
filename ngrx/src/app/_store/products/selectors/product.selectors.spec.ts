import { EntityState } from "@ngrx/entity";
import { IProduct } from "src/app/products/models/product.model";
import { convertArrayToEntityState } from "../../_utilities/functions/convert-array-to-entity-state.function";
import { selectAllProducts } from "./product.selectors";

describe('Product selectors', () => {
  const products: IProduct[] = [
    {
      id: 1,
      name: 'name',
      price: 100,
      thumbnail: 'test.jpg',
    },
    {
      id: 2,
      name: 'name2',
      price: 200,
      thumbnail: 'test2.jpg',
    },
  ];
  let productEntityState: EntityState<IProduct>;

  beforeAll(() => {
    productEntityState = {
      ...convertArrayToEntityState(products),
    };
  });

  it('should select all products', () => {
    const result = selectAllProducts.projector(productEntityState);
    expect(result).toEqual(products);
  });
});