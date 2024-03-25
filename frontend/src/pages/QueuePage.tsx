import { useState } from "react";

import ControlsPanel, { Item } from "../components/Simulation/ControlsPanels/SqControlsPanel";
import Queue from "../components/Simulation/Queue/Queue";


const MAX_ELEMENTS = 10;

// The Queue page divides to 3 col: left = control panel (navbar), middle = stack, rigth = psaudo code
export interface Position {
  curr: number;
  prev: number;
}

function QueuePage() {
  const [ data, setData ] = useState<Item[]>([]); // data of the stack
  const [ isPop, setIsPop ] = useState<boolean>(false);
  const [ keyValue, setKeyValue ] = useState<number>(0);
  const [ headPosition, setHeadPosition ] = useState<Position>({
    curr: 0,
    prev: 35,
  });
  const [ tailPosition, setTailPosition ] = useState<number>(-35);

  //   const [xPosition, setXPosition] = useState(35);
  //   const [xPrevPosition, setXPrevPosition] = useState(70);

  const Dequeue = () => {
    if (data.length > 0) {
      // if the stack is not empty
      // copy data and remove first element
      setIsPop(false);
      const newData = [ ...data ];
      newData.splice(0, 1);
      setData(newData); // update data
      setHeadPosition((prevState) => ({ curr: prevState.curr + 35, prev: prevState.curr }));
      setTailPosition((prevState) => prevState - 35);
      setIsPop(true);

      setTimeout(() => {
        setIsPop(false);
      }, 2000);
    }
  };

  const Enqueue = (value: string) => {
    if (data.length === MAX_ELEMENTS) {
      window.alert(`A maximum of ${MAX_ELEMENTS} values can be entered`);
    } else {
      // add new elment at the start
      const newData = [ ...data, { value, key: keyValue }];
      setKeyValue((prevState) => prevState + 1);
      setHeadPosition((prevState) => ({ curr: prevState.curr - 35, prev: prevState.curr }));
      setTailPosition((prevState) => prevState + 35);
      setData(newData);
    }
  };

  const setRandomInput = (newData: Item[]) => {
    setData(newData);
    setKeyValue(newData.length);

    // fix positions
    setHeadPosition((prevState) => ({ curr: -35 * newData.length, prev: prevState.curr }));

    // fix positions
    setTailPosition((prevState) => -35 + 35 * newData.length);
  };

  return (
    <>
      {/* top section */}
      <ControlsPanel
        removeHandler={Dequeue}
        addHandler={Enqueue}
        setRandomInput={setRandomInput}
        isRemovedEnabled={isPop}
        addBtnText="Enqueue"
        removeBtnText="Dequeue"
        maxLengthOfValue={4}
      />

      <div className="container mx-auto max-w-7xl px-0 md: py-0">
        <div className="flex flex-nowrap">
          {/* middle section */}
          <Queue
            headPosition={headPosition}
            tailPosition={tailPosition}
            items={data}
          />

          {/* rigth section */}
          {/* <div className="basis-3/12">
            Pseudo code:
            <ul>
              <motion.li
                initial={{ backgroundColor: "rgba(0,0,0,0)" }}
                animate={
                  isPop
                    ? {
                        backgroundColor: ["#bef264", "rgba(0,0,0,0)"],
                      }
                    : {}
                }
                transition={{
                  // duration: 2.5,
                  duration: 2,
                }}
              >
                {"if (!stack.isEmpty()):"}
              </motion.li>
              <motion.li
                initial={{ backgroundColor: "rgba(0,0,0,0)" }}
                animate={
                  isPop
                    ? {
                        backgroundColor: ["rgba(0,0,0,0)", "#bef264"],
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
          </div> */}
        </div>
      </div>
    </>
  );
}

export default QueuePage;
