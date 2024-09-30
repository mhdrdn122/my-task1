import React from 'react'
import './Style/Style-bar.css'
import { NavLink } from 'react-router-dom'
const SideBar = () => {
  return (
    <div className='side-bar'>
        <NavLink to={`/dashboard/create-clinic`} className="side-bar-link">
            انشاء عيادة
        </NavLink>
        <NavLink to={`/dashboard/add-admin`} className="side-bar-link">
            اضافة مشرف
        </NavLink>
        <NavLink to={`/dashboard/clinic-info`} className="side-bar-link">
             العيادات
        </NavLink>
        
    </div>
  )
}

export default SideBar