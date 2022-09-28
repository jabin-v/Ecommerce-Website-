import  {createSlice} from "@reduxjs/toolkit";





const initialState={

    keyword:"",

  
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
        gte:'0',
        lte:'5'
    },
    page:1 ,
   
    
 
   

}


const filterSlice=createSlice({
    name:"filter",
    initialState:initialState

    ,
    reducers:{
        
        greaterThanPrice: (state, action) => {
            state.price= {...state.price,gte:action.payload || 0}
            state.page=1
          },
        lessThanPrice: (state, action) => {
            state.price= {...state.price,lte:action.payload || 100000}
            state.page=1
          },
        color: (state, action) => {
            state.colors.in= action.payload
            state.page=1
          },
        brand: (state, action) => {

           
            state.brand= action.payload
            state.page=1
          },
        activity: (state, action) => {
            state.activity.in= action.payload
            
            state.page=1
          },
        rating:(state,action)=>{
            state.ratingsAverage={...state.ratingsAverage,gte:action.payload}
            state.page=1

        },
        category:(state,action)=>{
            state.category= action.payload
            state.page=1
        },
        keyword:(state,action)=>{
            state.keyword=action.payload
            state.page=1
        },
        clearFilters:(state,action)=>{
            state=initialState
        },
        setProducts:(state,action)=>{
            state.fileredProduct=state.fileredProduct.concat(action.payload)

        },
        setPage:(state,action)=>{
            console.log(action.payload)
            state.page=action.payload
        },
        resetPage:(state,action)=>{
            state.page=1
        }
        

        
       
    }

})


export const {greaterThanPrice,lessThanPrice,color,brand,activity,rating,category,keyword,clearFilters,setPage,resetPage}=filterSlice.actions;
export default filterSlice.reducer;




