import { baseApi } from "./baseApi";

const favoriteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFavorite: builder.mutation({
      query: (data) => ({
        url: "/favorites",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateFavoriteMutation } = favoriteApi;
