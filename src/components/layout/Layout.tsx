import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { ScrollManager } from './ScrollManager'

/** Shared chrome for every route: skip link, header, page content, footer. */
export function Layout() {
  return (
    <div className="bg-night-950 flex min-h-dvh flex-col">
      <ScrollManager />
      <a
        href="#main-content"
        className="bg-glow-400 text-night-950 focus:ring-glow-200 sr-only rounded-full px-5 py-3 text-sm font-semibold focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60]"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
