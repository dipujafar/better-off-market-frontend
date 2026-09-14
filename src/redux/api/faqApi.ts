import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const faqApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFaqs: build.query({
      query: (params) => ({
        url: "/faqs",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.faqs],
    }),
  }),
});

export const { useGetFaqsQuery } = faqApi;
