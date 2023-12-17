import { ClipboardDocumentListIcon } from "@heroicons/react/20/solid";
import { Alert } from "@mui/material";
import { FormEvent, useState } from "react";

import { CheckConfirmPassword, CheckEmail, CheckName, CheckPassword } from "./AuthFunctions";
import FormButton from "./FormButton";

import { useRegisterLecturerMutation } from "../../store/reducers/auth-reducer-api";
import { mainColor, mainHoverColor } from "../../styles/tColors";
import { RegisterLecturerPayload } from "../../types/Auth";
import { isErrorWithDataAndMessage } from "../../utils/helper-functions";
import ErrorMsg from "../UI/ErrorMsg";


const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function RegistrationForm() {
  const [ registerUser, { error, isLoading, isSuccess }] = useRegisterLecturerMutation();
  const [ dataEntered, setDataEntered ] = useState<RegisterLecturerPayload>(initialState);
  const [ errorMsgs, setErrorMsg ] = useState<string[]>([]);

  const onChangeHandler = (event: any) => {
    setDataEntered((prevstate) => ({ ...prevstate, [event.target.name]: event.target.value }));
  };

  const checkData = () => {
    const errorStack = [];
    // check passwords
    if (!CheckPassword(dataEntered.password)) {
      errorStack.push("Invalid password, must contain:[a-z],[A-Z],[0-9] and special chracter");
    } else if (!CheckConfirmPassword(dataEntered.password, dataEntered.confirmPassword!)) {
      errorStack.push("The passwords must match");
    }

    // check names
    if (!CheckName(dataEntered.firstName) || !CheckName(dataEntered.lastName)) {
      errorStack.push("Invalid name, must contain:[a-z],[A-Z]");
    }

    // check email
    if (!CheckEmail(dataEntered.email)) {
      errorStack.push("Invalid email");
    }
    return errorStack;
  };

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // check entered data
    const errors = checkData();
    setErrorMsg(errors);
    if (errors.length) {
      return;
    }

    registerUser(dataEntered);
  };

  return (
    <form
      className="mt-8 space-y-6"
      action="#"
      method="POST"
      onSubmit={onSubmitHandler}
    >
      {isSuccess && (
        <Alert
          severity="success"
          color="success"
        >
          User created successfully!
        </Alert>
      )}
      <input
        type="hidden"
        name="remember"
        defaultValue="true"
      />
      <div className="-space-y-px rounded-md shadow-sm">
        {/* first name */}
        <div>
          <label
            htmlFor="First-Name"
            className="sr-only"
          >
            First Name
          </label>
          <input
            onChange={onChangeHandler}
            id="First-Name"
            name="firstName"
            type="text"
            autoComplete="first-name"
            required
            className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-${mainColor} focus:outline-none focus:ring-${mainColor} sm:text-sm`}
            placeholder="First name"
          />
        </div>

        {/* last name */}
        <div>
          <label
            htmlFor="Last-Name"
            className="sr-only"
          >
            Last Name
          </label>
          <input
            onChange={onChangeHandler}
            id="Last-Name"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            className={`relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-${mainColor} focus:outline-none focus:ring-${mainColor} sm:text-sm`}
            placeholder="Last name"
          />
        </div>

        {/* email */}
        <div>
          <label
            htmlFor="email-address"
            className="sr-only"
          >
            Email address
          </label>
          <input
            onChange={onChangeHandler}
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={`relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-${mainColor} focus:outline-none focus:ring-${mainColor} sm:text-sm`}
            placeholder="Email address"
          />
        </div>

        {/* password */}
        <div>
          <label
            htmlFor="password"
            className="sr-only"
          >
            Password
          </label>
          <input
            onChange={onChangeHandler}
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className={`relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-${mainColor} focus:outline-none focus:ring-${mainColor} sm:text-sm`}
            placeholder="Password"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="sr-only"
          >
            Confirm password
          </label>
          <input
            onChange={onChangeHandler}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            className={`relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-${mainColor} focus:outline-none focus:ring-${mainColor} sm:text-sm`}
            placeholder="Confirm Password"
          />
        </div>
      </div>

      {errorMsgs.length !== 0 && <ErrorMsg errorMessages={errorMsgs} />}
      {isSuccess && <ErrorMsg errorMessages={[ "Lecturer account successfully created" ]} />}
      {isErrorWithDataAndMessage(error) && <ErrorMsg errorMessages={[ error.data.message ]} />}

      <FormButton
        type="submit"
        title="Sign up"
        icon={
          <ClipboardDocumentListIcon
            className={`h-5 w-5 text-${mainHoverColor} group-hover:text-${mainColor}`}
            aria-hidden="true"
          />
        }
      />
    </form>
  );
}

export default RegistrationForm;
