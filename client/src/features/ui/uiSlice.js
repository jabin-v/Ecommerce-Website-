import  {createSlice} from "@reduxjs/toolkit";





const initialState={
    review:false,
    chat:false
   

}


const uiSlice=createSlice({
    name:"ui",
    initialState:initialState

    ,
    reducers:{
        
        showReviewForm(state,_){

            state.review=true;

        },
        hideReviewForm(state,_){

            state.review=false;

        },
        showChat(state,actiom){

            state.chat=true;

        },
        hideChat(state,actiom){

            state.chat=false;

        }
         
        

        
       
    }

})


export const {showReviewForm,hideReviewForm,showChat,hideChat}=uiSlice.actions;
export default uiSlice.reducer;




