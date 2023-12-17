import { MergeNode } from "../../../../store/reducers/sorts/mergeSortReducer";
import { IndexArray } from "../helpers/IndexArray";
import SortArray from "../helpers/SortArray";


interface Props {
  tree: MergeNode[];
  left: number;
  right: number;
  speed: number;
}

// const tree = [
//   [1, 2, 3, 4, 5, 6, 7],
//   [1, 2, 3, 4],
//   [5, 6, 7],
//   [1, 2],
//   [3, 4],
//   [5, 6],
//   [7],
//   [1],
//   [2],
//   [3],
//   [4],
//   [5],
//   [6],
//   [],
//   [],
// ];

function MergeSortTree({ tree, left, right, speed }: Props) {
  return (
    <>
      {/* <div className={"mr-20"}> */}
      <IndexArray
        size={tree[1].data.length + 1}
        i={left}
        j={right}
        iName="left"
        jName="right"
      />
      {/* </div> */}
      <SortArray
        items={tree[1].data}
        speed={speed}
      />

      <div className="grid grid-cols-2 mt-8">
        <div>
          <SortArray
            items={tree[2].data}
            speed={speed}
          />
        </div>
        <div>
          <SortArray
            items={tree[3].data}
            speed={speed}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 mt-8">
        <div>
          <SortArray
            items={tree[4].data}
            speed={speed}
          />
        </div>
        <div>
          <SortArray
            items={tree[5].data}
            speed={speed}
          />
        </div>
        <div>
          <SortArray
            items={tree[6].data}
            speed={speed}
          />
        </div>
        <div>
          <SortArray
            items={tree[7].data}
            speed={speed}
          />
        </div>
      </div>
      <div className="grid grid-cols-8 mt-8">
        <div>
          <SortArray
            items={tree[8].data}
            speed={speed}
          />
        </div>
        <div>
          <SortArray
            items={tree[9].data}
            speed={speed}
          />
        </div>
        <div>
          <SortArray
            items={tree[10].data}
            speed={speed}
          />
        </div>
        <div>
          <SortArray
            items={tree[11].data}
            speed={speed}
          />
        </div>
        <div>
          <SortArray
            items={tree[12].data}
            speed={speed}
          />
        </div>
        <div>
          <SortArray
            items={tree[13].data}
            speed={speed}
          />
        </div>
        <div>
          <SortArray
            items={tree[14].data}
            speed={speed}
          />
        </div>
        <div>
          <SortArray
            items={tree[15].data}
            speed={speed}
          />
        </div>
      </div>
    </>
  );
}

export default MergeSortTree;
