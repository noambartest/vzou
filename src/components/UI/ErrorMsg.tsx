/* The components get array of string, each element represent an error message.
the component display each element in li tag */

import { FC } from "react";


interface Props {
  errorMessages: string[];
}

const ErrorMsg: FC<Props> = (props: Props) => (
  <div
    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-left"
    role="alert"
  >
    <strong className="font-bold">Error! </strong>
    <span className="block sm:inline">
      {props.errorMessages.map((msg, index) => (
        <li key={index}>{msg}</li>
      ))}
    </span>
    <span className="absolute top-0 bottom-0 right-0 px-4 py-3" />
  </div>
);

export default ErrorMsg;
