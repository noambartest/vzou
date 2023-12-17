import { BucketSortPayload } from "../../../../store/reducers/sorts/bucketSortReducer";
import { CountingSortPayload } from "../../../../store/reducers/sorts/countingSortReducer";
import { InsertionSortPayload } from "../../../../store/reducers/sorts/insertionSortReducer";
import { MergeSortPayload } from "../../../../store/reducers/sorts/mergeSortReducer";
import { QuickSortPayload } from "../../../../store/reducers/sorts/quickSortReducer";


export interface SortItem {
  value: number;
  key: number;
  isSelected: boolean;
  color: string;
  hide: boolean;
  digit?: number;
}

export type SortOperations =
  | QuickSortOperation[]
  | CountingSortOperation[]
  | InsertionSortOperation[]
  | MergeSortOperation[]
  | BucketSortOperation[]
  | RadixSortOperation[];

export interface QuickSortOperation {
  action: any;
  payload: QuickSortPayload;
}

export interface InsertionSortOperation {
  action: any;
  payload: InsertionSortPayload;
}

export interface CountingSortOperation {
  action: any;
  payload: CountingSortPayload;
}

export interface MergeSortOperation {
  action: any;
  payload: MergeSortPayload;
}

export interface BucketSortOperation {
  action: any;
  payload: BucketSortPayload;
}

export interface RadixSortOperation {
  action: any;
  payload: any;
}

export enum Colors {
  BASE = "#84cc16",
  MARKED = "#ecfccb",
}
