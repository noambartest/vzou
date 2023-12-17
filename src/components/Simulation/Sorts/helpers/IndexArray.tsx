import { AnimatePresence, motion } from "framer-motion";

import styles from "./IndexArray.module.css";


interface Props {
  size: number;
  i: number;
  j?: number;
  iName?: string;
  jName?: string;
}

export function IndexArray({ size, i, j, iName: i_name = "i", jName: j_name = "j" }: Props) {
  return (
    <div>
      {/* Data of stack animation */}
      <motion.ul className={styles.s_ul}>
        <AnimatePresence mode="sync">
          {/* map each elment from the stack data to motion.il / */}
          {[ ...Array(size) ].map((elem: number, index) => (
            <motion.li
              className={styles.s_li}
              layout
              transition={{
                layout: { duration: 1 },
              }}
              key={index}
            >
              {j !== undefined
                ? index === i + 1 && i === j
                  ? `${i_name},${j_name}`
                  : index === i + 1
                    ? i_name
                    : index === j + 1
                      ? j_name
                      : ""
                : index === i + 1
                  ? i_name
                  : ""}
              {/* text inside the box */}
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
