import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { cookieBannerCopy, cookiesPageCopy, termsPageCopy } from '../js/legalData.js';
import {
  readCookieConsent,
  saveCookieConsent,
  subscribeCookieConsent,
  subscribeOpenCookiePreferences,
} from '../js/cookies.js';

function ShieldSvg({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3 5 6v6c0 5 3.4 8.5 7 9 3.6-.5 7-4 7-9V6l-7-3Z" />
      <path d="m9.5 12 1.7 1.7 3.8-3.8" />
    </svg>
  );
}

function CloseSvg({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function ArrowLeftSvg({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 12H5m6-6-6 6 6 6" />
    </svg>
  );
}

function FileSvg({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </svg>
  );
}

function CheckSvg({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export function CookieBanner({ onNavigate }) {
  const [visible, setVisible] = useState(() => !readCookieConsent());

  useEffect(() => {
    const unsubConsent = subscribeCookieConsent((consent) => {
      if (consent) setVisible(false);
    });
    const unsubOpen = subscribeOpenCookiePreferences(() => {
      setVisible(true);
    });
    return () => {
      unsubConsent();
      unsubOpen();
    };
  }, []);

  if (!visible || typeof document === 'undefined') return null;

  const handleChoice = (choice) => {
    saveCookieConsent(choice);
    setVisible(false);
  };

  return createPortal(
    <aside className="mf-cookie-banner" role="dialog" aria-modal="false" aria-labelledby="mf-cookie-title">
      <div className="mf-cookie-row">
        <div>
          <div className="mf-cookie-head">
            <div className="mf-cookie-badge">
              <ShieldSvg size={16} />
              <h2 id="mf-cookie-title" className="mf-cookie-title">
                {cookieBannerCopy.title}
              </h2>
            </div>
            <button
              type="button"
              className="mf-cookie-close"
              aria-label={cookieBannerCopy.closeLabel}
              onClick={() => handleChoice('essential')}
            >
              <CloseSvg size={14} />
            </button>
          </div>
          <p className="mf-cookie-copy">
            {cookieBannerCopy.description}{' '}
            <a
              href="#/cookies"
              onClick={(event) => {
                event.preventDefault();
                onNavigate('cookies');
              }}
            >
              {cookieBannerCopy.readPolicy}
            </a>
            {' · '}
            <a
              href="#/termos"
              onClick={(event) => {
                event.preventDefault();
                onNavigate('terms');
              }}
            >
              {cookieBannerCopy.termsLink}
            </a>
          </p>
        </div>
        <div className="mf-cookie-actions">
          <button type="button" className="mf-cookie-btn mf-cookie-btn-ghost" onClick={() => handleChoice('rejected')}>
            {cookieBannerCopy.reject}
          </button>
          <button type="button" className="mf-cookie-btn mf-cookie-btn-secondary" onClick={() => handleChoice('essential')}>
            {cookieBannerCopy.acceptEssential}
          </button>
          <button type="button" className="mf-cookie-btn mf-cookie-btn-primary" onClick={() => handleChoice('all')}>
            {cookieBannerCopy.acceptAll}
          </button>
        </div>
      </div>
    </aside>,
    document.body,
  );
}

export function LegalPage({ page, onNavigate }) {
  const [consent, setConsent] = useState(() => readCookieConsent());

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    return subscribeCookieConsent(setConsent);
  }, [page]);

  const handleChoice = (choice) => {
    setConsent(saveCookieConsent(choice));
  };

  if (page === 'cookies') {
    const statusText = consent ? cookiesPageCopy.statusLabels[consent.choice] : cookiesPageCopy.statusLabels.none;

    return (
      <section className="mf-legal-page bg-light">
        <div className="container mf-legal-shell">
          <div className="mf-legal-topbar">
            <a
              href="#inicio"
              className="mf-legal-link"
              onClick={(event) => {
                event.preventDefault();
                onNavigate('home');
              }}
            >
              <ArrowLeftSvg />
              <span>{cookiesPageCopy.backLabel}</span>
            </a>
            <a
              href="#/termos"
              className="mf-legal-link"
              onClick={(event) => {
                event.preventDefault();
                onNavigate('terms');
              }}
            >
              <FileSvg />
              <span>{cookiesPageCopy.termsLabel}</span>
            </a>
          </div>

          <header className="mf-legal-header">
            <p className="l1 mf-legal-eyebrow">{cookiesPageCopy.eyebrow}</p>
            <h1>{cookiesPageCopy.title}</h1>
            <p className="mf-legal-intro">{cookiesPageCopy.intro}</p>
            <p className="mf-legal-meta">{cookiesPageCopy.updated}</p>
          </header>

          <div className="mf-legal-consent-box">
            <div className="mf-legal-consent-head">
              <div className="mf-legal-consent-icon">
                <ShieldSvg size={18} />
              </div>
              <div>
                <h2>{cookiesPageCopy.statusTitle}</h2>
                <p>{statusText}</p>
              </div>
            </div>
            <div className="mf-legal-consent-actions">
              <button
                type="button"
                className={`mf-legal-choice-btn ${consent?.choice === 'all' ? 'is-active' : ''}`}
                onClick={() => handleChoice('all')}
              >
                {consent?.choice === 'all' && <CheckSvg />}
                <span>{cookieBannerCopy.acceptAll}</span>
              </button>
              <button
                type="button"
                className={`mf-legal-choice-btn ${consent?.choice === 'essential' ? 'is-active' : ''}`}
                onClick={() => handleChoice('essential')}
              >
                {consent?.choice === 'essential' && <CheckSvg />}
                <span>{cookieBannerCopy.acceptEssential}</span>
              </button>
              <button
                type="button"
                className={`mf-legal-choice-btn ${consent?.choice === 'rejected' ? 'is-active' : ''}`}
                onClick={() => handleChoice('rejected')}
              >
                {consent?.choice === 'rejected' && <CheckSvg />}
                <span>{cookieBannerCopy.reject}</span>
              </button>
            </div>
          </div>

          <div className="mf-legal-categories">
            {cookiesPageCopy.categories.map((category) => (
              <article key={category.name} className="mf-legal-card">
                <div className="mf-legal-card-head">
                  <h3>{category.name}</h3>
                  <span>{category.status}</span>
                </div>
                <p>{category.description}</p>
              </article>
            ))}
          </div>

          <div className="mf-legal-block">
            <h2>{cookiesPageCopy.inventoryTitle}</h2>
            <div className="mf-legal-table-wrap">
              <table className="mf-legal-table">
                <thead>
                  <tr>
                    {cookiesPageCopy.inventoryColumns.map((column) => (
                      <th key={column} scope="col">{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cookiesPageCopy.inventory.map((item) => (
                    <tr key={item.name}>
                      <td><code>{item.name}</code></td>
                      <td>{item.category}</td>
                      <td>{item.purpose}</td>
                      <td>{item.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mf-legal-sections">
            {cookiesPageCopy.sections.map((section) => (
              <article key={section.title} className="mf-legal-block">
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mf-legal-page bg-light">
      <div className="container mf-legal-shell">
        <div className="mf-legal-topbar">
          <a
            href="#inicio"
            className="mf-legal-link"
            onClick={(event) => {
              event.preventDefault();
              onNavigate('home');
            }}
          >
            <ArrowLeftSvg />
            <span>{termsPageCopy.backLabel}</span>
          </a>
          <a
            href="#/cookies"
            className="mf-legal-link"
            onClick={(event) => {
              event.preventDefault();
              onNavigate('cookies');
            }}
          >
            <ShieldSvg size={15} />
            <span>{termsPageCopy.cookiesLabel}</span>
          </a>
        </div>

        <header className="mf-legal-header">
          <p className="l1 mf-legal-eyebrow">{termsPageCopy.eyebrow}</p>
          <h1>{termsPageCopy.title}</h1>
          <p className="mf-legal-intro">{termsPageCopy.intro}</p>
          <p className="mf-legal-meta">{termsPageCopy.updated}</p>
        </header>

        <div className="mf-legal-sections">
          {termsPageCopy.sections.map((section) => (
            <article key={section.title} className="mf-legal-block">
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
