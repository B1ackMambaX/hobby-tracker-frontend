import {createApi} from '@reduxjs/toolkit/query/react';
import baseQueryWithAuth from "./baseQueryWithAuth.ts";
import Spend from "@/types/models/Spend.ts";

const spendsApi = createApi({
    reducerPath: 'spendsApi',
    baseQuery: baseQueryWithAuth,
    tagTypes: ['Spends'],
    endpoints: builder => ({
        addSpend: builder.mutation<Spend, {spend: Spend, tripId: string}>({
            query: (payload) => ({
                url: `/spends/${payload.tripId}`,
                method: 'POST',
                body: payload.spend,
            }),
            invalidatesTags: ['Spends']
        }),
        getSpends: builder.query<Spend[], string>({
            query: (tripId) => ({
                url: `/spends/${tripId}`,

            }),
            providesTags: ['Spends']
        }),
        deleteSpend: builder.mutation<unknown, string>({
            query: (spendId) => ({
                url: `/spends/${spendId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Spends']
        })
    }),
});

export const {
    useAddSpendMutation,
    useGetSpendsQuery,
    useDeleteSpendMutation,
} = spendsApi;

export default spendsApi;