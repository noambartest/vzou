import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { setEmailFor2Factor, setUser } from "./auth-reducer";

import { EditUser } from "../../pages/EditProfilePage";
import {
  CodeTypes,
  IUser,
  LoginPayload,
  RegisterLecturerPayload,
  RegisterPayload,
  VerificationCodePayload,
} from "../../types/Auth";
import { API_URL } from "../config";


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { endpoint }) => {
      const token = localStorage.getItem("accessToken");
      if (token && endpoint !== "login") {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    authMe: builder.query<IUser, null>({
      query: () => ({
        url: "/user/auth-me",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    login: builder.mutation<
    {
      token: string;
      status: "Redirect-2FA" | "OK";
      user: IUser;
      email?: string;
    },
    LoginPayload
    >({
      query: (payload) => ({
        url: "/user/login",
        method: "POST",
        body: payload,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.status === "OK") {
            localStorage.setItem("accessToken", data.token);
            dispatch(setUser(data.user));
          } else if (data.status === "Redirect-2FA" && data.email) {
            dispatch(setEmailFor2Factor(data.email));
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),

    register: builder.mutation<{ token: string; status: string; user: IUser }, RegisterPayload>({
      query: (payload) => ({
        url: "/user/register",
        method: "POST",
        body: payload,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {
          console.log(error);
        }
      },
    }),
    registerLecturer: builder.mutation<
    { token: string; status: string; user: IUser },
    RegisterLecturerPayload
    >({
      query: (payload) => ({
        url: "/lecturer/register-lecturer",
        method: "POST",
        body: { ...payload, role: "Lecturer" },
      }),
    }),
    verify2fa: builder.mutation<
    { token?: string; status: "OK"; user?: IUser },
    VerificationCodePayload
    >({
      query: (payload) => ({
        url: "/user/verify-2fa",
        method: "POST",
        body: payload,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (args.type === "2FA" && data.status === "OK" && data.token && data.user) {
            localStorage.setItem("accessToken", data.token);
            dispatch(setUser(data.user));
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),

    send2FACode: builder.mutation<{ status: "OK" }, { email: string; type: CodeTypes }>({
      query: (payload) => ({
        url: "/user/send-2fa-code",
        method: "POST",
        body: payload,
      }),
    }),
    resetPassword: builder.mutation<
    { status: "OK" },
    { email: string; type: CodeTypes; code: string; password: string }
    >({
      query: (payload) => ({
        url: "/user/reset-password",
        method: "POST",
        body: payload,
      }),
    }),

    editProfile: builder.mutation<{ status: string; user: IUser }, EditUser>({
      query: (payload) => ({
        url: "/user/update-user-data",
        method: "POST",
        body: payload,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.status === "OK" && data.user) {
            dispatch(setUser(data.user));
          } else {
            console.log("error");
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),

    verifyEmail: builder.mutation<{ status: "OK" }, { token: string }>({
      query: (payload) => ({
        url: "/user/verify-email",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useAuthMeQuery,
  useLoginMutation,
  useRegisterMutation,
  useVerify2faMutation,
  useRegisterLecturerMutation,
  useResetPasswordMutation,
  useSend2FACodeMutation,
  useVerifyEmailMutation,
  useEditProfileMutation,
} = authApi;
