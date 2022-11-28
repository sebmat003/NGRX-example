import { createFeatureSelector } from '@ngrx/store';
import { createSelector } from '@ngrx/store';
import { IBucket } from './../../bucket/models/bucket.model';
export const selectBucketFeature = createFeatureSelector<IBucket>('bucket');
export const selectBucket = createSelector(
  selectBucketFeature,
  (bucket: IBucket) => bucket
);

export const selectBucketProductById = (productId: number) =>
  createSelector(
    selectBucketFeature,
    (bucket: IBucket) =>
      bucket.products.filter((ps) => ps.product.id === productId)[0]
  );
