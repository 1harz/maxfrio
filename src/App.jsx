import { useEffect } from 'react';
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
import { initSite } from './js/site.js';

export default function App() {
  useEffect(() => {
    initSite();
  }, []);

  return (
    <>
      <Header />
      <main>
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
        <Coverage />
      </main>
      <QuotePopup />
      <MenuPopup />
    </>
  );
}
