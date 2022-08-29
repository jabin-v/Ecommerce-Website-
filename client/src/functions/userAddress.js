import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import axios from "axios"
const BASE_URL = 'http://localhost:3500/api/users/address';




export const saveUserAddress=async(address)=>{
    const token=useSelector(selectCurrentToken);

    await axios.patch(`${BASE_URL}/users/address`,{
        address
    },{
        headers: {
            Authorization: `Bearer ${token}`,
          }
    })
}