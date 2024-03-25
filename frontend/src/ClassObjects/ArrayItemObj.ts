import { ActionType, Events } from "../components/Simulation/BinaryTree/BinaryTreeTypes";

/** We used this class to represent an object in an array of items, specifically for use with Heaps
 * since the Heap page represents the heap in tree form and in array form.
 * This class attempts to keep up and match with the Heap tree representation, but in an array form.
 */
export class ArrayItemObj {
  value: number;

  id: number;

  action: ActionType; // used to determine which action to display

  swapIndex: number | null; // only used when making a swapping action with a different arrayitemobj

  speed: number;

  ghosted: boolean; // whether this item is visible or not

  constructor(value: number, id: number, speed: number, ghosted = false) {
    this.value = value;
    this.id = id;
    this.action = ActionType.NONE;
    this.speed = speed;
    this.swapIndex = null;
    this.ghosted = ghosted;
  }

  setAction(action: ActionType, swapIndex: number | null) {
    this.action = action;
    this.swapIndex = swapIndex;
  }

  /** Create the array representation of the heap using the current state of the heap tree representation.
   *
   */
  static generateArrayObjects(items: number[], speed: number, currentHeapSize?: number) {
    if (currentHeapSize === undefined) {
      // brand new array of items
      return items.map((value, index) => new ArrayItemObj(value, index, speed));
    }
    const arrayObjects = [];
    for (let i = 0; i < currentHeapSize; i++) {
      // copy the visible heap into array-form
      arrayObjects.push(new ArrayItemObj(items[i], i, speed));
    }
    for (let i = currentHeapSize; i < items.length; i++) {
      // add the 'invisible' parts of the array
      arrayObjects.push(new ArrayItemObj(items[i], i, speed, true));
    }
    return arrayObjects;
  }

  static setActions(arrayObjects: ArrayItemObj[], actions: Events | null) {
    if (actions) {
      try {
        for (const action of actions) {
          if (action.action === ActionType.SWAP) {
            if (typeof action.item2 !== "number") {
              throw new Error("item2 is required for swap action");
            }
            arrayObjects[action.item].setAction(ActionType.SWAP, arrayObjects[action.item2].id);
            arrayObjects[action.item2].setAction(ActionType.SWAP, arrayObjects[action.item].id);
          } else {
            arrayObjects[action.item].setAction(action.action, null);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
}
