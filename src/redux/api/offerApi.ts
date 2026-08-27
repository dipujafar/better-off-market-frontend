import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const offerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOffer: builder.mutation({
      query: (data) => ({
        url: "/offers",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.offer],
    }),
    getMyOffers: builder.query({
      query: (params) => ({
        url: "/offers/my-offers",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.offer],
    }),
    withdrawOffer: builder.mutation({
      query: (id) => ({
        url: `/offers/${id}/withdraw`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.offer],
    }),
    getMyReceivedOffers: builder.query({
      query: (params) => ({
        url: "/offers/received-offers",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.offer],
    }),
  }),
});

export const {
  useCreateOfferMutation,
  useGetMyOffersQuery,
  useWithdrawOfferMutation,
  useGetMyReceivedOffersQuery,
} = offerApi;
