const STORAGE_KEY = 'maxfrio-cookie-consent-v1';
const COOKIE_NAME = 'maxfrio_consent';
const CONSENT_EVENT = 'maxfrio:cookie-consent-change';
const OPEN_EVENT = 'maxfrio:cookie-banner-open';

function writeConsentCookie(choice) {
  try {
    const maxAge = 60 * 60 * 24 * 180;
    document.cookie = `${COOKIE_NAME}=${choice}; path=/; max-age=${maxAge}; SameSite=Lax`;
  } catch {
    // Ignora ambientes sem suporte a document.cookie
  }
}

export function readCookieConsent() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.choice !== 'all' && parsed.choice !== 'essential' && parsed.choice !== 'rejected') {
      return null;
    }
    return {
      choice: parsed.choice,
      essential: true,
      preferences: Boolean(parsed.preferences),
      analytics: Boolean(parsed.analytics),
      updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function saveCookieConsent(choice) {
  const consent = {
    choice,
    essential: true,
    preferences: choice === 'all',
    analytics: choice === 'all',
    updatedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // Ignora falhas de armazenamento local
  }
  writeConsentCookie(choice);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: consent }));
  return consent;
}

export function openCookiePreferences() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

export function subscribeCookieConsent(listener) {
  const handler = (event) => {
    listener(event.detail ?? readCookieConsent());
  };
  window.addEventListener(CONSENT_EVENT, handler);
  return () => window.removeEventListener(CONSENT_EVENT, handler);
}

export function subscribeOpenCookiePreferences(listener) {
  window.addEventListener(OPEN_EVENT, listener);
  return () => window.removeEventListener(OPEN_EVENT, listener);
}
