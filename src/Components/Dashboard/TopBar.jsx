import axios from 'axios';
import React from 'react'
import { IoMenuOutline } from "react-icons/io5";
import Cookies from 'cookie-universal'
import { useNavigate } from 'react-router-dom';
import './Style/Style-bar.css'
const TopBar = () => {
  const cookie = Cookies()
  const navigate = useNavigate()
  const logout = async () => {
   try{
    await axios.get("https://medical-clinic.serv00.net/api/logout" ,{
      headers : {
        Authorization : "Bearer " + cookie.get("token-task")
      }
    }).then(
      () => navigate("/")
    )
    cookie.remove("token-task")
   }catch(err){
    console.log(err)
   }

  }
  return (
    <div className='top-bar'>
        <div className='top-bar-header'>
            <h3>لوحة التحكم </h3>
            <IoMenuOutline />
        </div>

        <button className='logout' onClick={logout}>logout</button>
    </div>
  )
}

export default TopBar