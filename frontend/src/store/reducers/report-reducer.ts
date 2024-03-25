import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { AlgorithmReport } from "../../types/AlgorithmReport";
import { GeneralReport } from "../../types/GeneralReport";
import { API_URL } from "../config";

// Define a service using a base URL and expected endpoints
export const reportApi = createApi({
  reducerPath: "reportApi",
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
    getAlgorithmReports: builder.query<AlgorithmReport, any>({
      query: () => "/lecturer/report/algo-report",
    }),
    getGeneralReports: builder.query<GeneralReport, any>({
      query: () => "/lecturer/report/general-report",
    }),

    registerActivity: builder.mutation<{ status: "OK" }, { subject: string; algorithm: string }>({
      query: (payload) => ({
        url: "/user/register-activity",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAlgorithmReportsQuery,
  useGetGeneralReportsQuery,
  useRegisterActivityMutation,
} = reportApi;
