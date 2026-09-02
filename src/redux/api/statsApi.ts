import { baseApi } from "./baseApi";

const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query({
      query: () => ({
        url: "/stats/about-page",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetStatsQuery } = statsApi;
