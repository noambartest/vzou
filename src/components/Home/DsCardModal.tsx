import { motion } from "framer-motion";

import styles from "./DsCard.module.css";


function DsCardModal(props: { onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      transition={{ duration: 0.2, delay: 0.15 }}
      style={{ pointerEvents: "auto" }}
      className={styles.overlay}
      onClick={props.onClick}
    />
  );
}

export default DsCardModal;
