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
        }),
        applyTemplate: builder.mutation<unknown, {startDate: Date, endDate: Date, templateId: string}>({
            query: (body) => ({
                url: '/trips/apply-template',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Trips']
        })
    }),
});

export const {
    useAddTripMutation,
    useGetTripsQuery,
    useApplyTemplateMutation
} = tripsApi;

export default tripsApi;