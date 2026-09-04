import { Outlet } from 'react-router'
import './App.css'
import SideNav from './shared/components/SideNav'
import { useState } from 'react';
import { tokens } from '@fluentui/react-components';

function App() {
  return (
   <div className="h-screen relative overflow-hidden">
     <div className='h-14 flex items-center px-2' style={{ backgroundColor: tokens.colorCompoundBrandBackground }}>    
        <h1 className="text-white font-extrabold text-xl">__Kinetix</h1> 
      </div>
      
      <div className='flex grow h-full'>
        <SideNav />
        <div className='p-1 w-full h-[93vh]'>
          <Outlet />
        </div>
      </div>
   </div>
  )
}

export default App
