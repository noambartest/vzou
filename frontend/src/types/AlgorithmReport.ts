import { ChartItem } from "../components/Charts/interface";


export interface DataByAlgAndSubjectType {
  [subject: string]: { key: string; value: number }[];
}
export interface AlgorithmReport {
  dataBySubject: ChartItem[];
  dataByAlgAndSubject: DataByAlgAndSubjectType;
}
