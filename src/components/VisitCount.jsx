import { useEffect, useState } from 'react';
import analytics from '../config/analytics.json';

// Loads GoatCounter (records the visit) and shows the site's total visits.
// Set goatcounterCode in config/analytics.json to enable; empty = disabled.
export default function VisitCount() {
  const code = analytics.goatcounterCode;
  const [count, setCount] = useState(null);

  useEffect(() => {
    if (!code) return;
    const base = `https://${code}.goatcounter.com`;
    if (!document.querySelector('script[data-goatcounter]')) {
      const s = document.createElement('script');
      s.async = true;
      s.src = 'https://gc.zgo.at/count.js';
      s.dataset.goatcounter = `${base}/count`;
      document.body.appendChild(s);
    }
    fetch(`${base}/counter/TOTAL.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setCount(d.count))
      .catch(() => {});
  }, [code]);

  if (!count) return null;
  return <span className="visit-count">👁 {count} {analytics.visitsLabel}</span>;
}
