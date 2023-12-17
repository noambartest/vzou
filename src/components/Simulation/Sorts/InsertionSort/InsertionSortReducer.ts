import { SortItem } from "../helpers/types";


export enum ItemColor {
  BASE = "#84cc16",
  MARKED = "#ecfccb",
}

// An enum with all the types of actions to use in our reducer
export enum InsertionSortActionKind {
  SET_DATA = "SET_DATA",
  UNMARK = "UNMARK",
  CHANGE_ELEMENT = "CHANGE_ELEMENT",
  SET_KEY = "SET_KEY",
  UPDATE_LINE = "UPDATE_LINE",
  UPDATE_I = "UPDATE_I",
  UPDATE_J = "UPDATE_J",
  DONE = "DONE",
}

interface DataPayload {
  data: number[];
}

export interface AnimationPayload {
  index1: number;
  index2?: number;
  line: number;
}

type Payload = DataPayload | AnimationPayload;

// An interface for our actions
interface Action {
  type: InsertionSortActionKind;
  payload: Payload;
}

// An interface for our state
export interface State {
  data: SortItem[];
  i: number;
  j: number;
  line: number;
  keyValue?: number;
}

// Our reducer function that uses a switch statement to handle our actions
export function insertionSortReducer(state: State, action: Action) {
  const { type } = action;
  switch (type) {
    case InsertionSortActionKind.SET_DATA: {
      const payload = action.payload as DataPayload;
      const newData = payload.data.map((e, index) => ({
        key: index,
        value: e,
        color: ItemColor.BASE,
        isSelected: false,
      }));
      return {
        i: -2,
        j: -2,
        line: -1,
        data: newData,
      };
    }
    case InsertionSortActionKind.UPDATE_I: {
      const payload = action.payload as AnimationPayload;
      const newData = [ ...state.data ];
      return {
        data: newData,
        j: state.j,
        i: payload.index1,
        line: payload.line,
      };
    }
    case InsertionSortActionKind.UPDATE_J: {
      const payload = action.payload as AnimationPayload;
      const newData = [ ...state.data ];
      return {
        ...state,
        data: newData,
        j: payload.index1,
        line: payload.line,
      };
    }
    case InsertionSortActionKind.UNMARK: {
      const payload = action.payload as AnimationPayload;
      const newData = [ ...state.data ];
      newData[payload.index1].color = ItemColor.BASE;

      return {
        ...state,
        data: newData,
        line: payload.line,
      };
    }
    case InsertionSortActionKind.UPDATE_LINE: {
      const newData = [ ...state.data ];
      const payload = action.payload as AnimationPayload;
      return {
        ...state,
        line: payload.line,
        data: newData,
      };
    }
    case InsertionSortActionKind.CHANGE_ELEMENT: {
      const payload = action.payload as AnimationPayload;
      const newData = [ ...state.data ];
      newData[payload.index1].value = payload.index2!;
      newData[payload.index1].color = ItemColor.MARKED;

      return {
        ...state,
        data: newData,
        line: payload.line,
      };
    }
    case InsertionSortActionKind.SET_KEY: {
      const payload = action.payload as AnimationPayload;
      const newData = [ ...state.data ];
      return {
        ...state,
        data: newData,
        line: payload.line,
        keyValue: payload.index1,
      };
    }
    case InsertionSortActionKind.DONE: {
      const payload = action.payload as AnimationPayload;
      const newData = [ ...state.data ];
      return {
        data: newData,
        i: payload.index1,
        j: payload.index2!,
        line: payload.line,
        keyValue: undefined,
      };
    }
    default:
      return state;
  }
}
