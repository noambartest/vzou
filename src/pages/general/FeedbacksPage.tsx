import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { TableColumn } from "react-data-table-component";

import DataTableBase from "../../components/UI/DataTableBase";
import FloatUpContainer from "../../components/UI/FloatUpContainer";
import MediumCard from "../../components/UI/MediumCard";
import Spinner from "../../components/UI/Spinner";
import {
  useDeleteFeedbacksMutation,
  useGetAllFeedbackQuery,
} from "../../store/reducers/feedback-reducer";
import { Feedback } from "../../types/FeedBack";


const columns: TableColumn<Feedback>[] = [
  {
    name: "Subject",
    selector: (row) => row.subject,
  },
  {
    name: "Date",
    selector: (row) => row.createdAt.slice(0, 10),
    sortable: true,
  },
  {
    name: "Contact Info",
    selector: (row) => row.contactInfo || "-",
    sortable: true,
  },
];

function FeedbacksPage(): JSX.Element {
  const [ selectedData, setSelectedData ] = useState<number[]>([]);
  const [ isSelected, setIsSelected ] = useState(false);
  const [ toggledClearRows, setToggleClearRows ] = useState(false);
  const { data, refetch, isLoading: dataLoading, isError: dataError } = useGetAllFeedbackQuery("");
  const [ deleteFeedback, { isLoading, isError, isSuccess }] = useDeleteFeedbacksMutation();
  const handleChange = ({ selectedRows }: any) => {
    selectedRows.length ? setIsSelected(true) : setIsSelected(false);
    const newData = selectedRows.map((elem: any) => elem.id);
    setSelectedData([ ...newData ]);
  };

  const handleDelete = async () => {
    setToggleClearRows(!toggledClearRows);
    setIsSelected(false);
    await deleteFeedback({ idList: selectedData });
    await refetch();
  };
  function ExpandedComponent({ data }: any) {
    return <p>{data.message}</p>;
  }
  return (
    <FloatUpContainer>
      <MediumCard>
        <Spinner isLoading={isLoading || dataLoading} />
        {data && (
          <DataTableBase<Feedback>
            onSelectedRowsChange={handleChange}
            clearSelectedRows={toggledClearRows}
            title="Users feedbacks"
            columns={columns}
            expandableRows
            data={data.allData}
            expandableRowsComponent={ExpandedComponent}
            expandOnRowClicked
          />
        )}
        <AnimatePresence>
          {isSelected && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={handleDelete}
              type="button"
              className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-400 hover:border-transparent rounded"
            >
              Delete
            </motion.button>
          )}
        </AnimatePresence>
      </MediumCard>
    </FloatUpContainer>
  );
}

export default FeedbacksPage;
