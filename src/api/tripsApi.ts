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
        }),
        getTrips: builder.query<Trip[], void>({
            query: () => '/trips/',
            providesTags: ['Trips']
        })
    }),
});

export const {
    useAddTripMutation,
    useGetTripsQuery
} = tripsApi;

export default tripsApi;