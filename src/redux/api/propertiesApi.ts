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
    getMyListings: build.query({
      query: (params) => ({
        url: "/properties/my-listing",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.property],
    }),
    getPriceDroppedProperties: build.query({
      query: (params) => ({
        url: "/properties/price-dropped",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.property],
    }),
    updateProperty: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/properties/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.property],
    }),
    deleteProperty: build.mutation({
      query: (id) => ({
        url: `/properties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.property],
    }),
  }),
});

export const {
  useCreatePropertyMutation,
  useGetPropertiesQuery,
  useGetPriceDroppedPropertiesQuery,
  useGetMyListingsQuery,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
} = propertyApi;
