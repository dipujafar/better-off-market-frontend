import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const agreementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSellerAuthorization: builder.mutation({
      query: ({ offerId, data }) => ({
        url: `/agreements/seller-authorize/${offerId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.agreement],
    }),
    addBuyerAuthorization: builder.mutation({
      query: ({ offerId, data }) => ({
        url: `/agreements/buyer-authorize/${offerId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.agreement],
    }),
  }),
});

export const { useAddSellerAuthorizationMutation, useAddBuyerAuthorizationMutation } = agreementApi;
