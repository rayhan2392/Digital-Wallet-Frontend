import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './routes/index.tsx'
import { ThemeProvider } from './provider/theme-provider.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './redux/store.ts'
import { ErrorBoundary } from './components/common/ErrorBoundary.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ReduxProvider store={store}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
          <Toaster
            richColors
            position="top-right"
            expand={true}
            toastOptions={{
              duration: 3000,
              classNames: {
                error: 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100',
                success: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100',
                warning: 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-100',
                info: 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100',
              },
            }}
          />
        </ThemeProvider>
      </ReduxProvider>
    </ErrorBoundary>
  </StrictMode>,
)
