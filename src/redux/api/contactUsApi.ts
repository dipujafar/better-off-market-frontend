import { baseApi } from "./baseApi";

const contactUsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    contactUs: builder.mutation({
      query: (data) => ({
        url: "/contact-us",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useContactUsMutation } = contactUsApi;