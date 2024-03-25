import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { ExpendedItem } from "./DsCard";


function ExpendedCardItems(props: { list: ExpendedItem[] | undefined }) {
  const listVariant = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.15,
      },
    },
  };
  const itemVariant = {
    hidden: {
      x: -30,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <motion.ul
      variants={listVariant}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="w-46"
    >
      {props.list &&
        props.list.map((elem, index) => (
          <motion.li
            className="inline-block mt-1 w-48 py-1 bg-lime-500 text-white font-medium text-sm  shadow-md hover:bg-lime-600 hover:shadow-lg transition duration-150 ease-in-out rounded-md"
            variants={itemVariant}
            key={index}
          >
            <Link to={elem.url}>{elem.name}</Link>
          </motion.li>
        ))}
    </motion.ul>
  );
}

export default ExpendedCardItems;
