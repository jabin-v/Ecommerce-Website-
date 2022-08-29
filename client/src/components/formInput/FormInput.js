import React, { useState } from 'react'
import './forminput.css'

const FormInput = (props) => {

    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, id, ...inputProps } = props;

    const handleFocus = (e) => {
        setFocused(true);
      };
    //   const BASE_URL="http://localhost:3500/api/stripe";
    //   const response= await axios.post(`${BASE_URL}/create-checkout-session`,{
    //       cartItems
         
    //   },{
    //       headers: {
    //           Authorization: `Bearer ${token}`,
    //         }
    //   })

    










    
  return (
    <div className='formInput'>
        {/* <label>Name</label> */}
        <div className='username'>
            <input
             {...inputProps}
             onChange={onChange}
             onBlur={handleFocus}
             focused={focused.toString()}
            
            />
             

     </div>
     <span className='formerror'>{errorMessage}</span>
     
        
    </div>
  )
}

export default FormInput


