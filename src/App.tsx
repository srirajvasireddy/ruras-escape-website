import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Analytics } from './components/analytics/Analytics'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'

/**
 * Secondary pages are code-split so the landing page ships the smallest possible
 * bundle. New routes (/news, /press, /updates, ...) can be added the same way:
 * create the page under src/pages, lazy-import it here and add a <Route>.
 */
const PrivacyPolicyPage = lazy(() =>
  import('./pages/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage })),
)
const TermsPage = lazy(() => import('./pages/TermsPage').then((m) => ({ default: m.TermsPage })))
const SupportPage = lazy(() =>
  import('./pages/SupportPage').then((m) => ({ default: m.SupportPage })),
)
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
)

function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-5" role="status">
      <span className="text-mist-400 text-sm tracking-[0.2em] uppercase">Loading&hellip;</span>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="privacy-policy"
            element={
              <Suspense fallback={<RouteFallback />}>
                <PrivacyPolicyPage />
              </Suspense>
            }
          />
          <Route
            path="terms"
            element={
              <Suspense fallback={<RouteFallback />}>
                <TermsPage />
              </Suspense>
            }
          />
          <Route
            path="support"
            element={
              <Suspense fallback={<RouteFallback />}>
                <SupportPage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<RouteFallback />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
      <Analytics />
    </BrowserRouter>
  )
}
