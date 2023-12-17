import { ChartProps } from "../components/Charts/interface";


export const makeTable = (tableData: ChartProps) =>
  tableData.items
    .map((item) => ({ title: item.key, amount: item.value.toString() }))
    .concat([{ title: " ", amount: " " }]);

export function isErrorWithDataAndMessage(error: unknown): error is { data: { message: string } } {
  return (
    typeof error === "object" &&
    error != null &&
    "data" in error &&
    typeof (error as any).data === "object" &&
    typeof (error as any).data.message === "string"
  );
}
