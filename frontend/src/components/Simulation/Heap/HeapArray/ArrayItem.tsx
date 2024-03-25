import "./HeapArray.css";

import { motion } from "framer-motion";

import { ArrayItemObj } from "../../../../ClassObjects/ArrayItemObj";
import { getHeapArrayAnimationsAndStyles } from "../../BinaryTree/Helpers/Functions";


interface Props {
  arrayItemObj: ArrayItemObj;
}

/** Visualization of the arrayItemObj array representation of a heap.
 *
 * @see ArrayItemObj
 */
function ArrayItem(props: Props) {
  const { value, id, speed, action, swapIndex, ghosted } = props.arrayItemObj;
  const { style, initial, animate } = getHeapArrayAnimationsAndStyles(action, id, swapIndex);
  let animateObj;
  if (ghosted) {
    animateObj = {
      ...(animate as any),
      backgroundColor: "#808080FF",
    };
  } else {
    animateObj = animate;
  }

  return (
    <motion.span
      className="s_li"
      layout
      transition={{
        layout: { duration: 0.4 * speed, ease: "easeIn" },
        duration: 0.4 * speed,
      }}
      initial={initial}
      animate={animateObj}
      style={style}
      exit={{ opacity: 0 }}
      key={`${id}-${value}`}
    >
      {value === -Infinity ? "−∞" : value}
    </motion.span>
  );
}

export default ArrayItem;
