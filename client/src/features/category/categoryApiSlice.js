import {
    createSelector,
    createEntityAdapter  
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";



const categoriesAdapter = createEntityAdapter({
    selectId: (e) => e._id
  });

const initialState=categoriesAdapter.getInitialState();

export const categoriesApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getCategories:builder.query({
            query:()=>"/category",
            transformResponse:responseData=>{

                console.log(categoriesAdapter)
                console.log(initialState);
                console.log(responseData);
                return categoriesAdapter.setAll(initialState,responseData.data)
            },
        }),

        


        


    })
})



export const {useGetCategoriesQuery}=categoriesApiSlice;

export const selectCaegoriesResult = categoriesApiSlice.endpoints.getCategories.select();

// console.log(selectCaegoriesResult)

const selectCategoriesData = createSelector(
    selectCaegoriesResult,
    categoriesResult => categoriesResult.data // normalized state object with ids & entities
)



export const {
    selectAll: selectAllCategories,
    selectById: selectCategoryById,
    selectIds: selectCategoryIds
    // Pass in a selector that returns the posts slice of state
} = categoriesAdapter.getSelectors(state => selectCategoriesData(state) ?? initialState)
