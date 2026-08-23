import { baseApi } from "./baseApi";

const getInTouchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createGetInTouch: builder.mutation({
      query: (data) => ({
        url: "/get-in-touch",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateGetInTouchMutation } = getInTouchApi;
