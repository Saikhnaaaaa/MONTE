import React from 'react'
import UserMenu from '../component/UserMenu'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Dashboard = () => {

    
    const user = useSelector(state => state.user)
    console.log(user, "user dashboard")


  return (
   <section className='bg-white'>
        <div className='container mx-auto p-3 grid lg:grid-cols-[250px,1fr] gap-3'>
            

            {/* left for menu */}
                <div className='py-4 sticky top-24 overflow-y-auto hidden lg:block'>
                    <UserMenu />
                </div>

            {/* right for content */}
                <div className='bg-white rounded-lg min-h-[78vh]  '>
                    <Outlet />
                </div>
            
        </div>
   </section>
  )
}

export default Dashboard