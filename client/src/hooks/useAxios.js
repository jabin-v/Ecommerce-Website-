import { useState,useEffect } from "react";


const UseAxios=(configObj)=>{

    const {axiosInstance,method,url,requestConfig={}}=configObj;

   

    const [response,setResponse]=useState([]);
    const [error,setError]=useState("");
    const [isLoading,setIsLoading]=useState(true);

    useEffect(()=>{

        const controller=new AbortController();

        const fetchData=async()=>{
            try {
                const res=await axiosInstance[method.toLowerCase()](url,{
                    ...requestConfig,
                    signal:controller.signal
                })

                
                setResponse(res.data.data)
                
            } catch (error) {

                console.log(error);

                
                
            }finally{

                setIsLoading(false)

            }
        }

        fetchData();

        return ()=>controller.abort();


    },[])


   



    return[response,error,isLoading]

}


export default UseAxios;