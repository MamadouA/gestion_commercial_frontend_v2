import { Outlet, useNavigate } from 'react-router'
import './App.css'
import SideNav from './shared/components/SideNav'
import { Avatar, Button, tokens } from '@fluentui/react-components';
import { useAuthStore } from './auth/auth.store';
import { ArrowExitRegular } from '@fluentui/react-icons';

function App() {
  const authStore = useAuthStore();
  const navigateTo = useNavigate();

  return (
   <div className="h-screen relative overflow-hidden">
     <div className="h-14 flex items-center px-2 justify-between" style={{ backgroundColor: tokens.colorCompoundBrandBackground }}>    
        <h1 className="text-white font-extrabold text-xl">__Kinetix</h1> 

        {
          authStore.isLoggedIn && (
            <section className="flex gap-4">
              <Avatar name={authStore.user?.fullname} />
            <p className="flex flex-col">
                <span className="font-bold text-white">{authStore.user?.fullname}</span>
                <span className="text-xs text-slate-200">{authStore.user?.email}</span>
            </p>

            <Button icon={<ArrowExitRegular className="text-red-500"/>} appearance="outline" onClick={() => {
              authStore.logout();
              navigateTo('/');
            }}/>
            </section>
          )
        }
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
