import React from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import Program from '@/components/dashboard/Program'
import { AuthAction, withAuthUser } from 'next-firebase-auth'

const program = () => {
  return (
    <DashboardLayout>
      <Program/>
    </DashboardLayout>
  )
}

export default withAuthUser({ 
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(program)