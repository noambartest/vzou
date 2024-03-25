import { insertionSortActions as actions } from "../../../../store/reducers/sorts/insertionSortReducer";
import { compare } from "../helpers/functions";
import { InsertionSortOperation, SortItem } from "../helpers/types";


export function insertionSort(array: SortItem[]) {
  if (array.length <= 1 || array == null) {
    return [];
  }

  const opArr: InsertionSortOperation[] = [];

  let key: SortItem;
  let j;
  opArr.push({ action: actions.setI, payload: { indexList: [ 1 ], line: 1 } });
  for (let i = 1; i < array.length; i++) {
    key = array[i];
    opArr.push({
      action: actions.setKey,
      payload: { indexList: [ key.value ], line: 2 },
    });

    j = i - 1;
    opArr.push({
      action: actions.setJ,
      payload: { indexList: [ j ], line: 3 },
    });

    opArr.push({
      action: actions.setLine,
      payload: 4,
    });
    while (j >= 0 && compare(array[j], key) === 1) {
      array[j + 1] = array[j];
      opArr.push({
        action: actions.changeElement,
        payload: { indexList: [ j + 1, array[j].value ], line: 5 },
      });
      opArr.push({
        action: actions.unmark,
        payload: { indexList: [ j + 1 ], line: 5 },
      });

      j--;
      opArr.push({
        action: actions.setJ,
        payload: { indexList: [ j ], line: 6 },
      });
      opArr.push({
        action: actions.setLine,
        payload: 4,
      });
    }
    // opArr.push({
    //   action: ActionKind.UPDATE_LINE,
    //   payload: { index1: -1, line: 4 },
    // });

    array[j + 1] = key;
    opArr.push({
      action: actions.changeElement,
      payload: { indexList: [ j + 1, key.value ], line: 7 },
    });
    opArr.push({
      action: actions.unmark,
      payload: { indexList: [ j + 1 ], line: 7 },
    });

    // i++ of for loop
    opArr.push({
      action: actions.setI,
      payload: { indexList: [ i + 1 ], line: 1 },
    });
  }
  opArr.push({
    action: actions.initAnimation,
    payload: undefined,
  });
  return opArr;
}
