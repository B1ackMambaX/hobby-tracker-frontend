import {createApi} from '@reduxjs/toolkit/query/react';
import baseQueryWithAuth from "./baseQueryWithAuth.ts";
import TripTemplate from "@/types/models/TripTemplate.ts";

const tripTemplatesApi = createApi({
    reducerPath: 'templatesApi',
    baseQuery: baseQueryWithAuth,
    tagTypes: ['Templates'],
    endpoints: builder => ({
        addTemplate: builder.mutation<TripTemplate, TripTemplate>({
            query: (trip) => ({
                url: '/trip-templates/',
                method: 'POST',
                body: trip
            }),
            invalidatesTags: ['Templates']
        }),
        getTemplates: builder.query<TripTemplate[], void>({
            query: () => '/trip-templates/',
            providesTags: ['Templates']
        })
    }),
});

export const {
    useAddTemplateMutation,
    useGetTemplatesQuery
} = tripTemplatesApi;

export default tripTemplatesApi;