import SortController from "./SortController";

import { radixSortActions } from "../../store/reducers/sorts/radixSortReducer";
import store, { AppDispatch } from "../../store/store";


export default class RadixSortController extends SortController {
  private static controller: null | SortController;

  private constructor(dispatch: AppDispatch) {
    super(dispatch, radixSortActions, 3000);
    store.getState();
  }

  // singleton
  static getController(dispatch: AppDispatch) {
    if (!RadixSortController.controller)
      RadixSortController.controller = new RadixSortController(dispatch);
    return RadixSortController.controller;
  }

  getState() {
    return store.getState().radixSort;
  }
}
