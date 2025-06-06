import { baseApi } from "../baseApi";

export const clinicianApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStatistics: builder.query({
      query: () => ({
        url: `/auth/dashboard-analytics`,
        method: "GET",
      }),
      providesTags: ["User", "Service", "Clinician", "Blog"],
    }),
  }),
});

export const { useGetDashboardStatisticsQuery } = clinicianApi;
