import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import VehiclePage from "./pages/VehiclePage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

/**
 * On navigation: scroll to the hash target when there is one, otherwise to
 * the top; and move focus to the main region on page (pathname) changes so
 * screen readers hear the new page. Skipped on initial load.
 */
function NavigationEffects() {
  const { pathname, search, hash } = useLocation();
  const firstRender = useRef(true);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        requestAnimationFrame(() => target.scrollIntoView());
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, search, hash]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (prevPathname.current !== pathname && !hash) {
      document.getElementById("main")?.focus({ preventScroll: true });
    }
    prevPathname.current = pathname;
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <NavigationEffects />
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/vehicle/:id" element={<VehiclePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
