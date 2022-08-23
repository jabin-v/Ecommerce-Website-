import React, { useEffect, useState } from "react";
import UseAxios from "../../hooks/useAxios";
import axios from "../../apis/propertyList";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { brand } from "../../features/filter/filterSlice";

const Brand = () => {
  const [brands, setBrands] = useState([]);
  const [property, error, isLoading] = UseAxios({
    axiosInstance: axios,
    method: "GET",
    url: "/stats-overall/brand",
    requestConfig: {},
  });



  const dispatch = useDispatch();

  const handleBrandChange = (e) => {
    const index = brands.indexOf(e.target.value);
    if (index === -1) {
      setBrands([...brands, e.target.value]);
    } else {
      setBrands(brands.filter((brand) => brand !== e.target.value));
    }
  };

  useEffect(() => {
    dispatch(brand(brands));
  }, [brands]);

  return (
    <div>
      <FormControl>
        <FormGroup>
          {property.stats?.map((brand) => (
            <FormControlLabel
              key={brand._id}
              label={brand._id}
              control={
                <Checkbox
                  value={brand._id}
                  checked={brands.includes(brand._id)}
                  onChange={handleBrandChange}
                />
              }
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default Brand;
