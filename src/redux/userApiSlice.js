import apiSlice from "./apiSlice";
import { USERS_URL } from "./constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    listUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateUserClr: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.id}`,
        method: "puT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useListUsersQuery,
  useUpdateUserClrMutation,
} = userApiSlice;
