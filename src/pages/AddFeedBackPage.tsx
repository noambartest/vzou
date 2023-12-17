import { ClipboardDocumentListIcon } from "@heroicons/react/20/solid";
import { useRef, useState } from "react";

import FormButton from "../components/Auth/FormButton";
import ErrorMsg from "../components/UI/ErrorMsg";
import FloatUpContainer from "../components/UI/FloatUpContainer";
import MediumCard from "../components/UI/MediumCard";
import { mainColor, mainHoverColor } from "../styles/tColors";
import { MailboxLime500 } from "../utils/logos";


function AddFeedbackPage() {
  const [ errorMsgs, setErrorMsg ] = useState<string[]>([]);
  const dataEntered = useRef<HTMLTextAreaElement>(null);

  const onSubmitHanler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const content = dataEntered.current?.value;
    if (content?.trim().length === 0) {
      setErrorMsg([ "You can't submit empty feedback" ]);
    }

    // send to the server
  };

  return (
    <FloatUpContainer>
      <MediumCard>
        <form
          className="mt-8 space-y-6"
          action="#"
          method="POST"
          onSubmit={onSubmitHanler}
        >
          <div className="-space-y-px rounded-md shadow-sm">
            {/* feedback input */}
            <div>
              <textarea
                ref={dataEntered}
                required
                placeholder="Enter your feedback"
                cols={50}
                rows={7}
                className={`relative block w-full appearance-none rounded border border-gray-300 px-3 py-6 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-${mainColor} focus:outline-none focus:ring-${mainColor} sm:text-sm`}
              />
            </div>
          </div>

          {errorMsgs.length !== 0 && <ErrorMsg errorMessages={errorMsgs} />}

          <FormButton
            type="submit"
            title="Submit Feddback"
            icon={
              <ClipboardDocumentListIcon
                className={`h-5 w-5 text-${mainHoverColor} group-hover:text-${mainColor}`}
                aria-hidden="true"
              />
            }
          />
        </form>
        <div className="flex items-center justify-center py- px-2 sm:px-4 lg:px-8 ">
          <img
            className="h-64"
            src={MailboxLime500}
            alt="Vzou"
          />
        </div>
      </MediumCard>
    </FloatUpContainer>
  );
}

export default AddFeedbackPage;
