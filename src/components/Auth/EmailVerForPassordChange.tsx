import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { FC, FormEvent, useState } from "react";

import FormButton from "./FormButton";

import { useSend2FACodeMutation } from "../../store/reducers/auth-reducer-api";
import { CodeTypes } from "../../types/Auth";
import { isErrorWithDataAndMessage } from "../../utils/helper-functions";
import ErrorMsg from "../UI/ErrorMsg";


interface EmailVerForPassordChangeProps {
  email: string;
  onConfirm: () => void;
}

/** Page used to send 2FA verification codes.
 *
 */
const EmailVerForPassordChange: FC<EmailVerForPassordChangeProps> = ({ email, onConfirm }) => {
  const [ errorMsgs, setErrorMsgs ] = useState<string[]>([]);
  const [ sendCode, { error }] = useSend2FACodeMutation(); // RTKQuery
  const SubmitEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors: string[] = [];
    // Display the error to the user and return
    setErrorMsgs(errors);
    if (errors.length !== 0) {
      return;
    }
    // Send request to the server!!!!
    await sendCode({ email, type: CodeTypes.RESET_PW })
      .unwrap()
      .then(() => {
        onConfirm();
      })
      .catch((rejected) => {
        console.error(rejected);
      });
  };

  return (
    <form
      className="mt-8 space-y-6"
      onSubmit={SubmitEmail}
    >
      <input
        type="hidden"
        name="remember"
        defaultValue="true"
      />
      {errorMsgs.length !== 0 && <ErrorMsg errorMessages={errorMsgs} />}
      {isErrorWithDataAndMessage(error) && <ErrorMsg errorMessages={[ error.data.message ]} />}
      <FormButton
        type="submit"
        title="Send code to my email"
        icon={
          <EnvelopeIcon
            className="h-5 w-5 text-lime-600 group-hover:text-lime-500"
            aria-hidden="true"
          />
        }
      />
    </form>
  );
};

export default EmailVerForPassordChange;
