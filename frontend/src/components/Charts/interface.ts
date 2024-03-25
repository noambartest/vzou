export interface ChartItem {
  key: string;
  value: number;
}

export interface ChartProps {
  items: ChartItem[];
  title: string;
  onClick?: (index: number) => void;
  id?: string;
}

export function GetLabels(items: ChartItem[]) {
  return items.map((item: ChartItem) => item.key);
}

export function GetData(items: ChartItem[]) {
  return items.map((item: ChartItem) => item.value);
}
