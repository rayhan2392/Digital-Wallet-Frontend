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
            toastOptions={{
              duration: 2000,
              style: {
                background: 'var(--card)',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
              },
            }}
          />
        </ThemeProvider>
      </ReduxProvider>
    </ErrorBoundary>
  </StrictMode>,
)
