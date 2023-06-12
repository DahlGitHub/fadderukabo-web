import React from 'react'
import Dashboard from '@/components/dashboard/Dashboard'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { AuthAction, withAuthUser } from 'next-firebase-auth'

const index = () => {
  return (
    <DashboardLayout>
      <Dashboard/>
    </DashboardLayout>
  )
}

export default withAuthUser({ 
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(index)