import React from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import Authorized from '@/components/Authorized'

const program = () => {
  return (
    <DashboardLayout>
      <Authorized/>
    </DashboardLayout>
  )
}

export default program