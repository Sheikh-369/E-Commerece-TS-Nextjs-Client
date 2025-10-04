import React from 'react'
import UserDashboard from './dashboard'

function CustomerDashboardLayout({children}:Readonly<{children:React.ReactNode}>) {
  return (
    <>
    <UserDashboard>
        {children}
    </UserDashboard> 
    </>
  )
}

export default CustomerDashboardLayout
