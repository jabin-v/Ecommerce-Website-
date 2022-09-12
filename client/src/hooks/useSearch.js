import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../features/product/productSlice";


const BASE_URL =`${process.env.REACT_APP_BASEURL}/products/search`


const useSearch = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products,setProducts]=useState([]);

  const dispatch = useDispatch();

  const params = useSelector((state) => state.filter);

  const p1={...params};

if(p1.activity.in.length === 0){
  //delete that object from object
  delete(p1.activity)
}
if(p1.colors.in.length === 0){
  //delete that object from object
  delete(p1.colors)
}
  




  const getProducts = () => {
   
    setIsLoading(true);

    axios
      .get(`${BASE_URL}`, {
        params:p1,
      })
      .then(({ data }) => {
        

        setProducts(data.data)
        

        dispatch(addProducts(data.data))

        setIsLoading(false);
      });
  };

  useEffect(() => {
    getProducts();
  }, [params]);

  return {
    isLoading,products
  };
};

export default useSearch;
