import {buildCreateApi} from '@reduxjs/toolkit/dist/query';

import {apiSlice} from '../../app/api/apiSlice' ;


export const userApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getUsers:builder.query({
            query:()=>'/users',
            keepUnusedDataFor:5,
        })
    })
})


export const {
    useGetUsersQuery
    
}=userApiSlice
