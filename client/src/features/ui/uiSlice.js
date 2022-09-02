import  {createSlice} from "@reduxjs/toolkit";





const initialState={
    review:false
   

}


const uiSlice=createSlice({
    name:"ui",
    initialState:initialState

    ,
    reducers:{
        
        showReviewForm(state,actiom){

            state.review=true;

        },
        hideReviewForm(state,actiom){

            state.review=false;

        }
         
        

        
       
    }

})


export const {showReviewForm,hideReviewForm}=uiSlice.actions;
export default uiSlice.reducer;




