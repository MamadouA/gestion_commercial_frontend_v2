import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createDarkTheme, createLightTheme, FluentProvider, type BrandVariants, type Theme } from '@fluentui/react-components'
import { RouterProvider } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { routes } from './routes.tsx'

const myNewTheme: BrandVariants = { 
  10: "#020305",
  20: "#111723",
  30: "#16263D",
  40: "#193253",
  50: "#1B3F6A",
  60: "#1B4C82",
  70: "#18599B",
  80: "#1267B4",
  90: "#3174C2",
  100: "#4F82C8",
  110: "#6790CF",
  120: "#7D9ED5",
  130: "#92ACDC",
  140: "#A6BAE2",
  150: "#BAC9E9",
  160: "#CDD8EF"
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
