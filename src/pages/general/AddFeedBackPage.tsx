import { ClipboardDocumentListIcon } from "@heroicons/react/20/solid";
import { Alert } from "@mui/material";
import { FormEvent, useState } from "react";

import FormButton from "../../components/Auth/FormButton";
import ErrorMsg from "../../components/UI/ErrorMsg";
import FloatUpContainer from "../../components/UI/FloatUpContainer";
import MediumCard from "../../components/UI/MediumCard";
import Spinner from "../../components/UI/Spinner";
import { usePostFeedbackMutation } from "../../store/reducers/feedback-reducer";
import { mainColor, mainHoverColor } from "../../styles/tColors";
import { MailboxLime500 } from "../../utils/logos";


function AddFeedbackPage() {
  const [ errorMessages, setErrorMessages ] = useState<string[]>([]);
  const [ message, setMessage ] = useState("");
  const [ subject, setSubject ] = useState("");
  const [ contactInfo, setContactInfo ] = useState("");
  const [ postFeedback, { isSuccess, isError, isLoading }] = usePostFeedbackMutation();
  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim().length === 0) {
      setErrorMessages([ "You can't submit empty feedback" ]);
      return;
    }
    await postFeedback({
      subject,
      message,
      contactInfo,
    }).catch((err) => {
      setErrorMessages([ err.data.message ]);
    });
    // clear form
    setMessage("");
    setSubject("");
    setContactInfo("");
  };
  return (
    <FloatUpContainer>
      <MediumCard>
        <form
          className="mt-8 space-y-6"
          onSubmit={onSubmitHandler}
        >
          <Spinner isLoading={isLoading} />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <input
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
                type="text"
                required
                className={`mb-3 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-${mainColor} focus:outline-none focus:ring-${mainColor} sm:text-sm`}
                placeholder="Subject"
                value={subject}
              />
              <textarea
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                required
                value={message}
                placeholder="Enter your feedback"
                cols={50}
                rows={7}
                className={`relative block w-full appearance-none rounded border border-gray-300 px-3 py-6 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-${mainColor} focus:outline-none focus:ring-${mainColor} sm:text-sm`}
              />
              <input
                onChange={(e) => {
                  setContactInfo(e.target.value);
                }}
                type="text"
                className={`mt-3 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-${mainColor} focus:outline-none focus:ring-${mainColor} sm:text-sm`}
                placeholder="Contact Info (Optional)"
                value={contactInfo}
              />
            </div>
          </div>

          {errorMessages.length > 0 && <ErrorMsg errorMessages={errorMessages} />}
          {isError && <ErrorMsg errorMessages={[ "Error submitting feedback, try again later" ]} />}
          {isSuccess && (
            <Alert
              severity="success"
              color="success"
            >
              Feedback submitted successfully
            </Alert>
          )}
          <FormButton
            type="submit"
            disabled={isLoading}
            title="Submit Feedback"
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
