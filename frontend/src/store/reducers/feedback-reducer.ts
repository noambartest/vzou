import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { FeedbackData, FeedbackPayload } from "../../types/FeedBack";
import { API_URL } from "../config";


export const feedbackApi = createApi({
  reducerPath: "feedbackApi",
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
    getAllFeedback: builder.query<FeedbackData, any>({
      query: () => "lecturer/feedback/get-all",
    }),
    postFeedback: builder.mutation<{ status: "OK" }, FeedbackPayload>({
      query: (payload) => ({
        url: "/user/post-feedback",
        method: "POST",
        body: payload,
      }),
    }),
    deleteFeedbacks: builder.mutation<{ status: "OK" }, { idList: number[] }>({
      query: (payload) => ({
        url: "/lecturer/feedback/delete",
        method: "DELETE",
        body: payload,
      }),
    }),
  }),
});

export const { useGetAllFeedbackQuery, usePostFeedbackMutation, useDeleteFeedbacksMutation } =
  feedbackApi;
