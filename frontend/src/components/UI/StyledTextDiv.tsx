import { motion, MotionStyle } from "framer-motion";


interface Props {
  text: string;
  style?: MotionStyle;
}

export function StyledTextDiv(props: Props) {
  return (
    <motion.div
      style={{ ...props.style, fontFamily: "monaco", fontWeight: "bolder" }}
      transition={{
        layout: { duration: 0.5, ease: "easeIn" },
      }}
      initial={{
        x: -10,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
        transition: { duration: 0.5 }, // todo fix animations on bgcolor
      }}
      exit={{
        x: 10,
        opacity: 0,
        transition: { duration: 0.5 },
      }}
    >
      {props.text}
    </motion.div>
  );
}
