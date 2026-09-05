import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const contentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContent: builder.query({
      query: (queries) => ({
        url: "/contents",
        method: "GET",
        params: queries,
      }),
      providesTags: [tagTypes.content],
    }),
  }),
});

export const { useGetContentQuery } = contentApi;
