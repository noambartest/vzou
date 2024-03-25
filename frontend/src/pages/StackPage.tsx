import { motion } from "framer-motion";
import { useState } from "react";

import SqControlsPanel, { Item } from "../components/Simulation/ControlsPanels/SqControlsPanel";
import Stack from "../components/Simulation/Stack/Stack";


const MAX_ELEMENTS = 10;

// The stack page divides to 3 col: left = control panel (navbar), middle = stack, rigth = psaudo code

function StackPage() {
  const [ data, setData ] = useState<Item[]>([]); // data of the stack
  const [ isPop, setIsPop ] = useState<boolean>(false);

  const popFromStack = () => {
    if (data.length > 0) {
      // if the stack is not empty
      // copy data and remove first element
      setIsPop(false);
      const newData = [ ...data ];
      newData.splice(0, 1);
      setData(newData); // update data

      setIsPop(true);

      setTimeout(() => {
        setIsPop(false);
      }, 2000);
    }
  };

  const pushToStack = (value: string) => {
    if (data.length === MAX_ELEMENTS) {
      window.alert(`A maximum of ${MAX_ELEMENTS} values can be entered`);
    } else {
      // add new elment at the start
      const key = data.length;
      const newData = [{ value, key }, ...data ];
      setData(newData);
    }
  };

  const setRandomInput = (newData: Item[]) => {
    setData(newData);
  };

  return (
    <>
      {/* top section */}

      <SqControlsPanel
        removeHandler={popFromStack}
        addHandler={pushToStack}
        setRandomInput={setRandomInput}
        isRemovedEnabled={isPop}
        addBtnText="Push"
        removeBtnText="Pop"
        maxLengthOfValue={8}
      />

      <div className="container mx-auto max-w-7xl px-0 md: py-10">
        <div className="flex flex-nowrap">
          {/* middle section */}
          <Stack items={data} />

          {/* rigth section */}
          <div className="basis-4/12">
            Pseudo code:
            <ul>
              <motion.li
                initial={{ backgroundColor: "rgba(0,0,0,0)" }}
                animate={
                  isPop
                    ? {
                      backgroundColor: [ "#bef264", "rgba(0,0,0,0)" ],
                    }
                    : {}
                }
                transition={{
                  // duration: 2.5,
                  duration: 2,
                }}
              >
                if (!stack.isEmpty()):
              </motion.li>
              <motion.li
                initial={{ backgroundColor: "rgba(0,0,0,0)" }}
                animate={
                  isPop
                    ? {
                      backgroundColor: [ "rgba(0,0,0,0)", "#bef264" ],
                    }
                    : {}
                }
                transition={{
                  // duration: 2.5,
                  delay: 0.5,
                  duration: 0.5,
                }}
              >
                {"    return arr[size-1];"}
              </motion.li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default StackPage;
