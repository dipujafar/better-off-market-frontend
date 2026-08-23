import { baseApi } from "./baseApi";

const reviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSellerReviews: builder.query({
      query: ({ id, ...params }) => ({
        url: `/reviews/seller/${id}`,
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useGetSellerReviewsQuery } = reviewsApi;
