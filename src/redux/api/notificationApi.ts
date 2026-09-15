import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query({
      query: (params) => ({
        url: "/notifications",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.notifications],
    }),
    readNotification: builder.mutation({
      query: () => ({
        url: `/notifications`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.notifications],
    }),
    deleteNotification: builder.mutation({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.notifications],
    }),
  }),
});

export const { useGetNotificationQuery, useReadNotificationMutation, useDeleteNotificationMutation } =
  notificationApi;

export default notificationApi;
