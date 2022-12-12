import { IBucket } from "src/app/bucket/models/bucket.model";
import { IProduct } from "src/app/products/models/product.model";
import { selectBucket, selectBucketProductById } from "./bucket.selectors";
describe('Bucket selectors', () => {
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
  const bucket: IBucket = {
    products: [
      {
        product: products[0],
        count: 2
      },
      {
        product: products[1],
        count: 1
      }
    ],
    overallPrice: 400
  };


  it('should get bucket', () => {
    const bucketSelector = selectBucket.projector(bucket);
    expect(bucketSelector).toEqual(bucket)
  });

  it('should select bucket product by provided id', () => {
    const bucketProduct = selectBucketProductById(1).projector(bucket);
    expect(bucketProduct).toEqual(bucket.products[0]);
  });
});