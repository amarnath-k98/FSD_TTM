import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_BASE_URL;


export const appAPi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
            headers.set("Content-Type", "application/json");
            return headers;
        }
    },
  }),
  endpoints: (builder) => ({
    //auth
    register: builder.mutation({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
    }),
    getMe: builder.query({
      url: "/auth/me",
    }),

    //tasks
    getAllTasks: builder.query({
      query: () => ({
        url: "/tasks",
      }),
    }),
    createTask: builder.mutation({
        query: (payload) => ({
            url: "/tasks",
            method: "POST",
            body: payload,
        })
    }),
    
      //users
      getAllUsers: builder.query({
          query: () => ({
            url:"/users",
        })
    })
  }),
});




export const {
    useRegisterMutation,
    useLoginMutation,
    useGetAllTasksQuery,
    useGetAllUsersQuery,
    useCreateTaskMutation
} = appAPi;
