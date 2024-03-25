import React from "react";


interface Props {
  name: string;
  value: string;
  placeholder?: string;
  maxVal?: number;
  btnText?: string;
  btnOnClick?: () => void;
  onChange: (s: string) => void;

  disable?: boolean;
}

function SimulationInputGroup(props: Props) {
  return (
    <div className="relative w-56 rounded-md shadow-sm">
      <input
        type="text"
        name="value"
        id="input"
        className="block w-full pl-2 h-10 rounded-md border border-gray-600 "
        placeholder={props.placeholder}
        maxLength={props.maxVal}
        value={props.value}
        onChange={(e) => {
          props.onChange(e.currentTarget.value);
        }} // update the state value to be set as the input
      />
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          onClick={props.btnOnClick}
          disabled={props.disable !== undefined ? props.disable : false}
          id="input-button"
          className=" inline-block px-4 py-2.5 bg-lime-500 text-white font-medium text-md leading-tight  shadow-md hover:bg-lime-600 hover:shadow-lg transition duration-150 ease-in-out rounded-r-md "
        >
          {props.btnText ? props.btnText : "BTN"}
        </button>
      </div>
    </div>
  );
}

export default SimulationInputGroup;
