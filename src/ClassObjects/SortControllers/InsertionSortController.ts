import SortController from "./SortController";

import { insertionSortActions } from "../../store/reducers/sorts/insertionSortReducer";
import store, { AppDispatch } from "../../store/store";


export default class InsertionSortController extends SortController {
  private static controller: null | SortController;

  private constructor(dispatch: AppDispatch) {
    super(dispatch, insertionSortActions, 2000);
    store.getState();
  }

  // singleton
  static getController(dispatch: AppDispatch) {
    if (!InsertionSortController.controller)
      InsertionSortController.controller = new InsertionSortController(dispatch);
    return InsertionSortController.controller;
  }

  getState() {
    return store.getState().insertionSort;
  }
}
