import React, { useEffect, useState } from 'react'
import { Rating } from '@mui/material'
import { Box } from '@mui/system'
import { useDispatch } from 'react-redux'
import { rating } from '../../features/filter/filterSlice'

const Ratings = () => {

  const dispatch=useDispatch();





  const [value,setValue]=useState(3.5);

  const handleChange=(e)=>{
    setValue(Number(e.target.value));
    

   
  }

  useEffect(()=>{
    const stringValue=value.toString();
    dispatch(rating(stringValue))
  },[value])



  



  return (
 <Box>
    <Rating 
    precision={0.1}
  
    value={value} 
    onChange={handleChange}/>
 </Box>
  )
}

export default Ratings