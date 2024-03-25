import {
  Bucket,
  bucketSortActions as actions,
} from "../../../../store/reducers/sorts/bucketSortReducer";
import { BucketSortOperation, SortItem } from "../helpers/types";


const k = 4;
const bucketMaxValue = 20;
const gap = bucketMaxValue / 4;

export const BucketSort = (array: SortItem[]) => {
  if (!array || array.length <= 0) {
    return [];
  }
  const buckets: Bucket[] = [] as Bucket[];
  const opArr: BucketSortOperation[] = [];
  const M = 1 + bucketMaxValue;
  let bucketNum = 0;

  opArr.push({ action: actions.setLine, payload: 2 });
  let start = 0;
  let end = gap;
  for (let i = 0; i < k; i++) {
    const bucket: Bucket = {
      title: `Bucket\n(${start}-${end})`,
      data: [],
      index: i,
    };
    start = start === 0 ? (start += 1) : start;
    start += gap;
    end += gap;
    buckets.push(bucket);
  }
  opArr.push({
    action: actions.setBuckets,
    payload: { line: 3, payload: buckets },
  });

  opArr.push({ action: actions.setLine, payload: 4 });
  opArr.push({ action: actions.setLine, payload: 5 });
  for (const item of array) {
    bucketNum = Math.floor((k * item.value) / M);
    // Mark the current bucket
    opArr.push({
      action: actions.setBucketIndex,
      payload: { line: 6, payload: bucketNum },
    });
    // Pop the first elem from arr to the current bucket
    opArr.push({
      action: actions.pushToBucket,
      payload: { line: 7, payload: bucketNum },
    });
    // remove the elem from the arr
    opArr.push({
      action: actions.removeFromStart,
      payload: 8,
    });
    opArr.push({ action: actions.setLine, payload: 5 });
  }
  array = [] as SortItem[];
  opArr.push({
    action: actions.setBucketIndex,
    payload: { line: 10, payload: 0 },
  });

  for (let index = 0; index < buckets.length; index++) {
    opArr.push({
      action: actions.sortBucket,
      payload: { line: 11, payload: index },
    });
    opArr.push({
      action: actions.setBucketIndex,
      payload: { line: 10, payload: index + 1 },
    });
  }
  opArr.push({
    action: actions.setBucketIndex,
    payload: { line: 13, payload: 0 },
  });

  for (let index = 0; index < buckets.length; index++) {
    opArr.push({
      action: actions.markBucket,
      payload: { line: 14, payload: index },
    });
    opArr.push({
      action: actions.pushData,
      payload: { line: 14, payload: index },
    });
    opArr.push({
      action: actions.setBucketIndex,
      payload: { line: 13, payload: index + 1 },
    });
  }
  opArr.push({
    action: actions.setBucketIndex,
    payload: { line: -1, payload: -1 },
  });

  return opArr;
};
