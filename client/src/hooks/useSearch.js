import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../features/product/productSlice";

const BASE_URL = `${process.env.REACT_APP_BASEURL}/products/search`;

const useSearch = () => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const params = useSelector((state) => state.filter);

  const p1 = { ...params };

  if (p1.activity.in.length === 0) {
    //delete that object from object
    delete p1.activity;
  }
  if (p1.colors.in.length === 0) {
    //delete that object from object
    delete p1.colors;
  }

  const getProducts = (signal) => {
    setIsLoading(true);

    axios
      .get(`${BASE_URL}`, {
        params: p1,
        signal
        
      })
      .then(({ data }) => {
        dispatch(addProducts(data));

        setIsLoading(false);
      });
  };

  useEffect(() => {
    let abortController = new AbortController();
    getProducts(abortController.signal,);

    return () => {
      abortController.abort();
    };
  }, [params]);

  return {
    isLoading,
  };
};

export default useSearch;
