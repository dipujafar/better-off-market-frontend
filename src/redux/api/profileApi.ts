import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: () => ({
        url: "/users/my-profile",
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/users/update-my-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.profile],
    }),
    getSellerProfile: builder.query({
      query: (id) => ({
        url: `/users/seller-profile/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),
    getSellerDashboardStats: builder.query({
      query: () => ({
        url: "/users/seller-stats",
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),
    getSellerListingAnalytics: builder.query({
      query: (params) => ({
        url: "/users/seller/listing-analytics",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.profile],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
  useGetSellerProfileQuery,
  useGetSellerDashboardStatsQuery,
  useGetSellerListingAnalyticsQuery,
  useGetUserByIdQuery,
} = profileApi;
