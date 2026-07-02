/* global React */
(function () {
  const { useEffect, useState } = React;
  const h = React.createElement;

  const PRODUCTS = [
    { slug: '/product-analytics', name: 'Product Analytics', family: 'Analyze', desc: 'Funnels, trends, retention, paths, cohorts, autocapture, and retroactive event definitions.', free: '1M events/mo', price: 'from $0.00005/event', source: 'posthog.com/product-analytics', specs: ['Trends, funnels, retention, paths, lifecycle, stickiness, and user cohorts', 'Autocapture for clicks and pageviews with actions defined retroactively', 'Breakdowns by person, group, event property, cohort, and feature usage'], useCases: ['Find onboarding drop-offs', 'Measure activation and retention', 'Track feature adoption'], pairs: ['Session Replay', 'Feature Flags', 'Experiments', 'Data Stack'] },
    { slug: '/web-analytics', name: 'Web Analytics', family: 'Analyze', desc: 'Traffic, pages, referrers, sessions, UTMs, and privacy-friendly web measurement.', free: 'included with events', price: 'usage-based events', source: 'posthog.com/web-analytics', specs: ['Website traffic, top pages, bounce, sessions, referrers, and UTM reporting', 'Privacy-friendly measurement with no-cookie configuration options', 'Connect traffic spikes to users, product events, and replay'], useCases: ['Replace generic analytics', 'Understand acquisition', 'Connect marketing to product'], pairs: ['Product Analytics', 'Session Replay', 'Surveys'] },
    { slug: '/session-replay', name: 'Session Replay', family: 'Observe', desc: 'Recordings connected to events so teams can see where users clicked, struggled, and broke.', free: '5K recordings/mo', price: 'from $0.005/recording', source: 'posthog.com/session-replay', specs: ['Watch user sessions with clicks, navigation, console context, and linked events', 'Filter recordings by person, event, page, cohort, frustration, and error context', 'Jump from analytics charts directly into the recording behind a datapoint'], useCases: ['Debug broken journeys', 'Watch conversion friction', 'Build UX empathy'], pairs: ['Product Analytics', 'Error Tracking', 'Surveys'] },
    { slug: '/feature-flags', name: 'Feature Flags', family: 'Ship', desc: 'Targeted rollouts, cohorts, local evaluation, bootstrapping, and instant rollback.', free: '1M requests/mo', price: 'from $0.0001/request', source: 'posthog.com/feature-flags', specs: ['Boolean, multivariate, and payload flags with cohort targeting', 'Gradual rollouts, user/group targeting, local evaluation, and bootstrapping', 'Measure flag impact through analytics, experiments, and error context'], useCases: ['Release safely', 'Run betas', 'Rollback instantly'], pairs: ['Experiments', 'Product Analytics', 'Error Tracking'] },
    { slug: '/experiments', name: 'Experiments', family: 'Ship', desc: 'A/B testing on funnels, events, revenue, ratios, and guardrail metrics.', free: 'billed with flags', price: 'feature flag usage', source: 'posthog.com/experiments', specs: ['A/B and multivariate experiments powered by feature flags', 'Measure funnels, events, revenue, ratios, and secondary guardrail metrics', 'Bayesian and frequentist evaluation with product analytics context'], useCases: ['Validate hypotheses', 'Test onboarding', 'Measure revenue impact'], pairs: ['Feature Flags', 'Product Analytics', 'Data Stack'] },
    { slug: '/surveys', name: 'Surveys', family: 'Listen', desc: 'In-product surveys, API-controlled UI, NPS, PMF, and feedback tied to user behavior.', free: '1.5K responses/mo', price: 'from $0.10/response', source: 'posthog.com/surveys', specs: ['No-code in-product surveys, custom API rendering, NPS, PMF, rating, and open text', 'Target by cohort, URL, behavior, or product state', 'Analyze responses with person profiles, replay, and product events'], useCases: ['Ask why users churn', 'Collect PMF feedback', 'Trigger contextual research'], pairs: ['Session Replay', 'Product Analytics', 'Inbox'] },
    { slug: '/error-tracking', name: 'Error Tracking', family: 'Observe', desc: 'Exceptions, impacted users, stack traces, replays, and product impact analysis.', free: '100K exceptions/mo', price: 'from $0.00037/exception', source: 'posthog.com/error-tracking', specs: ['Exception capture with stack traces, grouping, status, and affected users', 'Replay the broken session and quantify impact on funnels or retention', 'Connect errors to releases, flags, cohorts, and product behavior'], useCases: ['Prioritize bugs by impact', 'Replay failure moments', 'Rollback bad releases'], pairs: ['Session Replay', 'Feature Flags', 'Logs'] },
    { slug: '/data-stack', name: 'Data Stack', family: 'Data', desc: 'Warehouse, SQL, BI, modeling, sources, CDP, reverse ETL, and AI over data.', free: '1M rows/mo', price: 'from $0.000015/row', source: 'posthog.com/data-stack', specs: ['Managed warehouse, sources, SQL editor, BI, modeling, and exports', 'Bring product and business data into one queryable layer', 'Use AI assistance for SQL, modeling, and product questions'], useCases: ['Unify customer data', 'Model product metrics', 'Run SQL and BI'], pairs: ['PostHog AI', 'Data Pipelines', 'Product Analytics'] },
    { slug: '/data-pipelines', name: 'Data Pipelines', family: 'Data', desc: 'Realtime destinations, batch exports, CDP-style routing, and downstream syncs.', free: '10K triggers + 1M rows/mo', price: 'from $0.0005/trigger', source: 'posthog.com/pricing', specs: ['Realtime destinations for event-triggered routing', 'Batch exports for warehouse and downstream operational systems', 'CDP-style movement without disconnecting events from analytics'], useCases: ['Send events downstream', 'Export modeled data', 'Power business tools'], pairs: ['Data Stack', 'Workflows', 'Endpoints'] },
    { slug: '/posthog-ai', name: 'PostHog AI', family: 'AI', desc: 'Natural-language questions, SQL generation, data modeling, and product analysis assistance.', free: '500 credits/mo', price: 'from $0.01/credit', source: 'posthog.com/data-stack', specs: ['Ask product questions in natural language', 'Generate SQL, explain metrics, and assist with data modeling', 'Works over connected product, warehouse, and business data'], useCases: ['Unblock non-analysts', 'Generate SQL faster', 'Explore product questions'], pairs: ['Data Stack', 'Product Analytics', 'Docs'] },
    { slug: '/ai-observability', name: 'AI Observability', family: 'AI', desc: 'LLM traces, spans, conversations, latency, cost, model performance, and AI product analytics.', free: '100K events/mo', price: 'from $0.00006/event', source: 'posthog.com/ai-observability', specs: ['Track traces, spans, conversation events, latency, tokens, and model cost', 'Analyze LLM behavior as product analytics events', 'Connect AI quality and cost to users, features, and product outcomes'], useCases: ['Debug LLM calls', 'Track AI cost', 'Improve conversation quality'], pairs: ['Product Analytics', 'Logs', 'Data Stack'] },
    { slug: '/logs', name: 'Logs', family: 'Observe', desc: 'Operational logs connected to customer impact and the surrounding product journey.', free: '50GB/mo', price: 'from $0.25/GB', source: 'posthog.com/pricing', specs: ['Ingest logs alongside events, exceptions, traces, and user context', 'Investigate operational issues with product impact', 'Keep engineering signals tied to customer behavior'], useCases: ['Investigate incidents', 'Connect logs to users', 'Debug services'], pairs: ['Error Tracking', 'AI Observability', 'Product Analytics'] },
    { slug: '/workflows', name: 'Workflows', family: 'Act', desc: 'Behavior-triggered messages, destination dispatches, lifecycle automation, and follow-up loops.', free: '10K messages/channel', price: 'from $0.003/email', source: 'posthog.com/pricing', specs: ['Trigger automations from events, cohorts, and product behavior', 'Send emails and destination dispatches after product signals', 'Close loops after surveys, activation moments, and lifecycle milestones'], useCases: ['Automate follow-up', 'Trigger lifecycle messages', 'Route product signals'], pairs: ['Data Pipelines', 'Surveys', 'Product Analytics'] },
    { slug: '/inbox', name: 'Inbox', family: 'Listen', desc: 'Feedback and work intake connected to roadmap decisions and shipped product work.', free: '3 PRs/mo', price: 'from $15/PR', source: 'posthog.com/pricing', specs: ['Collect feedback and requests into a product work surface', 'Connect requests to cohorts, surveys, roadmap items, and shipped changes', 'Keep customer signal close to engineering work'], useCases: ['Collect requests', 'Prioritize roadmap', 'Close feedback loops'], pairs: ['Surveys', 'Community', 'Workflows'] },
    { slug: '/endpoints', name: 'Endpoints', family: 'Data', desc: 'Event capture, SDKs, ingestion, routing, identity, and instrumentation foundations.', free: 'included by setup', price: 'usage varies', source: 'posthog.com/docs', specs: ['Capture events from SDKs, APIs, and product endpoints', 'Preserve identity, properties, groups, and routing context', 'Provide the instrumentation foundation for every downstream product'], useCases: ['Standardize capture', 'Route events', 'Build clean instrumentation'], pairs: ['Product Analytics', 'Data Pipelines', 'Data Stack'] },
  ];

  const ROUTES = [
    { path: '/', title: 'Home', component: 'HomePage' },
    { path: '/products', title: 'Products', component: 'ProductsPage' },
    { path: '/ai-agent', title: 'AI Agent', component: 'ReferenceRoutePage' },
    { path: '/ai-agent/slack', title: 'AI Agent for Slack', component: 'ReferenceRoutePage' },
    { path: '/copilot', title: 'Copilot', component: 'ReferenceRoutePage' },
    { path: '/agent-customer', title: 'Customer Agent', component: 'ReferenceRoutePage' },
    { path: '/agent-trust', title: 'Trust', component: 'ReferenceRoutePage' },
    { path: '/how-agent-works', title: 'How agents work', component: 'ReferenceRoutePage' },
    { path: '/omnichannel', title: 'Omnichannel', component: 'ReferenceRoutePage' },
    { path: '/how-it-works', title: 'How it works', component: 'ReferenceRoutePage' },
    { path: '/tickets', title: 'Tickets', component: 'ReferenceRoutePage' },
    { path: '/reporting', title: 'Reporting', component: 'ReferenceRoutePage' },
    { path: '/knowledge', title: 'Knowledge', component: 'ReferenceRoutePage' },
    ...PRODUCTS.map((p) => ({ path: p.slug, title: p.name, component: 'ProductPage' })),
    { path: '/pricing', title: 'Pricing', component: 'PricingPage' },
    { path: '/upgrade', title: 'Plans', component: 'PaywallPage' },
    { path: '/all-features', title: 'All features', component: 'AllFeaturesPage' },
    { path: '/technology', title: 'Technology', component: 'TechnologyPage' },
    { path: '/startups', title: 'Startups', component: 'StartupsPage' },
    { path: '/docs', title: 'Docs', component: 'DocsPage' },
    { path: '/community', title: 'Community', component: 'CommunityPage' },
    { path: '/company', title: 'Company', component: 'CompanyPage' },
    { path: '/login', title: 'Log in', component: 'SigninPage' },
    { path: '/signin', title: 'Log in', component: 'SigninPage' },
    { path: '/signup', title: 'Get started', component: 'SignupPage' },
    { path: '/reset-password', title: 'Reset password', component: 'ResetPasswordPage' },
    { path: '/demo', title: 'Book demo', component: 'DemoPage' },
  ];

  function navigate(path) {
    if (window.location.pathname === path) return;
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  function useSpaLinks() {
    useEffect(() => {
      function onClick(e) {
        const a = e.target.closest && e.target.closest('a[data-spa]');
        if (!a) return;
        const href = a.getAttribute('href');
        if (!href || href.startsWith('http') || href.startsWith('mailto:')) return;
        e.preventDefault();
        navigate(href);
      }
      document.addEventListener('click', onClick);
      return () => document.removeEventListener('click', onClick);
    }, []);
  }

  function Logo() {
    return h('a', { 'data-spa': true, href: '/', className: 'nav-logo tx-logo' },
      h('img', { src: '/assets/mark.png', alt: '' }),
      'Txlemetry'
    );
  }

  function NavDropdownProduct({ open }) {
    if (!open) return null;
    const families = ['Analyze', 'Observe', 'Ship', 'Listen', 'Data', 'AI', 'Act'];
    return h('div', { className: 'nav-dd tx-dd' },
      h('div', { className: 'nav-dd-grid' },
        h('div', { className: 'nav-dd-col' },
          h('div', { className: 'nav-dd-eyebrow' }, 'Product OS'),
          h('ul', { className: 'nav-dd-list nav-dd-list-icons' },
            families.slice(0, 4).map((fam) => h('li', { key: fam },
              h('a', { 'data-spa': true, href: '/products', className: 'nav-dd-item-icon' },
                h('span', { className: 'nav-dd-icon' }, '◇'),
                h('span', null, h('strong', null, fam), h('em', null, PRODUCTS.filter((p) => p.family === fam).map((p) => p.name).join(', ')))
              )
            ))
          )
        ),
        h('div', { className: 'nav-dd-col' },
          h('div', { className: 'nav-dd-eyebrow' }, 'Featured products'),
          h('ul', { className: 'nav-dd-list' },
            PRODUCTS.slice(0, 10).map((item) => h('li', { key: item.slug }, h('a', { 'data-spa': true, href: item.slug, className: 'nav-dd-item' }, item.name)))
          )
        )
      )
    );
  }

  function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);
    const [path, setPath] = useState(window.location.pathname || '/');
    useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 8);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }, []);
    useEffect(() => {
      const onPop = () => setPath(window.location.pathname || '/');
      window.addEventListener('popstate', onPop);
      return () => window.removeEventListener('popstate', onPop);
    }, []);
    useEffect(() => {
      const close = (e) => { if (!e.target.closest('.nav-shell')) setOpenMenu(null); };
      document.addEventListener('mousedown', close);
      return () => document.removeEventListener('mousedown', close);
    }, []);
    const isHome = (path.replace(/\/+$/, '') || '/') === '/';
    return h('header', { className: `nav-shell${isHome ? ' tx-home-nav' : ''}${scrolled ? ' is-scrolled' : ''}${openMenu ? ' has-open-menu' : ''}` },
      h('div', { className: 'nav-inner', style: { display: 'flex', alignItems: 'center', gap: 32 } },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 32, flex: '0 0 auto' } },
          h(Logo),
          h('ul', { className: 'nav-links hide-mobile', style: { display: 'flex', alignItems: 'center', gap: 28, listStyle: 'none', margin: 0, padding: 0 } },
            h('li', { className: `nav-link-wrap${openMenu === 'product' ? ' is-open' : ''}`, style: { position: 'relative' } },
              h('button', { type: 'button', className: 'nav-link nav-link-trigger', onClick: () => setOpenMenu(openMenu === 'product' ? null : 'product') }, 'Product ', h('span', { className: 'nav-caret' }, '▾')),
              h(NavDropdownProduct, { open: openMenu === 'product' })
            ),
            h('li', null, h('a', { 'data-spa': true, href: '/pricing', className: 'nav-link' }, 'Pricing')),
            h('li', null, h('a', { 'data-spa': true, href: '/docs', className: 'nav-link' }, 'Docs')),
            h('li', null, h('a', { 'data-spa': true, href: '/community', className: 'nav-link' }, 'Community')),
            h('li', null, h('a', { 'data-spa': true, href: '/company', className: 'nav-link' }, 'Company'))
          )
        ),
        h('div', { className: 'nav-actions', style: { marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 } },
          h('a', { 'data-spa': true, href: '/login', className: 'btn btn-secondary hide-mobile' }, 'Login'),
          h('a', { 'data-spa': true, href: '/signup', className: 'btn btn-primary' }, 'Get started free'),
          h('a', { 'data-spa': true, href: '/products', className: 'btn btn-secondary hide-mobile nav-cta-arrow tx-product-os-link' }, 'Product OS ', h('span', { 'aria-hidden': true }, '→'))
        )
      )
    );
  }

  function TxWordmark({ label = 'Txlemetry' }) {
    return h('section', { className: 'tx-wordmark-section' },
      h('div', { className: 'tx-wordmark-kicker' }, 'The field becomes the product'),
      h('div', { className: 'tx-wordmark' }, label)
    );
  }

  function Footer() {
    const cols = [
      ['Product', [['Product Analytics', '/product-analytics'], ['Session Replay', '/session-replay'], ['Feature Flags', '/feature-flags'], ['Experiments', '/experiments'], ['Surveys', '/surveys']]],
      ['Data', [['Data Stack', '/data-stack'], ['Pipelines', '/data-pipelines'], ['AI Observability', '/ai-observability'], ['Logs', '/logs'], ['Endpoints', '/endpoints']]],
      ['Resources', [['Docs', '/docs'], ['Community', '/community'], ['All features', '/all-features'], ['Technology', '/technology'], ['Startups', '/startups']]],
      ['Company', [['Company', '/company'], ['Pricing', '/pricing'], ['Upgrade', '/upgrade'], ['Demo', '/demo'], ['Log in', '/login']]],
    ];
    return h('footer', { className: 'footer' },
      h('div', { className: 'container' },
        h('div', { className: 'footer-grid' },
          h('div', { className: 'footer-col' }, h(Logo), h('p', { className: 'text-secondary mt-2', style: { fontSize: 14, lineHeight: 1.55, maxWidth: 280 } }, 'A PostHog-inspired Product OS for teams that want analytics, replay, releases, data, and AI observability in one place.')),
          cols.map(([title, links]) => h('div', { className: 'footer-col', key: title }, h('h5', null, title), h('ul', null, links.map((l) => h('li', { key: l[0] }, h('a', { 'data-spa': true, href: l[1] }, l[0]))))))
        ),
        h('div', { className: 'footer-bottom' }, h('span', null, `© ${new Date().getFullYear()} Txlemetry.`), h('span', null, 'AI-native product analytics'))
      )
    );
  }

  function PageShell({ children }) {
    useSpaLinks();
    useEffect(() => { window.scrollTo(0, 0); }, []);
    return h(React.Fragment, null, children, h(TxWordmark));
  }

  function AppShell({ children }) {
    return h(React.Fragment, null, h(Nav), children, h(Footer));
  }

  window.TxV2 = { h, ROUTES, PRODUCTS, navigate, PageShell, AppShell, TxWordmark };
})();
