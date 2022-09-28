import React, { useEffect, useState } from "react";
import UseAxios from "../../hooks/useAxios";
import axios from "../../apis/propertyList";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { category } from "../../features/filter/filterSlice";

const Category = ({ categories }) => {
  const [selectedCats, setSelectedCats] = useState([]);

  const dispatch = useDispatch();
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const linearList = createCategoryList(categories);

  useEffect(() => {
    dispatch(category(selectedCats));
  }, [selectedCats]);

  const handleCategoryChange = (e) => {
    const index = selectedCats.indexOf(e.target.value);
    if (index === -1) {
      setSelectedCats([...selectedCats, e.target.value]);
    } else {
      setSelectedCats(selectedCats.filter((cat) => cat !== e.target.value));
    }
  };

  return (
    <div>
      <FormControl>
        <FormGroup>
          {linearList.map((category) => (
            <FormControlLabel
              style={{ display: category.parentId === undefined ? "none" : "" }}
              key={category.value}
              label={category.name}
              control={
                <Checkbox
                  value={category.value}
                  checked={selectedCats.includes(category.value)}
                  onChange={handleCategoryChange}
                />
              }
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default Category;
