import axios from "axios";
import {useSelector} from "react-redux";
import { selectCurrentToken } from "../../features/auth/authSlice";


// create-checkout-session




const Paybutton = ({cartItems}) => {
    const token=useSelector(selectCurrentToken);
    const user=useSelector((state)=>state.auth.user);

    const handleCheckout=async()=>{

        console.log(token);
        console.log(user)

        

   try {
    const BASE_URL="http://localhost:3500/api/stripe";
    const response= await axios.post(`${BASE_URL}/create-checkout-session`,{
        cartItems
       
    },{
        headers: {
            Authorization: `Bearer ${token}`,
          }
    })


    console.log(response)

    if(response.data.url){
        window.location.href=response.data.url
    }
    
   } catch (error) {

    console.log(error.message)
    
   }


    }
  return (
   <>
   <button onClick={handleCheckout}>Check out </button>
   </>
  )
}

export default Paybutton
