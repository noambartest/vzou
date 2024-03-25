import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { Item } from "../../components/Simulation/ControlsPanels/SqControlsPanel";


export interface State {
  data: Item[];
  top: number;
  line: number;
}

const initialState = {
  data: [] as Item[],
  line: -1,
};

const stackSlice = createSlice({
  name: "stack",
  initialState,
  reducers: {
    init(state, action: PayloadAction<Item[]>) {
      state.data = action.payload;
      state.line = -1;
    },
    incTop(state) {
      const item = { value: "", key: state.data.length }; // for push
      state.data = [ item, ...state.data ];
      state.line = 11;
    },
    setTopValue(state, action: PayloadAction<string>) {
      // for push
      state.data[0].value = action.payload;
      state.line = 12;
    },
    markTop(state) {
      state.data[0].color = "#ecfccb";
      state.line = 4;
    },
    setLine(state, action: PayloadAction<number>) {
      state.line = action.payload;
    },
    pop(state) {
      state.data.shift();
      state.line = 6;
    },
  },
});

export default stackSlice.reducer;
export const stackActions = stackSlice.actions;
