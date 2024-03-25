import { AnimatePresence, motion } from "framer-motion";

import styles from "./QuickSort.module.css";

import styles2 from "../helpers/IndexArray.module.css";
import { SortItem } from "../helpers/types";


interface Props {
  items: SortItem[]; // data of stack
  children?: JSX.Element | JSX.Element[];
  speed: number;
}

function QuickSort(props: Props) {
  return (
    <div className={`basis-9/12 ${styles.example}`}>
      {/* Data of stack animation */}
      <motion.ul className={styles.s_ul}>
        <AnimatePresence mode="sync">
          {/* map each elment from the stack data to motion.il / */}
          {props.items.map((elem: SortItem) => (
            <motion.li
              className={styles.s_li}
              layout
              transition={{
                layout: { duration: 2 * props.speed, ease: "easeIn" },
              }}
              initial={{ scale: 0.8, x: 50, opacity: 0.5 }}
              animate={{
                backgroundColor: elem.color,
                y: elem.isSelected ? 40 : 0,
                scale: 1,
                x: 0,
                opacity: 1,
                transition: { duration: 0.5 * props.speed }, // todo fix animations on bgcolor
              }}
              exit={{
                // when the elment pops
                scale: 0.8,
                x: -100, // move to the rigth
                opacity: 0.2,
                transition: {
                  delay: 1,
                  duration: 1.5 * props.speed, // control the speed
                },
              }}
              key={elem.key}
            >
              {elem.value} {/* text inside the box */}
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      <ul
        className={styles2.s_ul}
        style={{ marginLeft: "35px" }}
      >
        {[ ...Array(props.items.length) ].map((elem: number, index) => (
          <li
            className={styles2.s_li}
            key={index}
            style={{ fontSize: 14, color: "gray" }}
          >
            {index} {/* text inside the box */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuickSort;
