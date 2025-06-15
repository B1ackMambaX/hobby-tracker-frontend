import {createApi} from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "@/api/baseQueryWithAuth.ts";
import Remainder from "@/types/models/Remainder.ts";

const remaindersApi = createApi({
    reducerPath: 'remaindersApi',
    baseQuery: baseQueryWithAuth,
    tagTypes: ['Remainders'],
    endpoints: builder => ({
        getRemainders: builder.query<Remainder[], void>({
            query: () => '/notifications/active',
            providesTags: ['Remainders'],
            transformResponse(data: Remainder[]) {
                return data.filter(rem =>
                    rem.status !== 'done' && new Date(rem.remindAt).setHours(0, 0, 0, 0) <= Date.now()
                )
            }
        }),
        doneRemainder: builder.mutation<Remainder, Remainder>({
            query: (remainder) => ({
                url: `/notifications/${remainder._id}/done`,
                method: 'PATCH'
            }),
            invalidatesTags: ['Remainders']
        }),
        postponeRemainder: builder.mutation<Remainder, Remainder>({
            query: (remainder) => {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(0, 0, 0, 0);

                return {
                    url: `/notifications/${remainder._id}/postpone`,
                    method: 'PATCH',
                    body: {
                        until: tomorrow
                    }
                };
            },
            invalidatesTags: ['Remainders']
        })

    })
})

export const {
    useGetRemaindersQuery,
    useDoneRemainderMutation,
    usePostponeRemainderMutation
} = remaindersApi;

export default remaindersApi;