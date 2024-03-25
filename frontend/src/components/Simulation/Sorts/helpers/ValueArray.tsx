import { AnimatePresence, motion } from "framer-motion";

import { SortItem } from "./types";
import styles from "./ValueArray.module.css";


interface Props {
  data: SortItem[];
  speed: number;
}

export function ValueArray(props: Props) {
  return (
    <div className={`basis-9/12 ${styles.example}`}>
      {/* Data of stack animation */}
      <motion.ul className={styles.s_ul}>
        <AnimatePresence mode="sync">
          {/* map each elment from the stack data to motion.il / */}
          {props.data &&
            props.data.map((elem: SortItem, index) => (
              <motion.li
                className={styles.s_li}
                layout
                transition={{
                  layout: { duration: 2 * props.speed, ease: "easeIn" },
                }}
                initial={{
                  y: 30,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: { delay: 1, duration: 0.5 * props.speed }, // todo fix animations on bgcolor
                }}
                exit={{
                  y: 30,
                  opacity: 0,
                  transition: {
                    duration: 1 * props.speed, // control the speed
                  },
                }}
                key={elem.key}
              >
                {`< ${elem.value} >`}
              </motion.li>
            ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
