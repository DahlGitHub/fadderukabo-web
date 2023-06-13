import React from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { AuthAction, withAuthUser } from 'next-firebase-auth'
import StudentListPage from '@/components/studentlist/StudentListPage'


const studentlist = () => {
  return (
    <DashboardLayout>
        <StudentListPage/>
    </DashboardLayout>
  )
}

export default withAuthUser({ 
    whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  })(studentlist)