import { Colors, SortItem } from "./types";


export function getRandomNumsArr(size: number, limit = 100) {
  return [ ...Array(size) ].map(() => Math.floor(Math.random() * limit));
}

export function getArrFromInput(maxSize: number, data: string, max_num = 9999) {
  const list = data.split(",");
  if (list.includes("")) return "Input must be numbers that sperated by comma";
  if (list.length > maxSize) return `Max array size is ${maxSize}`;
  const newData: number[] = [];
  for (const item of list) {
    const num = Number(item);
    if (Number.isNaN(num)) return `${item} is not a number`;
    if (num > max_num) return `Max element can be ${max_num}, ${item} is bigger`;

    newData.push(num);
  }
  return newData;
}

export function compare(o1: SortItem, o2: SortItem): number {
  if (o1.value < o2.value) {
    return -1;
  }
  if (o1.value === o2.value) {
    return 0;
  }
  return 1;
}

export function numbersToSortItems(arr: number[]) {
  return arr.map((e, index) => numberToSortItem(e, index));
}

export function numberToSortItem(e: number, index: number) {
  return {
    key: index,
    value: e,
    color: Colors.BASE,
    isSelected: false,
    hide: false,
  };
}

export function SortItemsToNumbers(arr: SortItem[]) {
  return arr.map((e) => e.value);
}
