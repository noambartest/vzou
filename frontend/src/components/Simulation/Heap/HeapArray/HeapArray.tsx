import "./HeapArray.css";

import { AnimatePresence } from "framer-motion";

import ArrayItem from "./ArrayItem";

import { ArrayItemObj } from "../../../../ClassObjects/ArrayItemObj";
import { Events } from "../../BinaryTree/BinaryTreeTypes";


interface Props {
  items: number[];
  actions: Events;
  speed: number;
  currentHeapSize?: number;
}
function HeapArray(props: Props) {
  const { items, actions, speed, currentHeapSize } = props;
  const arr = ArrayItemObj.generateArrayObjects(items, speed, currentHeapSize);
  ArrayItemObj.setActions(arr, actions);
  return (
    <div className="basis-9/12 mr-56">
      <AnimatePresence>
        <span className="s_ul">
          {arr.map((item) => (
            <ArrayItem
              arrayItemObj={item}
              key={`${item.id}-${item.value}`}
            />
          ))}
        </span>
      </AnimatePresence>
    </div>
  );
}

export default HeapArray;
