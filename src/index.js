import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { logEvent } from 'firebase/analytics';

import { App } from './App';

import reportWebVitals from './reportWebVitals';

import { analytics } from './firebaseConfig';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

function sendToAnalytics({ id, name, value }) {
  logEvent(analytics, 'event', {
    eventCategory: 'Web Vitals',
    eventAction: name,
    eventValue: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    eventLabel: id, // id unique to current page load
    nonInteraction: true, // avoids affecting bounce rate
  });
}

reportWebVitals(sendToAnalytics);
