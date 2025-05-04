import {createApi} from '@reduxjs/toolkit/query/react';
import baseQueryWithAuth from "./baseQueryWithAuth.ts";
import Trip from "@/types/models/Trip.ts";

const tripsApi = createApi({
    reducerPath: 'tripsApi',
    baseQuery: baseQueryWithAuth,
    tagTypes: ['Trips'],
    endpoints: builder => ({
        addTrip: builder.mutation<Trip, Trip>({
            query: (trip) => ({
                url: '/trips/',
                method: 'POST',
                body: trip
            }),
            invalidatesTags: ['Trips']
        })
    }),
});

export const {
    useAddTripMutation,
} = tripsApi;

export default tripsApi;