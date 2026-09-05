
import { createBrowserRouter } from 'react-router'
import LoginScreen from './auth/login.screen'
import App from './App'
import DashboardScreen from './dashboard/dashboard.screen'
import TenantScreen from './tenant/tenant.screen'
import SubscriptionScreen from './subscription/subscription.screen'
import UserScreen from './user/user.screen'
import RoleScreen from './role/role.screen'
import ClientScreen from './client/client.screen'
import ProspectionScreen from './prospection/prospection.screen'
import OfferScreen from './offer/offer.screen'
import ProjectScreen from './project/project.screen'
import NotificationScreen from './notification/notification.screen'
import ErrorScreen from './shared/ErrorScreen'

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <LoginScreen />
    },
    {
        element: <App />,
        children: [
            {
                path: '/dashboard',
                element: <DashboardScreen />
            },
            {
                path: 'tenants',
                element: <TenantScreen />
            },
            {
                path: 'subscriptions',
                element: <SubscriptionScreen />
            },
            {
                path: 'users',
                element: <UserScreen />
            },
            {
                path: 'roles',
                element: <RoleScreen />
            },
            {
                path: 'clients',
                element: <ClientScreen />
            },
            {
                path: 'prospections',
                element: <ProspectionScreen />
            },
            {
                path: 'offers',
                element: <OfferScreen />
            },
            {
                path: 'projects',
                element: <ProjectScreen />
            },
            {
                path: 'notifications',
                element: <NotificationScreen />
            }
        ]
    }
])