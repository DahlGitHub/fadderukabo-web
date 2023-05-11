import Layout from "@/components/layout/Layout";
import SignIn from "@/components/auth/SignIn";

import UsnIcon from "public/svg/usnicon.svg"

const Login = () => (
    <Layout>
      <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
      <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <UsnIcon className="w-8 h-8 mr-2"/>
          Universitet i Sørøst-Norge    
      </div>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Dashboard Login
              </h1>
            <SignIn/>
          </div>
      </div>
  </div>
</section>
    </Layout>
  )
  
  export default Login