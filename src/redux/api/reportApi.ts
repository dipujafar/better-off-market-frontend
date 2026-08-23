import { baseApi } from "./baseApi";

const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReport: builder.mutation({
      query: (data) => ({
        url: "/reports",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateReportMutation } = reportApi;
