import  {createSlice} from "@reduxjs/toolkit";





const initialState={

  
    price:{
        gte:"10",
        lte:"100000"
    },
    colors:{
        in:[]
    },
    brand:[],
    activity:{
        in:[]
    },
    category:[],
    ratingsAverage:{
        gte:'',
        lte:'5'
    }
   

}


const filterSlice=createSlice({
    name:"filter",
    initialState:initialState

    ,
    reducers:{
        
        greaterThanPrice: (state, action) => {
            state.price= {...state.price,gte:action.payload || 0}
          },
        lessThanPrice: (state, action) => {
            state.price= {...state.price,lte:action.payload || 10000}
          },
        color: (state, action) => {
            state.colors.in= action.payload
          },
        brand: (state, action) => {
            state.brand= action.payload
          },
        activity: (state, action) => {
            state.activity.in= action.payload
          },
        rating:(state,action)=>{
            state.ratingsAverage={...state.ratingsAverage,gte:action.payload}

        },
        category:(state,action)=>{
            state.category= action.payload
        }
        

        
       
    }

})


export const {greaterThanPrice,lessThanPrice,color,brand,activity,rating,category}=filterSlice.actions;
export default filterSlice.reducer;




