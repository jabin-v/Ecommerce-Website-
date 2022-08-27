
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';



const PRODUCTS_COUNT = 4;
const BASE_URL = 'http://localhost:3500/api/products/search';

const getRandomIndex = (max, min = 0) => {
    return Math.floor(Math.random() * (max - min) + min);
};

const getRandomProducts = (randomIndex, data) => {
    let i = randomIndex;
    const products = [];

    for (let index = 0; index < PRODUCTS_COUNT; index++) {
        products.push(data[i]);
        i++;
    }

    return products;
};


const useGetRecommendedProducts = product => {
    const [products, setProducts] = useState([]);

    const getRecommendedProducts = useCallback(() => {
        setProducts([]);
        const categoryId = product.category._id;
     

        axios
            .get(`${BASE_URL}`, {
                params: {
                    category:categoryId
                },
            })
            .then(response => {
                const  data  = response.data.data;

                
                

                if (data.length > PRODUCTS_COUNT) {
                    const index = getRandomIndex(data.length - PRODUCTS_COUNT);
                    const randomProducts = getRandomProducts(index, data);

                    setProducts(randomProducts);
                    return;
                }

                setProducts(data);
            });
    }, [product]);

    useEffect(() => {
        if (!product) return;
        getRecommendedProducts();
    }, [product, getRecommendedProducts]);

    return products;
};

export default useGetRecommendedProducts;