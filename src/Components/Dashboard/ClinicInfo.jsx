import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cookies from 'cookie-universal'
import Clinic from './Clinic'
import { toast, ToastContainer } from 'react-toastify'

const ClinicInfo = () => {
    const cookie = Cookies()
    const [clinic ,setClinic] = useState({
      name:'',
      address:'',
      city:'',
      color:'',
      logo:'',
      url_name:''
    })

  const getClinicInfo = async () =>{

    try{
      const res = await axios.get("https://medical-clinic.serv00.net/api/clinic/3" , {
        headers : {
          Authorization : "Bearer " + cookie.get("token-task")
        }
      })
      setClinic({
        name:res.data.data.name,
        address:res.data.data.address,
        city:res.data.data.city_id.name,
        color:res.data.data.color,
        logo:res.data.data.logo,
        url_name:res.data.data.url_name
      })
    }
    catch(error){
      if(error.status === 403){
        toast.error("عذرا ليس لديك الصلاحيات  الكافية");
  
        }
    }
   
  }
  useEffect( () => {
    getClinicInfo()
  },[])
  console.log(clinic)
  return (
    <div>
        <Clinic 
        name={clinic.name}
        address={clinic.address}
        city={clinic.city}
        color={clinic.color}
        logo={clinic.logo}
        url_name={clinic.url_name}/>
        <ToastContainer />
    </div>
  
  )
}

export default ClinicInfo