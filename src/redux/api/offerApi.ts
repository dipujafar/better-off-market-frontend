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
  }),
});

export const { useCreateOfferMutation } = offerApi;
