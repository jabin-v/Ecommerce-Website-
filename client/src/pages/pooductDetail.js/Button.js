import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectSmall({colors,handleChange,selectedColor}) {
  

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Color</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={selectedColor}
        label="color"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {
            colors.map((item)=>  <MenuItem key={item} value={item}>{item}</MenuItem>)

        }
       
       
      </Select>
    </FormControl>
  );
}