/* global React, ReactDOM, TxV2 */
(function () {
  const { useEffect, useState } = React;
  const h = React.createElement;
  const PAGE_BUNDLES = {
    HomePage: '/v2/home.js',
    ProductsPage: '/v2/home.js',
    ProductPage: '/v2/home.js',
    ReferenceRoutePage: '/v2/pages.js',
    PricingPage: '/v2/pricing.js',
    PaywallPage: '/v2/pricing.js',
    DocsPage: '/v2/pages.js',
    CommunityPage: '/v2/pages.js',
    CompanyPage: '/v2/pages.js',
    AllFeaturesPage: '/v2/pages.js',
    TechnologyPage: '/v2/pages.js',
    StartupsPage: '/v2/pages.js',
    SigninPage: '/v2/auth.js',
    SignupPage: '/v2/auth.js',
    ResetPasswordPage: '/v2/auth.js',
    DemoPage: '/v2/auth.js',
  };
  const loads = Object.create(null);
  function loadBundle(url) {
    if (loads[url]) return loads[url];
    loads[url] = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = url; s.async = true; s.onload = resolve; s.onerror = () => reject(new Error(url));
      document.head.appendChild(s);
    });
    return loads[url];
  }
  function findRoute(path) {
    let p = path.replace(/^\/v2(\/|$)/, '/') || '/';
    if (p !== '/') p = p.replace(/\/+$/, '');
    return TxV2.ROUTES.find((r) => r.path === p) || null;
  }
  function NotFound() {
    return h('section', { className: 'section' }, h('div', { className: 'container', style: { textAlign: 'center', padding: '120px 20px' } },
      h('div', { style: { fontFamily: 'var(--font-display)', fontSize: 96, fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1 } }, '404'),
      h('h2', { className: 'h-section mt-4' }, 'This page does not exist'),
      h('a', { 'data-spa': true, href: '/', className: 'btn btn-primary' }, 'Back to home')
    ));
  }
  function App() {
    const [path, setPath] = useState(window.location.pathname || '/');
    const [Page, setPage] = useState(() => null);
    useEffect(() => {
      const onPop = () => setPath(window.location.pathname || '/');
      window.addEventListener('popstate', onPop);
      return () => window.removeEventListener('popstate', onPop);
    }, []);
    useEffect(() => {
      const route = findRoute(path);
      document.title = route ? `Txlemetry - ${route.title}` : 'Txlemetry - Page not found';
      if (!route) { setPage(() => NotFound); return; }
      const existing = window[route.component];
      if (existing) { setPage(() => existing); return; }
      let cancelled = false;
      loadBundle(PAGE_BUNDLES[route.component]).then(() => {
        if (!cancelled) setPage(() => window[route.component] || NotFound);
      }).catch(() => { if (!cancelled) setPage(() => NotFound); });
      return () => { cancelled = true; };
    }, [path]);
    return h(TxV2.AppShell, null, Page ? h(Page, { path }) : null);
  }
  ReactDOM.createRoot(document.getElementById('root')).render(h(App));
})();
