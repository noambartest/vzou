import SortController from "./SortController";

import { CountingSortActions } from "../../store/reducers/sorts/countingSortReducer";
import store, { AppDispatch } from "../../store/store";


export default class CountingSortController extends SortController {
  private static controller: null | SortController;

  private constructor(dispatch: AppDispatch) {
    super(dispatch, CountingSortActions);
    store.getState();
  }

  // singleton
  static getController(dispatch: AppDispatch) {
    if (!CountingSortController.controller)
      CountingSortController.controller = new CountingSortController(dispatch);
    return CountingSortController.controller;
  }

  getState() {
    return store.getState().countingSort;
  }
}
