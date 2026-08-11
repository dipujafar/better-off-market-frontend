import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const favoriteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFavorite: builder.mutation({
      query: (data) => ({
        url: "/favorites",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.favorites],
    }),
    getFavorites: builder.query({
      query: (params) => ({
        url: "/favorites",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.favorites],
    }),
    deleteFavorite: builder.mutation({
      query: (id) => ({
        url: `/favorites/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.favorites],
    }),
  }),
});

export const { useCreateFavoriteMutation, useGetFavoritesQuery, useDeleteFavoriteMutation } = favoriteApi;
