import SortController from "./SortController";

import { bucketSortActions } from "../../store/reducers/sorts/bucketSortReducer";
import store, { AppDispatch } from "../../store/store";


export default class BucketSortController extends SortController {
  private static controller: null | SortController;

  private constructor(dispatch: AppDispatch) {
    super(dispatch, bucketSortActions, 2000);
    store.getState();
  }

  // singleton
  static getController(dispatch: AppDispatch) {
    if (!BucketSortController.controller)
      BucketSortController.controller = new BucketSortController(dispatch);
    return BucketSortController.controller;
  }

  getState() {
    return store.getState().bucketSort;
  }
}
