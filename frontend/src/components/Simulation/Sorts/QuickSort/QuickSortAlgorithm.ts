import { quickSortActions as ActionKind } from "../../../../store/reducers/sorts/quickSortReducer";
import { compare } from "../helpers/functions";
import { QuickSortOperation, SortItem } from "../helpers/types";


export function quickSort(array: SortItem[]): QuickSortOperation[] {
  if (array.length <= 1 || array == null) {
    return [];
  }
  const opArr: QuickSortOperation[] = [];
  opArr.push({
    action: ActionKind.setPandR,
    payload: { indexList: [ 0, array.length - 1 ], line: 0 },
  });
  sort(array, 0, array.length - 1, opArr);
  return opArr;
}

function sort(array: SortItem[], low: number, high: number, opArr: QuickSortOperation[]) {
  opArr.push({
    action: ActionKind.setPandR,
    payload: { indexList: [ low, high ], line: 1 },
  });
  if (low < high) {
    opArr.push({
      action: ActionKind.markPivot,
      payload: { indexList: [ high ], line: 2 },
    }); // MARK PIVOT
    const partIndex = partition(array, low, high, opArr);
    opArr.push({ action: ActionKind.setLine, payload: 3 }); // Left rec
    sort(array, low, partIndex - 1, opArr);
    opArr.push({ action: ActionKind.setLine, payload: 4 }); // Right rec
    sort(array, partIndex + 1, high, opArr);
  } else if (low === high) {
    opArr.push({
      action: ActionKind.done,
      payload: { indexList: [ low ], line: 15 },
    }); // DONE
  }
  opArr.push({ action: ActionKind.setLine, payload: -1 });
}

function partition(
  array: SortItem[],
  low: number,
  high: number,
  opArr: QuickSortOperation[],
): number {
  opArr.push({ action: ActionKind.setLine, payload: 7 });

  const pivot: SortItem = array[high];
  let pivotIndex: number = high;
  let i: number = low - 1;
  opArr.push({ action: ActionKind.setI, payload: { indexList: [ i ], line: 8 } });

  let j;
  for (j = low; j <= high - 1; j++) {
    opArr.push({
      action: ActionKind.setJ,
      payload: { indexList: [ j ], line: 9 },
    });
    opArr.push({
      action: ActionKind.mark,
      payload: { indexList: [ high, j ], line: 10 },
    }); // CMP J Piv
    if (compare(array[j], pivot) === -1) {
      i += 1;
      opArr.push({
        action: ActionKind.setI,
        payload: { indexList: [ i ], line: 11 },
      });
      opArr.push({
        action: ActionKind.mark,
        payload: { indexList: [ i ], line: 11 },
      }); // MARK I  -- CHANGE LATER
      swap(array, i, j);
      opArr.push({
        action: ActionKind.swap,
        payload: { indexList: [ i, j ], line: 12 },
      }); // SWAP I J
      opArr.push({
        action: ActionKind.unmark,
        payload: { indexList: [ i, j ], line: 12 },
      }); // UNMARK
    } else {
      opArr.push({
        action: ActionKind.unmark,
        payload: { indexList: [ j ], line: 10 },
      }); // UNMARK
    }
  }
  opArr.push({ action: ActionKind.setJ, payload: { indexList: [ j ], line: 9 } });

  opArr.push({
    action: ActionKind.mark,
    payload: { indexList: [ high, i + 1 ], line: 13 },
  }); // CMP i+1 Piv
  if (compare(array[high], array[i + 1]) === -1) {
    opArr.push({
      action: ActionKind.swap,
      payload: { indexList: [ high, i + 1 ], line: 13 },
    }); // SWAP I+1 Piv
    swap(array, i + 1, high);
    pivotIndex = i + 1;
  }
  opArr.push({
    action: ActionKind.unmark,
    payload: { indexList: [ high, i + 1 ], line: 13 },
  }); // UNMARK i+1 Piv
  opArr.push({
    action: ActionKind.done,
    payload: { indexList: [ pivotIndex ], line: 14 },
  }); // DONE PIV
  return i + 1;
}

function swap(array: SortItem[], i: number, j: number) {
  const newJ: SortItem = array[i];
  array[i] = array[j];
  array[j] = newJ;
}
