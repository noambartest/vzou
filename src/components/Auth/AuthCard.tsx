import { ReactElement } from "react";

import { RotatesLogo } from "../UI/RotatesLogo";


interface Props {
  title: string;
  children?: ReactElement | ReactElement[];
}

function AuthCard(props: Props) {
  return (
    <div className="flex min-h-full items-center justify-center py-10 px-2 sm:px-4 lg:px-8 ">
      <div className="max-w-md w-full p-10 bg-white border border-gray-200 rounded-lg shadow-lg">
        <div className="w-full max-w-md space-y-8 ">
          <div>
            <RotatesLogo />
            <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900">
              {props.title}
            </h2>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthCard;
