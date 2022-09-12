import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_BASEURL}/products`;




const useGetProduct = () => {
      const path=useLocation().pathname.split("/")[2];
    const [singleProduct, setSingleProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getSingleProduct = useCallback(() => {
        setIsLoading(true);
        axios.get(`${BASE_URL}/${path}`).then(response => {
            
            setSingleProduct(response.data.data);
        });
    }, [path]);

    useEffect(() => {
        getSingleProduct();
    }, [path, getSingleProduct]);

    useEffect(() => {
        setIsLoading(false);
    }, [singleProduct]);

    return {
        isLoading,
        singleProduct,
    };
};

export default useGetProduct;