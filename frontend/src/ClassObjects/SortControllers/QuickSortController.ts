import SortController from "./SortController";

import { quickSortActions } from "../../store/reducers/sorts/quickSortReducer";
import store, { AppDispatch } from "../../store/store";


export default class QuickSortController extends SortController {
  private static controller: null | SortController;

  private constructor(dispatch: AppDispatch) {
    super(dispatch, quickSortActions, 2000);
    store.getState();
  }

  // singleton
  static getController(dispatch: AppDispatch) {
    if (!QuickSortController.controller)
      QuickSortController.controller = new QuickSortController(dispatch);
    return QuickSortController.controller;
  }

  getState() {
    return store.getState().quickSort;
  }
}
