import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const propertyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProperty: build.mutation({
      query: (data) => ({
        url: "/properties",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.property],
    }),
  }),
});

export const { useCreatePropertyMutation } = propertyApi;
