import { mergeSortActions as actions } from "../../../../store/reducers/sorts/mergeSortReducer";
import { ItemColor } from "../../../../store/reducers/sorts/quickSortReducer";
import { SortItemsToNumbers } from "../helpers/functions";
import { MergeSortOperation, SortItem } from "../helpers/types";


export function mergeSort(array: SortItem[]): MergeSortOperation[] {
  if (array.length <= 1 || array == null) {
    return [];
  }
  const opArr: MergeSortOperation[] = [];
  const numbers = SortItemsToNumbers(array);
  recursiveMergeSort(numbers, 0, array.length - 1, opArr, 1);
  return opArr;
}

function recursiveMergeSort(
  array: number[],
  left: number,
  right: number,
  opArr: MergeSortOperation[],
  index: number,
) {
  opArr.push({
    action: actions.setIndexes,
    payload: { line: 0, left, right },
  });

  if (index !== 1) {
    {
      opArr.push({
        action: actions.addNode,
        payload: {
          data: array.slice(left, right + 1),
          nodeIndex: index,
          line: 0,
        },
      });
    }

    opArr.push({
      action: actions.setLine,
      payload: 1,
    });
    if (left < right) {
      opArr.push({
        action: actions.setLine,
        payload: 2,
      });
      const mid = Math.floor((left + right) / 2);
      // add left and right nodes to the tree
      const L = array.slice(left, mid + 1);
      const R = array.slice(mid + 1, right + 1);
      const rightIndex = index * 2 + 1;
      const leftIndex = index * 2;

      // opArr.push({
      //   action: actions.addNode,
      //   payload: {
      //     data: L,
      //     nodeIndex: leftIndex,
      //     line: 3,
      //   },
      // });
      opArr.push({
        action: actions.setLine,
        payload: 3,
      });
      recursiveMergeSort(array, left, mid, opArr, leftIndex);

      // opArr.push({
      //   action: actions.addNode,
      //   payload: {
      //     data: R,
      //     nodeIndex: rightIndex,
      //     line: 4,
      //   },
      // });
      opArr.push({
        action: actions.setLine,
        payload: 4,
      });
      recursiveMergeSort(array, mid + 1, right, opArr, rightIndex);
      opArr.push({
        action: actions.setLine,
        payload: 5,
      });
      merge(array, left, right, mid, opArr, leftIndex, rightIndex, index);
    }
  }

  function merge(
    array: number[],
    left: number,
    right: number,
    mid: number,
    opArr: MergeSortOperation[],
    leftNodeIndex: number,
    rightNodeIndex: number,
    parent: number,
  ) {
    opArr.push({
      action: actions.setIndexes,
      payload: { line: 8, left, right },
    });

    const L = array.slice(left, mid + 1);
    opArr.push({
      action: actions.markNode,
      payload: {
        line: 9,
        nodeIndex: leftNodeIndex,
      },
    });
    const R = array.slice(mid + 1, right + 1);
    opArr.push({
      action: actions.markNode,
      payload: {
        line: 10,
        nodeIndex: rightNodeIndex,
      },
    });

    opArr.push({
      action: actions.initNodeData,
      payload: { nodeIndex: parent, line: 11 },
    });

    let i = 0;
    let j = 0;
    let k = 0;

    while (i < L.length && j < R.length) {
      opArr.push({
        action: actions.markElementInNode,
        payload: {
          line: 12,
          nodesList: [ leftNodeIndex, rightNodeIndex ],
          elements: [ i, j ],
          color: ItemColor.PIVOT,
        },
      });
      if (L[i] <= R[j]) {
        array[left + k] = L[i];
        opArr.push({
          action: actions.changeValue,
          payload: {
            index: k,
            nodeIndex: parent,
            line: 14,
            value: L[i],
          },
        });
        opArr.push({
          action: actions.markElementInNode,
          payload: {
            line: 15,
            nodesList: [ leftNodeIndex ],
            elements: [ i ],
            color: ItemColor.DONE,
          },
        });
        i++;
      } else {
        opArr.push({
          action: actions.setLine,
          payload: 16,
        });
        array[left + k] = R[j];
        opArr.push({
          action: actions.changeValue,
          payload: {
            index: k,
            nodeIndex: parent,
            line: 17,
            value: R[j],
          },
        });
        opArr.push({
          action: actions.markElementInNode,
          payload: {
            line: 18,
            nodesList: [ rightNodeIndex ],
            elements: [ j ],
            color: ItemColor.DONE,
          },
        });
        j++;
      }
      opArr.push({
        action: actions.setLine,
        payload: 19,
      });
      k++;
    }
    opArr.push({
      action: actions.setLine,
      payload: 12,
    });

    while (i < L.length) {
      opArr.push({
        action: actions.markElementInNode,
        payload: {
          line: 20,
          nodesList: [ leftNodeIndex ],
          elements: [ i ],
          color: ItemColor.PIVOT,
        },
      });
      array[left + k] = L[i];
      opArr.push({
        action: actions.changeValue,
        payload: {
          index: k,
          nodeIndex: parent,
          line: 21,
          value: L[i],
        },
      });
      opArr.push({
        action: actions.markElementInNode,
        payload: {
          line: 22,
          nodesList: [ leftNodeIndex ],
          elements: [ i ],
          color: ItemColor.DONE,
        },
      });
      i++;
      opArr.push({
        action: actions.setLine,
        payload: 23,
      });
      k++;
    }
    opArr.push({
      action: actions.setLine,
      payload: 20,
    });

    while (j < R.length) {
      opArr.push({
        action: actions.markElementInNode,
        payload: {
          line: 24,
          nodesList: [ rightNodeIndex ],
          elements: [ j ],
          color: ItemColor.PIVOT,
        },
      });
      array[left + k] = R[j];
      opArr.push({
        action: actions.changeValue,
        payload: {
          index: k,
          nodeIndex: parent,
          line: 25,
          value: R[j],
        },
      });
      opArr.push({
        action: actions.markElementInNode,
        payload: {
          line: 26,
          nodesList: [ rightNodeIndex ],
          elements: [ j ],
          color: ItemColor.DONE,
        },
      });
      j++;
      k++;
    }
    opArr.push({
      action: actions.setLine,
      payload: 24,
    });
    opArr.push({
      action: actions.deleteNodes,
      payload: { nodesList: [ rightNodeIndex, leftNodeIndex ], line: -1 },
    });
  }
}
