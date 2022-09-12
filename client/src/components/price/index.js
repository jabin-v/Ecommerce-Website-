import {
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import React, { useEffect } from "react";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { greaterThanPrice, lessThanPrice } from "../../features/filter/filterSlice";

const Price = () => {
  const [value, setValue] = useState("");
  const dispatch=useDispatch();

  const handleChange = (e) => {
    setValue(e.target.value); 
  };

  

  useEffect(()=>{
    const rangeArray = value.split("-");

    dispatch(greaterThanPrice(rangeArray[0]))
    dispatch(lessThanPrice(rangeArray[1]))



  },[value])

 
  return (
    <div>
      <FormControl>
        <FormLabel id="price-range-selector">Select price range </FormLabel>
        <RadioGroup
          name="price-range-group"
          aria-labelledby="price-range-selector"
          value={value}
         
          onChange={handleChange}
        >
          <FormControlLabel control={<Radio />} label="none" value="0-10000000" />
          <FormControlLabel control={<Radio />} label="0-500" value="0-500" />
          
          <FormControlLabel
            control={<Radio />}
            label="1000-1500"
            value="1000-1500"
          />
          <FormControlLabel
            control={<Radio />}
            label="2000 above"
            value="2000-1000000"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default Price;
