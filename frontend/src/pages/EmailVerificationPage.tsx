import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import AuthCard from "../components/Auth/AuthCard";
import FormButton from "../components/Auth/FormButton";
import ErrorMsg from "../components/UI/ErrorMsg";
import FloatUpContainer from "../components/UI/FloatUpContainer";
import RoutePaths from "../Routes/RoutePaths";
import { useSend2FACodeMutation, useVerifyEmailMutation } from "../store/reducers/auth-reducer-api";
import { CodeTypes } from "../types/Auth";
import { MailboxLime500 } from "../utils/logos";


function EmailVerificationPage() {
  const { token } = useParams<{ token: string }>();
  const [ error, setError ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ success, setSuccess ] = useState("");
  const [ verifyEmail ] = useVerifyEmailMutation();
  const [ resendEmail ] = useSend2FACodeMutation();
  const history = useHistory();
  useEffect(() => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace("-", "+").replace("_", "/");
      const { exp } = JSON.parse(window.atob(base64));
      const expiration = new Date(exp * 1000);
      const now = new Date();
      const fiveMinutes = 1000 * 60 * 5;
      if (now.getTime() - expiration.getTime() > fiveMinutes) {
        setError("Recover Token expired");
      } else {
        verifyEmail({ token })
          .unwrap()
          .then((res) => {
            if (res.status === "OK") {
              history.push(RoutePaths.LOGIN);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } catch (e) {
      setError("Invalid Recover Token");
      // history.push('/recover_password')
    }
  }, [ token ]);
  return (
    <>
      <FloatUpContainer>
        <AuthCard title="Email verification">
          {error ? (
            <>
              <form
                className="mt-8 space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  resendEmail({ email, type: CodeTypes.VERIFY_EMAIL })
                    .unwrap()
                    .then(() => {
                      setSuccess("Email Sent, check your email");
                    })
                    .catch((e) => {
                      console.log(e);
                    });
                }}
              >
                <div className="-space-y-px rounded-md shadow-sm mb-6 mt-6">
                  <div>
                    <label
                      htmlFor="email-address"
                      className="sr-only"
                    >
                      Email address
                    </label>
                    <input
                      id="code"
                      name="code"
                      type="email"
                      autoComplete="email"
                      required
                      className="mb-3 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <FormButton
                    type="submit"
                    title="Resend email"
                    icon={
                      <ArrowPathIcon
                        className="h-5 w-5 text-lime-600 group-hover:text-lime-500"
                        aria-hidden="true"
                      />
                    }
                  />
                </div>
              </form>
              <ErrorMsg errorMessages={[ error ]} />
            </>
          ) : undefined}
        </AuthCard>
      </FloatUpContainer>

      <FloatUpContainer>
        <div className="flex items-center justify-center px-2 sm:px-4 lg:px-8 ">
          <img
            className="h-64"
            src={MailboxLime500}
            alt="Vzou"
          />
        </div>
      </FloatUpContainer>
    </>
  );
}

export default EmailVerificationPage;
