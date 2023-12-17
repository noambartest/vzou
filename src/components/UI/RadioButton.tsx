import React, { useState } from "react";


interface OptionProps {
  index: number;
  selectedIndex?: number; // in order to know if this option selected.

  onSelect: (index: number) => void;

  children: React.ReactNode;
}

function Option(props: OptionProps) {
  const isSelected = props.index === props.selectedIndex;

  return (
    <div
      className={`flex items-center gap-2 shadow cursor-pointer transition duration-300 bg-slate-50 mx-1 rounded-md p-2 py-3  flex-1 text-xs font-bold text-slate-600 lg:font-normal lg:text-sm hover:shadow-md ${
        isSelected && "bg-lime-100"
      }`}
      onClick={() => {
        props.onSelect(props.index);
      }} // when the button is clicked we want to change the index
    >
      <div
        className={`rounded-full w-4 h-4 border transition ${
          isSelected && "border-4 border-lime-500 bg-lime-300"
        } `}
      />
      {props.children}
    </div>
  );
}

// code of radio button

interface IProps {
  options: React.ReactElement[];
  onChange?: (selectedIndex: number) => void;
  value?: number;
  labelText?: string;
}

function RadioButton({ options, onChange, value, labelText }: IProps) {
  const [ selectedIndex, setSelectedIndex ] = useState<number>(value || 0);

  function onSelect(index: number) {
    setSelectedIndex(index); // set the index
    onChange && onChange(index); // if the function onChnage exists then call it.
  }

  return (
    <div>
      {labelText && (
        <label className="block text-gray-600 mb-2 text-xs lg:text-sm xl:text-base">
          {labelText}
        </label>
      )}
      <div className="flex justify-evenly">
        {options.map((el, index) => (
          <Option
            key={index}
            index={index}
            selectedIndex={selectedIndex}
            onSelect={(index) => {
              onSelect(index);
            }}
          >
            {el}
          </Option>
        ))}
      </div>
    </div>
  );
}

export default RadioButton;
