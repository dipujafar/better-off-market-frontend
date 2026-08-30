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
    getSingleOffer: builder.query({
      query: (id) => ({
        url: `/offers/${id}`,
        method: "GET",
      }),
    }),
    sentCounterOffer: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/:${id}/counter`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.offer],
    }),
    acceptOffer: builder.mutation({
      query: (id) => ({
        url: `/offers/${id}/accept`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.offer],
    }),
    rejectOffer: builder.mutation({
      query: (id) => ({
        url: `/offers/${id}/reject`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.offer],
    }),
  }),
});

export const {
  useCreateOfferMutation,
  useGetMyOffersQuery,
  useWithdrawOfferMutation,
  useGetMyReceivedOffersQuery,
  useSentCounterOfferMutation,
  useAcceptOfferMutation,
  useGetSingleOfferQuery,
  useRejectOfferMutation,
} = offerApi;
