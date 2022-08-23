import React, { useEffect, useState } from 'react'
import UseAxios from '../../hooks/useAxios';
import axios from '../../apis/propertyList'
import { Checkbox, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup } from '@mui/material';
import { useDispatch } from 'react-redux';
import { color } from '../../features/filter/filterSlice';


const Size = () => {

const [property,error,isLoading]=UseAxios({
    axiosInstance:axios,
    method:"GET",
    url:'/stats-overall/colors',
    requestConfig:{
        
    }
})

const dispatch=useDispatch();

console.log(property)

const [sizes, setSizes] = useState([]);




const  handleSizeChange=(e)=>{
  const index=sizes.indexOf(e.target.value);
  if(index === -1){
    setSizes([...sizes,e.target.value])
  }else{
    setSizes(sizes.filter(size=>size !==e.target.value))
  }

}



useEffect(()=>{
dispatch(color(sizes))
 
},[sizes])








  return (
    <div>
       <FormControl>
       <FormGroup>
        {
          property.stats?.map((size)=>
          <FormControlLabel
          key={size._id}
          label={size._id}
          control={<Checkbox value={size._id} checked={ sizes.includes(size._id)} onChange={
            handleSizeChange

          }/>}
          />
          )
        }

       </FormGroup>

       </FormControl>



        {/* <ul>
            {
                property.map((size)=><li key={size._id}>{size._id}</li>)
            }
        </ul> */}
        
    </div>
  )
}

export default Size