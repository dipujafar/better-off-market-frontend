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
    getProperties: build.query({
      query: (params) => ({
        url: "/properties",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.property],
    }),
  }),
});

export const { useCreatePropertyMutation, useGetPropertiesQuery } = propertyApi;
