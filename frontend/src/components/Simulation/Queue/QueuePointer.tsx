import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

import styles from "./Queue.module.css";

import arrowSvg from "../../../assets/undraw_arrow.svg";


interface Props {
  name: string;
  xPosition: number;
  arrowStyle: string;
  textStyle: string;
  upsideDown: boolean;
  className?: string;
}
function QueuePointer(props: Props) {
  const control = useAnimation();

  useEffect(() => {
    control.start({
      x: props.xPosition,
      transition: { type: "spring", stiffness: 20 },
    });
  }, [ props.xPosition, control ]);

  return (
    <motion.div
      className={"inline-block " + props.className}
      animate={control}
    >
      {props.upsideDown ? (
        <>
          <svg
            className={props.textStyle}
            height="32"
          >
            <text
              x="0"
              y="15"
              fill="black"
            >
              {props.name}
            </text>
          </svg>
          <img
            src={arrowSvg}
            className={props.arrowStyle}
            alt="My Happy SVG"
          />
        </>
      ) : (
        <>
          <img
            src={arrowSvg}
            className={props.arrowStyle}
            alt="My Happy SVG"
          />
          <svg
            className={props.textStyle}
            height="32"
          >
            <text
              x="0"
              y="15"
              fill="black"
            >
              {props.name}
            </text>
          </svg>
        </>
      )}
    </motion.div>
  );
}

export default QueuePointer;
