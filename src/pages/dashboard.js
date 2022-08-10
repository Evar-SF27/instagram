import React from 'react'
import Header from '../components/header/header'
import TimeLine from '../components/timeline/timeline'
import Sidebar from '../components/sidebar/sidebar'
import '../styles/dashboard.css'

export default function Dashboard() {
  return (
    <>
      <Header />
      <div className='dashboard'>
        <TimeLine />
        <Sidebar />
      </div>
    </>
  )
}

