import { SortOperations } from "../../components/Simulation/Sorts/helpers/types";
import { animationControlActions } from "../../store/reducers/animation-control-reducer";
import { State as bucketSortState } from "../../store/reducers/sorts/bucketSortReducer";
import { State as countingSortState } from "../../store/reducers/sorts/countingSortReducer";
import { State as insertionSortState } from "../../store/reducers/sorts/insertionSortReducer";
import { State as mergeSortState } from "../../store/reducers/sorts/mergeSortReducer";
import { State as quickSortState } from "../../store/reducers/sorts/quickSortReducer";
import { State as radixSortState } from "../../store/reducers/sorts/radixSortReducer";
import { AppDispatch } from "../../store/store";
import { sleep } from "../../utils/animation-helpers";


type MementoTypes =
  | countingSortState
  | quickSortState
  | insertionSortState
  | mergeSortState
  | bucketSortState
  | radixSortState;

export default abstract class SortController {
  memento: MementoTypes[];

  baseSleepTime: number;

  speed: number;

  frame: number;

  stopFlag: boolean;

  operationArr: SortOperations;

  reducerActions: any;

  dispatch: AppDispatch;

  abstract getState(): MementoTypes;

  constructor(dispatch: AppDispatch, reducerActions: any, sleepTime = 1000) {
    this.memento = [] as MementoTypes[];
    this.baseSleepTime = sleepTime;
    this.speed = 1;
    this.frame = 0;
    this.stopFlag = false;
    this.operationArr = [] as SortOperations;
    this.reducerActions = reducerActions;
    this.dispatch = dispatch;
  }

  init() {
    this.stopFlag = true;
    this.dispatch(animationControlActions.setIsSortStarted(false));
    this.memento = [] as MementoTypes[];
    this.frame = 0;
  }

  // Setters
  setSpeed(speed: number) {
    this.speed = 1 / speed;
  }

  setFrame(frame: number) {
    this.frame = frame;
  }

  setStopFlag(val: boolean) {
    this.stopFlag = val;
    this.dispatch(animationControlActions.setIsPlaying(!val));
  }

  pushState(state: MementoTypes) {
    this.memento.push(state);
  }

  dispatchCurrentFrame() {
    const op = this.operationArr[this.frame];
    this.dispatch(op.action(op.payload));
    if (this.frame >= this.memento.length - 1) this.pushState(this.getState());
    this.frame++;
  }

  async setState() {
    this.dispatch(this.reducerActions.setState(this.memento[this.frame]));
  }

  // Animation Funcs
  async sort(opArr: SortOperations) {
    this.dispatch(animationControlActions.setIsSortStarted(true));
    this.frame = 0;
    this.operationArr = opArr;
    this.stopFlag = false;
    this.memento = [ this.getState() ];
    this.play();
  }

  async play() {
    this.setStopFlag(false);
    for (let i = this.frame; i < this.operationArr.length; i++) {
      if (this.stopFlag) {
        break;
      }
      this.dispatchCurrentFrame();
      await sleep(this.baseSleepTime * this.speed);
    }
    this.setStopFlag(true);
  }

  async playPreviousFrame() {
    if (!this.frame) return;
    this.setStopFlag(true);
    this.frame -= 1;
    await this.setState();
  }

  async playFirstFrame() {
    if (!this.frame) return;
    this.frame = 1;
    this.playPreviousFrame();
  }

  async playNextFrame() {
    if (this.frame === this.operationArr.length) return;
    this.setStopFlag(true);
    this.dispatchCurrentFrame();
  }

  async playLastFrame() {
    while (this.frame < this.operationArr.length) {
      this.playNextFrame();
    }
  }
}
