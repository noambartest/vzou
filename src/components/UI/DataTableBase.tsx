import type { TableProps } from "react-data-table-component";
import DataTable from "react-data-table-component";


const selectProps = {
  indeterminate: (isIndeterminate: boolean) => isIndeterminate,
};

function DataTableBase<T>(props: TableProps<T>): JSX.Element {
  return (
    <DataTable
      highlightOnHover
      striped
      pagination
      selectableRows
      // selectableRowsComponentProps={selectProps}
      {...props}
    />
  );
}

export default DataTableBase;
