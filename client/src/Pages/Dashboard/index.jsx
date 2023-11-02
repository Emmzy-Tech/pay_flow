import React from 'react'
import SideBar from '../../Components/SideBar/SideBar';
import App from '../../Components/demo';
import { Layout } from 'antd';
import DashboardHome from '../../Components/DashboardContent/Home/DashboardHome';

const Dasboard = () => {
  return (
    <div>
        <Layout className='h-screen'>
        <SideBar />
        <DashboardHome />
        </Layout>
        {/* <App /> */}
    </div>
  )
}

export default Dasboard;