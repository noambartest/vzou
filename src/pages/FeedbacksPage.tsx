import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { TableColumn } from "react-data-table-component";

import DataTableBase from "../components/UI/DataTableBase";
import FloatUpContainer from "../components/UI/FloatUpContainer";
import MediumCard from "../components/UI/MediumCard";


interface DataRow {
  subject: string;
  date: string;
  id: number;
}

const columns: TableColumn<DataRow>[] = [
  {
    name: "Subject",
    selector: (row) => row.subject,
  },
  {
    name: "Date",
    selector: (row) => row.date,
    sortable: true,
  },
  //   {
  //     name: "Action",
  //     button: true,
  //     cell: (row) => (

  //     ),
  //   },
];

const DATA = [
  {
    id: 1,
    subject: "perspiciatis",
    content:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos q",
    date: "1988",
  },
  {
    id: 2,
    subject: "explain",
    content:
      "ut I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, di",
    date: "1984",
  },
  {
    id: 3,
    subject: "onsequences",
    content:
      "onsequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, whic",
    date: "1984",
  },
];

function FeedbacksPage(): JSX.Element {
  const [ data, setData ] = useState(DATA);
  const [ selectedData, setSelectedData ] = useState<number[]>([]);
  const [ isSelected, setIsSelected ] = useState(false);
  const [ toggledClearRows, setToggleClearRows ] = useState(false);

  const handleChange = ({ selectedRows }: any) => {
    selectedRows.length ? setIsSelected(true) : setIsSelected(false);
    const newData = selectedRows.map((elem: any) => elem.id);
    setSelectedData([ ...newData ]);
  };

  const handleDelete = () => {
    const nd = data.filter((elem: any) => !selectedData.includes(elem.id));
    setData([ ...nd ]);
    setToggleClearRows(!toggledClearRows);
    setIsSelected(false);
  };

  function ExpandedComponent({ data }: any) {
    return <p>{data.content}</p>;
  }

  return (
    <FloatUpContainer>
      <MediumCard>
        <DataTableBase
          onSelectedRowsChange={handleChange}
          clearSelectedRows={toggledClearRows}
          title="Users feedbacks"
          columns={columns}
          expandableRows
          data={data}
          expandableRowsComponent={ExpandedComponent}
          expandOnRowClicked
        />
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
