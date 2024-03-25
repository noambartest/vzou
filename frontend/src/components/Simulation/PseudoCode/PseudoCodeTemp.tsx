import { motion } from "framer-motion";


interface Props {
  line: number;
  code: PseudoItem[];
  children?: JSX.Element | JSX.Element[];
}

export interface PseudoItem {
  text: string;
  tabAmount: number;
}

export function PseudoCodeTemp(props: Props) {
  return (
    <motion.div
      className="basis-3/12"
      style={{ textAlign: "left" }}
    >
      <motion.ul>
        {props.code.map((l, index) => (
          <motion.li
            key={index}
            initial={{ backgroundColor: "rgba(0,0,0,0)" }}
            animate={{
              backgroundColor: index === props.line ? "#bef264" : "rgba(0,0,0,0)",
            }}
            transition={{
              duration: 0.5,
            }}
          >
            {[ ...Array(l.tabAmount) ].map((x, i) => (
              <span key={i}>&emsp;</span>
            ))}
            <span>{l.text}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
