import { useCallback, useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import RemoteControl from './components/RemoteControl.jsx';
import Intro from './components/Intro.jsx';
import TechShowcase from './components/TechShowcase.jsx';
import Products from './components/Products.jsx';
import PartsAndWarranty from './components/PartsAndWarranty.jsx';
import Benefits from './components/Benefits.jsx';
import InstallationTerms from './components/InstallationTerms.jsx';
import Clients from './components/Clients.jsx';
import DataStrip from './components/DataStrip.jsx';
import Coverage from './components/Coverage.jsx';
import QuotePopup from './components/QuotePopup.jsx';
import MenuPopup from './components/MenuPopup.jsx';
import { CookieBanner, LegalPage } from './components/Legal.jsx';
import { initSite } from './js/site.js';

function resolveRouteFromHash(hash) {
  const clean = hash.replace(/^#/, '').toLowerCase();
  if (clean === '/cookies' || clean === 'cookies') return 'cookies';
  if (clean === '/termos' || clean === 'termos') return 'terms';
  return 'home';
}

export default function App() {
  const [route, setRoute] = useState(() => resolveRouteFromHash(window.location.hash));

  useEffect(() => {
    const onHashChange = () => setRoute(resolveRouteFromHash(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (route === 'home') {
      initSite();
    }
  }, [route]);

  const navigate = useCallback((next) => {
    const nextHash = next === 'cookies' ? '#/cookies' : next === 'terms' ? '#/termos' : '#inicio';
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    }
    setRoute(next);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <>
      <Header />
      <main>
        {route === 'home' ? (
          <>
            <Hero />
            <RemoteControl />
            <Intro />
            <TechShowcase />
            <Products />
            <PartsAndWarranty />
            <Benefits />
            <InstallationTerms />
            <Clients />
            <DataStrip />
            <Coverage onNavigateLegal={navigate} />
          </>
        ) : (
          <LegalPage page={route} onNavigate={navigate} />
        )}
      </main>
      <QuotePopup />
      <MenuPopup />
      <CookieBanner onNavigate={navigate} />
    </>
  );
}
