import { radixSortActions as actions } from "../../../../store/reducers/sorts/radixSortReducer";
import { RadixSortOperation, SortItem } from "../helpers/types";


export function radixSort(array: SortItem[]) {
  if (array.length <= 1 || array == null) {
    return [];
  }

  const numOfDigits = 3;
  const opArr: RadixSortOperation[] = [];
  opArr.push({
    action: actions.setLine,
    payload: 0,
  });

  for (let i = 0; i < numOfDigits; i++) {
    opArr.push({
      action: actions.setCurrentDigit,
      payload: i,
    });
    opArr.push({
      action: actions.setSortData,
      payload: i,
    });
    opArr.push({
      action: actions.sort,
      payload: undefined,
    });
    opArr.push({
      action: actions.setSortData,
      payload: -1,
    });
  }
  opArr.push({
    action: actions.setLine,
    payload: -1,
  });

  return opArr;
}
