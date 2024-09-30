import React from 'react'
import TopBar from '../../Components/Dashboard/TopBar'
import SideBar from '../../Components/Dashboard/SideBar'
import { Outlet } from 'react-router-dom'
import './style.css'
const Dashboard = () => {
  return (
    <div>
        <TopBar />
        <div className='dashboard-bar-content'>
            <SideBar />
            <div className='dashboard-content'>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Dashboard