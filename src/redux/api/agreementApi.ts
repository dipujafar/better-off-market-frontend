import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const agreementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleAgreement: builder.query({
      query: (id) => ({
        url: `/agreements/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.agreement],
    }),
    addSellerAuthorization: builder.mutation({
      query: ({ offerId, data }) => ({
        url: `/agreements/seller-authorize/${offerId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.agreement, tagTypes.offer],
    }),
    addBuyerAuthorization: builder.mutation({
      query: ({ offerId, data }) => ({
        url: `/agreements/buyer-authorize/${offerId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.agreement, tagTypes?.offer],
    }),
    signDocument: builder.mutation({
      query: ({ offerId, data }) => ({
        url: `/agreements/${offerId}/sign`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.agreement, tagTypes.offer],
    })
  }),
});

export const {
  useGetSingleAgreementQuery,
  useAddSellerAuthorizationMutation,
  useAddBuyerAuthorizationMutation,
  useSignDocumentMutation
} = agreementApi;
