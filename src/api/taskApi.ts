import {createApi} from '@reduxjs/toolkit/query/react';
import baseQueryWithAuth from "./baseQueryWithAuth.ts";
import Task from "@/types/models/Task.ts";

const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: baseQueryWithAuth,
    tagTypes: ['Tasks'],
    endpoints: builder => ({
        addTask: builder.mutation<Task, {task: Task, tripId: string}>({
            query: (payload) => ({
                url: `/tasks/${payload.tripId}`,
                method: 'POST',
                body: payload.task,
            }),
            invalidatesTags: ['Tasks']
        }),
        getTasks: builder.query<Task[], string>({
            query: (tripId) => ({
                url: `/tasks/${tripId}`,

            }),
            providesTags: ['Tasks']
        }),
        updateTask: builder.mutation<unknown, Task>({
            query: (payload) => ({
                url: `/tasks/${payload._id}`,
                method: 'PUT',
                body: payload
            }),
            invalidatesTags: ['Tasks']
        })
    }),
});

export const {
    useAddTaskMutation,
    useGetTasksQuery,
    useUpdateTaskMutation,
} = tasksApi;

export default tasksApi;