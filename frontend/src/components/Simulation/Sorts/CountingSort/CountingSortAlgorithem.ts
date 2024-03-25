import {
  init,
  setColor,
  setIndex,
  setLine,
  setValue,
} from "../../../../store/reducers/sorts/countingSortReducer";
import { Colors, CountingSortOperation, SortItem } from "../helpers/types";


export function CountingSort(arr: SortItem[], k: number) {
  const opArr: CountingSortOperation[] = [];

  const A = arr.map((e) => e.value);

  const B = Array(arr.length).fill(0);
  opArr.push({
    action: init,
    payload: { data: [ ...B ], arrName: "B", line: 0 },
  });

  const C = Array(k + 1).fill(0);
  opArr.push({
    action: init,
    payload: { data: [ ...C ], arrName: "C", line: 1 },
  });

  let index;
  let i;
  let value;
  for (i = 0; i < A.length; i++) {
    opArr.push({
      action: setIndex,
      payload: { index: i, arrName: "A", line: 2 },
    });

    index = A[i];
    opArr.push({
      action: setColor,
      payload: {
        items: [{ index: i, arrName: "A" }],
        val: Colors.MARKED,
        line: 3,
      },
    });

    C[index] = C[index] + 1;
    opArr.push({
      action: setColor,
      payload: {
        items: [{ index, arrName: "C" }],
        val: Colors.MARKED,
        line: 4,
      },
    });

    opArr.push({
      action: setValue,
      payload: { index, arrName: "C", value: C[index] },
    });
    opArr.push({
      action: setColor,
      payload: {
        items: [
          { index, arrName: "C" },
          { index: i, arrName: "A" },
        ],
        val: Colors.BASE,
        line: 4,
      },
    });
  }
  opArr.push({
    action: setIndex,
    payload: { index: i, arrName: "A", line: 2 },
  });

  for (i = 1; i <= k; i++) {
    opArr.push({
      action: setIndex,
      payload: { index: i, arrName: "C", line: 6 },
    });

    opArr.push({
      action: setColor,
      payload: {
        items: [
          { index: i, arrName: "C" },
          { index: i - 1, arrName: "C" },
        ],
        val: Colors.MARKED,
        line: 7,
      },
    });

    C[i] = C[i] + C[i - 1];
    opArr.push({
      action: setValue,
      payload: { index: i, arrName: "C", value: C[i] },
    });

    opArr.push({
      action: setColor,
      payload: {
        items: [
          { index: i, arrName: "C" },
          { index: i - 1, arrName: "C" },
        ],
        val: Colors.BASE,
        line: 7,
      },
    });
  }
  opArr.push({
    action: setIndex,
    payload: { index: i, arrName: "C", line: 6 },
  });

  for (i = A.length - 1; i >= 0; i--) {
    opArr.push({
      action: setIndex,
      payload: { index: i, arrName: "A", line: 9 },
    });

    opArr.push({
      action: setColor,
      payload: {
        items: [{ index: i, arrName: "A" }],
        val: Colors.MARKED,
        line: 10,
      },
    });

    value = A[i];

    opArr.push({
      action: setColor,
      payload: {
        items: [{ index: value, arrName: "C" }],
        val: Colors.MARKED,
        line: 11,
      },
    });
    C[value]--;
    opArr.push({
      action: setValue,
      payload: { index: value, arrName: "C", value: C[value] },
    });

    opArr.push({
      action: setLine,
      payload: 12,
    });
    index = C[value];

    opArr.push({
      action: setColor,
      payload: {
        items: [{ index, arrName: "B" }],
        val: Colors.MARKED,
        line: 13,
      },
    });
    B[index] = value;
    opArr.push({ action: setValue, payload: { index, arrName: "B", value } });

    opArr.push({
      action: setColor,
      payload: {
        items: [
          { index: i, arrName: "A" },
          { index, arrName: "B" },
          { index: value, arrName: "C" },
        ],
        val: Colors.BASE,
        line: 13,
      },
    });
  }
  opArr.push({
    action: setIndex,
    payload: { index: i, arrName: "A", line: 9 },
  });

  opArr.push({
    action: setLine,
    payload: -1,
  });
  return opArr;
}
