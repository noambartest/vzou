import { ChartItem } from "../components/Charts/interface";


export interface GeneralReport {
  accountsData: ChartItem[];
  usersData: UsersData;
}

export interface UsersData {
  usersGroupedByGender: ChartItem[];
  usersGroupedByAge: ChartItem[];
}

export interface ExportData {
  title: string;
  amount: string;
}
