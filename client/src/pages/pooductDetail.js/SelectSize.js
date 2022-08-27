import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectSize({sizes,selectedsize,setSelectedSize}) {


  const handleChangeSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Size</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={selectedsize}
        label="Age"
        onChange={handleChangeSizeChange}
      >
        <MenuItem value="" >
          <em>None</em>
        </MenuItem>
        {
            sizes.map((size)=> <MenuItem key={size} value={size}>{size}</MenuItem>)
        }
       
      </Select>
    </FormControl>
  );
}