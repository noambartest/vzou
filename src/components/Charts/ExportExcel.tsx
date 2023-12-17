import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import { Tooltip } from "@mui/material";
import * as FileSaver from "file-saver";
import React from "react";
import * as XLSX from "xlsx";

import { ExportData } from "../../types/GeneralReport";


type Props = {
  csvData: ExportData[];
  fileName: string;
};

const ExportExcel: React.FC<Props> = ({ csvData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (csvData: ExportData[], fileName: string) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    // const wb = { sheets: { data: ws }, sheetNames: [ "data" ] };
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "data");
    wb.SheetNames = [ "data" ];

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([ excelBuffer ], { type: fileType });

    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Tooltip
      title="Export Data"
      arrow
    >
      <button
        onClick={(e) => {
          exportToCSV(csvData, fileName);
        }}
        className=" inline-block px-2 py-2 bg-lime-500 text-white font-medium text-md leading-tight  rounded-full shadow-md hover:bg-lime-600 hover:shadow-lg transition duration-150 ease-in-out"
      >
        <DownloadForOfflineOutlinedIcon />
      </button>
    </Tooltip>
  );
};

export default ExportExcel;
