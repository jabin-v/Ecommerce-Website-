import React, { useEffect, useState } from 'react'
import UseAxios from '../../hooks/useAxios';
import axios from '../../apis/propertyList'
import { Checkbox, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup } from '@mui/material';
import { useDispatch } from 'react-redux';
import { activity } from '../../features/filter/filterSlice';


const Activity = () => {
  const [activities, setActivities] = useState([]);

const [property,error,isLoading]=UseAxios({
    axiosInstance:axios,
    method:"GET",
    url:'/stats-overall/activity',
    requestConfig:{
        
    }
})

const dispatch=useDispatch();



const  handleActivityChange=(e)=>{
  const index=activities.indexOf(e.target.value);
  if(index === -1){
    setActivities([...activities,e.target.value])
  }else{
    setActivities(activities.filter(activity=>activity !==e.target.value))
  }

}

useEffect(()=>{
dispatch(activity(activities))

},[activities])









  return (
    <div>
       <FormControl>
        <FormGroup>
         {
          property.map((activity)=>
          <FormControlLabel
          key={activity._id}
          label={activity._id}
          control={<Checkbox value={activity._id} checked={ activities.includes(activity._id)} onChange={
            handleActivityChange

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

export default Activity