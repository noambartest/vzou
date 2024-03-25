import { useState } from "react";
import swal from "sweetalert";

import MediumCard from "../../UI/MediumCard";
import SimulationInputGroup from "../../UI/SimulationInputGroup";


export interface Item {
  value: string;
  key: number;
  color?: string;
}

interface Props {
  // Functions are implemented on the stack/queue page
  removeHandler: () => void; // remove from data
  addHandler: (value: string) => void; // function that gets the value and add to the the data
  setRandomInput?: (newData: Item[]) => void;

  isRemovedEnabled: boolean; // to prevent colision between pop animation
  isAddEnabled?: boolean; // to prevent colision between push animation

  addBtnText: string;
  removeBtnText: string;
  maxLengthOfValue: number;
}

function SqControlsPanel(props: Props) {
  const [ enteredValue, setEnteredValue ] = useState<string>(""); // state for the value that need to be push

  const inputValueHandler = () => {
    const value = enteredValue; // get the input value
    if (value.length > 0 && value.length <= props.maxLengthOfValue) {
      // checking that the value is not an empty string
      props.addHandler(value); // call the push function
      setEnteredValue(""); // reset the value
    } else if (value.length === 0) {
      swal({ icon: "error", text: "Must enter a value!" });
    } else {
      swal({
        icon: "error",
        text: `Max element legnth is ${props.maxLengthOfValue}!`,
      });
    }
  };

  const randomButtonHandler = () => {
    const newData = [ ...Array(7) ]
      .map(() => Math.floor(Math.random() * 10000).toString())
      .map((e, index) => ({ key: index, value: e }))
      .reverse();
    if (props.setRandomInput) props.setRandomInput(newData);
  };

  return (
    <MediumCard isSmaller>
      <div
        className="grid grid-cols-3 justify-items-center
        "
      >
        {/* Random input button */}
        <button
          onClick={randomButtonHandler}
          className=" inline-block px-4 py-2.5 bg-lime-500 text-white font-medium text-md leading-tight  rounded shadow-md hover:bg-lime-600 hover:shadow-lg transition duration-150 ease-in-out"
        >
          Random
        </button>
        {/* input text box for value to push */}
        <SimulationInputGroup
          name="value"
          value={enteredValue}
          maxVal={props.maxLengthOfValue}
          placeholder="Enter value"
          btnText={props.addBtnText}
          onChange={setEnteredValue}
          btnOnClick={inputValueHandler}
          disable={props.isAddEnabled}
        />

        {/* POP button */}
        <button
          onClick={props.removeHandler}
          disabled={props.isRemovedEnabled}
          className=" inline-block px-4 py-2.5 bg-lime-500 text-white font-medium text-md leading-tight  rounded shadow-md hover:bg-lime-600 hover:shadow-lg transition duration-150 ease-in-out"
        >
          {props.removeBtnText}
        </button>
      </div>
    </MediumCard>
  );
}

export default SqControlsPanel;
