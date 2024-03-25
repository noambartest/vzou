import SortController from "./SortController";

import { mergeSortActions } from "../../store/reducers/sorts/mergeSortReducer";
import store, { AppDispatch } from "../../store/store";


export default class MergeSortController extends SortController {
  private static controller: null | SortController;

  private constructor(dispatch: AppDispatch) {
    super(dispatch, mergeSortActions, 2000);
    store.getState();
  }

  // singleton
  static getController(dispatch: AppDispatch) {
    if (!MergeSortController.controller)
      MergeSortController.controller = new MergeSortController(dispatch);
    return MergeSortController.controller;
  }

  getState() {
    return store.getState().mergeSort;
  }
}
