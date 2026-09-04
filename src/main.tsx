import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createDarkTheme, createLightTheme, FluentProvider, webLightTheme, type BrandVariants, type Theme } from '@fluentui/react-components'
import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router'
import App from './App.tsx'
import LoginScreen from './auth/login.screen.tsx'
import DashboardScreen from './dashboard/dashboard.screen.tsx'
import OfferScreen from './offer/offer.screen.tsx'
import UserScreen from './user/user.screen.tsx'
import RoleScreen from './role/role.screen.tsx'
import ClientScreen from './client/client.screen.tsx'
import ProspectionScreen from './prospection/prospection.screen.tsx'
import ProjectScreen from './project/project.screen.tsx'
import NotificationScreen from './notification/notification.screen.tsx'
import TenantScreen from './tenant/tenant.screen.tsx'
import SubscriptionScreen from './subscription/subscription.screen.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ErrorScreen from './shared/ErrorScreen.tsx'
import { routes } from './routes.tsx'

const myNewTheme: BrandVariants = { 
  10: "#040208",
  20: "#181231",
  30: "#241A5A",
  40: "#2B217E",
  50: "#3B2E8A",
  60: "#4B3B92",
  70: "#5A499B",
  80: "#6957A4",
  90: "#7766AC",
  100: "#8574B5",
  110: "#9383BD",
  120: "#A193C6",
  130: "#AFA2CE",
  140: "#BDB2D7",
  150: "#CBC2E0",
  160: "#D9D3E8"
};

 const lightTheme: Theme = {
   ...createLightTheme(myNewTheme), 
};

 const darkTheme: Theme = {
   ...createDarkTheme(myNewTheme), 
};


 darkTheme.colorBrandForeground1 = myNewTheme[110];
 darkTheme.colorBrandForeground2 = myNewTheme[120];

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <FluentProvider theme={lightTheme}>
      <RouterProvider router={routes} />
    </FluentProvider>
    </QueryClientProvider>
  </StrictMode>,
)
