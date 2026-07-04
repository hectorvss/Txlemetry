/* global React, TxlemetryV2 */
(function () {
  const { useState, useEffect } = React;
  const { PageShell } = TxlemetryV2;

  /* ────────────────────────────────────────────────────────────────
     Docs system (PostHog-style):
       • a category dropdown at the top of the sidebar switches product,
       • below it, that category's full table of contents (grouped),
       • the content pane renders the selected document.
     Deep-link: /docs#<category>/<doc>.  Each category can hold dozens
     of docs — the TOC is grouped into sections. Content is original.
     ──────────────────────────────────────────────────────────────── */

  const S = (h, extra) => Object.assign({ h }, extra);

  // Category list for the dropdown (grouped by area).
  const CATEGORIES = [
    { group: 'Analytics', slug: 'product-analytics', name: 'Product analytics', image: '/assets/txl/card-06.png' },
    { group: 'Analytics', slug: 'web-analytics', name: 'Web analytics', image: '/assets/txl/card-22.png' },
    { group: 'Analytics', slug: 'dashboards', name: 'Dashboards', image: '/assets/txl/card-20.png' },
    { group: 'Analytics', slug: 'revenue-analytics', name: 'Revenue analytics', image: '/assets/txl/card-13.png' },
    { group: 'Analytics', slug: 'customer-analytics', name: 'Customer analytics', image: '/assets/txl/card-08.png' },
    { group: 'Product', slug: 'session-replay', name: 'Session replay', image: '/assets/txl/card-09.png' },
    { group: 'Product', slug: 'feature-flags', name: 'Feature flags', image: '/assets/txl/card-16.png' },
    { group: 'Product', slug: 'experiments', name: 'Experiments', image: '/assets/txl/card-06.png' },
    { group: 'Product', slug: 'surveys', name: 'Surveys', image: '/assets/txl/card-10.png' },
    { group: 'Product', slug: 'error-tracking', name: 'Error tracking', image: '/assets/txl/card-14.png' },
    { group: 'Data', slug: 'data-pipelines', name: 'Data pipelines', image: '/assets/txl/card-17.png' },
    { group: 'Data', slug: 'data-warehouse', name: 'Data warehouse', image: '/assets/txl/card-21.png' },
    { group: 'Data', slug: 'sql', name: 'SQL editor', image: '/assets/txl/card-06.png' },
    { group: 'Data', slug: 'endpoints', name: 'Endpoints', image: '/assets/txl/card-19.png' },
    { group: 'AI', slug: 'txlemetry-ai', name: 'Txlemetry AI', image: '/assets/txl/card-15.png' },
    { group: 'AI', slug: 'ai-observability', name: 'AI observability', image: '/assets/txl/card-15.png' },
    { group: 'Platform', slug: 'getting-started', name: 'Getting started', image: '/assets/txl/card-25.png' },
    { group: 'Platform', slug: 'sdks', name: 'SDKs & install', image: '/assets/txl/card-19.png' },
    { group: 'Platform', slug: 'workflows', name: 'Workflows', image: '/assets/txl/card-17.png' },
    { group: 'Platform', slug: 'logs', name: 'Logs', image: '/assets/txl/card-18.png' },
    { group: 'Platform', slug: 'distributed-tracing', name: 'Distributed tracing', image: '/assets/txl/card-22.png' },
    { group: 'Platform', slug: 'support', name: 'Support', image: '/assets/txl/card-18.png' },
  ];
  const CAT = {};
  CATEGORIES.forEach((c) => { CAT[c.slug] = c; });

  // Per-category docs: `toc` groups the sidebar; `pages` holds content.
  // Product analytics is filled out as the reference depth; other categories
  // start with an overview and will be expanded to the same depth.
  const p = (blurb, sections) => ({ blurb, sections });

  const DOCS = {
    'product-analytics': {
      toc: [
        { label: 'Get started', items: [['overview', 'Overview'], ['capture-events', 'Capturing events'], ['identify-users', 'Identifying users']] },
        { label: 'Insights', items: [['trends', 'Trends'], ['funnels', 'Funnels'], ['retention', 'Retention'], ['paths', 'User paths'], ['stickiness', 'Stickiness'], ['lifecycle', 'Lifecycle'], ['sql-insights', 'SQL insights']] },
        { label: 'Organize', items: [['dashboards', 'Dashboards'], ['cohorts', 'Cohorts'], ['actions', 'Actions'], ['annotations', 'Annotations']] },
        { label: 'Reference', items: [['properties', 'Properties'], ['sampling', 'Sampling'], ['faq', 'FAQ']] },
      ],
      pages: {
        overview: p('Understand what users do with trends, funnels, retention and paths.', [
          S('What is product analytics', { p: ['Product analytics turns your event stream into answers about behavior: which features get used, where users drop off, what brings them back. Every insight is a query over the same events, so you can move from a high-level trend into the exact sessions behind it.'] }),
          S('The building blocks', { list: ['Events — actions users take.', 'Properties — attributes on events and persons.', 'Insights — saved queries (trends, funnels, retention, paths).', 'Dashboards — collections of insights.'] }),
        ]),
        'capture-events': p('Send events with autocapture, custom events or the API.', [
          S('Autocapture', { p: ['Once the snippet is installed, autocapture records front-end interactions — pageviews, clicks, form submits — with no extra code, so you can analyze behavior retroactively.'] }),
          S('Custom events', { p: ['Send events that matter to your product with the SDK, e.g. capture("subscription_started", { plan: "pro" }). Custom events work anywhere insights are built.'] }),
        ]),
        'identify-users': p('Tie events to a known user with identify.', [
          S('Overview', { p: ['Call identify(distinctId, properties) once you know who a user is (after login/signup). Txlemetry stitches their anonymous and identified activity into one person.'] }),
        ]),
        trends: p('Count and aggregate events over time with breakdowns.', [
          S('Overview', { p: ['Trends count events, unique users, or aggregate a property over time. Add breakdowns to split a series by any property, and multiple series to compare events side by side.'] }),
          S('Build a trend', { steps: ['Choose the event to measure.', 'Pick the aggregation (count, unique users, property sum/avg).', 'Add a breakdown to split the series.', 'Set the date range and interval, then save.'] }),
        ]),
        funnels: p('Measure conversion and drop-off across ordered steps.', [
          S('Overview', { p: ['Funnels measure how many users complete an ordered sequence of steps and where they drop off. Use them to find leaks in signup, activation or checkout.'] }),
          S('Build a funnel', { steps: ['Add the ordered steps (each is an event).', 'Choose the conversion window.', 'Break down by a property to compare segments.', 'Click a step to see who dropped off.'] }),
        ]),
        retention: p('See how many users return over time after a first action.', [
          S('Overview', { p: ['Retention shows how many users come back on subsequent days or weeks after a starting action, so you can measure whether the product creates lasting habits.'] }),
        ]),
        paths: p('Visualize the routes users take through your product.', [
          S('Overview', { p: ['Paths visualize the sequences of events users perform, so you can discover common journeys and unexpected detours.'] }),
        ]),
        stickiness: p('How repeatedly users engage over a period.', [ S('Overview', { p: ['Stickiness measures how many days (or intervals) users perform an action within a period — a proxy for habit strength.'] }) ]),
        lifecycle: p('New, returning, resurrecting and dormant users.', [ S('Overview', { p: ['Lifecycle breaks your active users into new, returning, resurrecting and dormant each period, so you can see growth quality at a glance.'] }) ]),
        'sql-insights': p('Drop into SQL when the visual builder is not enough.', [ S('Overview', { p: ['SQL insights let you write queries directly against your events, then save the result like any other insight.'] }) ]),
        dashboards: p('Collect insights into shareable, filterable boards.', [
          S('Overview', { p: ['Dashboards bring related insights together. Add a dashboard-level date range or filter and every tile updates at once.'] }),
          S('Create a dashboard', { steps: ['Create a dashboard or start from a template.', 'Add tiles by pinning insights.', 'Apply a dashboard filter or date override.', 'Share with your team or a public link.'] }),
        ]),
        cohorts: p('Group users by behavior or properties.', [ S('Overview', { p: ['Cohorts are reusable groups of users defined by properties or behavior (e.g. "did X in the last 7 days"). Use them to filter any insight.'] }) ]),
        actions: p('Name and reuse combinations of events.', [ S('Overview', { p: ['Actions let you name a combination of events and element selectors so you can reuse a meaningful concept (e.g. "Signed up") across insights.'] }) ]),
        annotations: p('Mark releases and events on your charts.', [ S('Overview', { p: ['Annotations add context to your charts — a release, a campaign, an incident — so a spike or dip is explainable later.'] }) ]),
        properties: p('Event and person properties.', [ S('Overview', { p: ['Properties are the attributes on events and persons. Use them for filters, breakdowns and cohort definitions.'] }) ]),
        sampling: p('Trade precision for speed on large datasets.', [ S('Overview', { p: ['Sampling computes an insight on a representative subset of events for faster results on very large datasets.'] }) ]),
        faq: p('Common questions about product analytics.', [ S('FAQ', { qa: [['Does autocapture need code?', 'No — the snippet captures interactions automatically.'], ['Can I combine events and warehouse data?', 'Yes — join them in SQL insights.']] }) ]),
      },
    },
  };

  // Categories without full docs yet get a generated single-page overview,
  // so the whole dropdown works today and content is expanded per category next.
  CATEGORIES.forEach((c) => {
    if (!DOCS[c.slug]) {
      DOCS[c.slug] = {
        toc: [{ label: 'Get started', items: [['overview', 'Overview']] }],
        pages: { overview: p(c.name + ' documentation.', [S('Overview', { p: ['Full documentation for ' + c.name + ' is being written. In the meantime, this section covers what it does and how to get started; reach out to support for anything specific.'] })]) },
      };
    }
  });

  function docKey(cat, doc) { return cat + '/' + doc; }
  function firstDoc(cat) { return DOCS[cat].toc[0].items[0][0]; }
  function keyFromHash() {
    const h = (window.location.hash || '').replace(/^#/, '');
    const [c, d] = h.split('/');
    if (DOCS[c] && d && DOCS[c].pages[d]) return docKey(c, d);
    if (DOCS[c]) return docKey(c, firstDoc(c));
    return docKey('product-analytics', 'overview');
  }

  function DocSection({ s }) {
    return (
      <section className="py-6 border-t border-[#f0ebe6] first:border-t-0">
        <h2 className="text-[#17100e] text-[22px] font-semibold tracking-[-0.5px]">{s.h}</h2>
        {s.p && s.p.map((para, i) => <p key={i} className="mt-3 text-[#4a423e] text-[15.5px] leading-[1.6]">{para}</p>)}
        {s.list && (
          <ul className="mt-4 space-y-2">
            {s.list.map((li, i) => <li key={i} className="flex gap-2.5 text-[#4a423e] text-[15px] leading-[1.55]"><span className="shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full bg-[#b8552e]" /><span>{li}</span></li>)}
          </ul>
        )}
        {s.steps && (
          <ol className="mt-4 space-y-2.5">
            {s.steps.map((st, i) => <li key={i} className="flex gap-3 text-[#3a332f] text-[15px] leading-[1.5]"><span className="shrink-0 w-6 h-6 rounded-full bg-[#f4ede7] text-[#b8552e] text-[13px] font-semibold flex items-center justify-center">{i + 1}</span><span>{st}</span></li>)}
          </ol>
        )}
        {s.qa && (
          <div className="mt-4 space-y-4">
            {s.qa.map((pair, i) => <div key={i}><p className="text-[#17100e] text-[15px] font-semibold">{pair[0]}</p><p className="mt-1 text-[#4a423e] text-[15px] leading-[1.55]">{pair[1]}</p></div>)}
          </div>
        )}
      </section>
    );
  }

  /* Monochrome black icons per category (match the SaaS sidebar's black icon set). */
  function CatIcon({ slug }) {
    const P = {
      'product-analytics': <g><line x1="3" y1="13" x2="3" y2="8"/><line x1="8" y1="13" x2="8" y2="3"/><line x1="13" y1="13" x2="13" y2="6"/></g>,
      'web-analytics': <g><circle cx="8" cy="8" r="5.5"/><path d="M2.5 8h11M8 2.5c-3.5 3.5-3.5 7.5 0 11M8 2.5c3.5 3.5 3.5 7.5 0 11"/></g>,
      'dashboards': <g><rect x="2.5" y="2.5" width="4.5" height="6" rx="1"/><rect x="9" y="2.5" width="4.5" height="3.5" rx="1"/><rect x="9" y="8" width="4.5" height="5.5" rx="1"/><rect x="2.5" y="10.5" width="4.5" height="3" rx="1"/></g>,
      'revenue-analytics': <g><circle cx="8" cy="8" r="5.5"/><path d="M10 6c-.5-.8-1.2-1.2-2-1.2-1.2 0-2 .7-2 1.6 0 2.4 4 1.2 4 3.4 0 1-.9 1.7-2 1.7-.9 0-1.7-.4-2.2-1.2M8 3.6v1.2M8 11.5v1.2"/></g>,
      'customer-analytics': <g><circle cx="5.5" cy="5.5" r="2.2"/><path d="M1.8 13c.4-2.4 1.9-3.7 3.7-3.7s3.3 1.3 3.7 3.7"/><circle cx="11" cy="6" r="1.8"/><path d="M10 9.5c1.9 0 3.3 1.1 3.7 3"/></g>,
      'session-replay': <g><circle cx="8" cy="8" r="5.5"/><path d="M6.5 5.7l4 2.3-4 2.3z"/></g>,
      'feature-flags': <g><rect x="2" y="5" width="12" height="6" rx="3"/><circle cx="11" cy="8" r="2"/></g>,
      'experiments': <g><path d="M6.2 2.5h3.6M7 2.5v4L3.4 12a1.6 1.6 0 001.4 2.4h6.4a1.6 1.6 0 001.4-2.4L9 6.5v-4"/><line x1="5" y1="10.5" x2="11" y2="10.5"/></g>,
      'error-tracking': <g><path d="M8 2.2L14.3 13H1.7z"/><line x1="8" y1="6.5" x2="8" y2="9.5"/><circle cx="8" cy="11.4" r=".6"/></g>,
      'surveys': <g><path d="M13.5 10.5a1.5 1.5 0 01-1.5 1.5H5.5L2.5 15V4a1.5 1.5 0 011.5-1.5h8A1.5 1.5 0 0113.5 4z"/><line x1="5.5" y1="6" x2="10.5" y2="6"/><line x1="5.5" y1="8.5" x2="9" y2="8.5"/></g>,
      'data-pipelines': <g><circle cx="3.5" cy="8" r="1.6"/><circle cx="12.5" cy="4" r="1.6"/><circle cx="12.5" cy="12" r="1.6"/><path d="M5 7.4l6-2.7M5 8.6l6 2.7"/></g>,
      'data-warehouse': <g><ellipse cx="8" cy="4" rx="5.5" ry="2"/><path d="M2.5 4v8c0 1.1 2.5 2 5.5 2s5.5-.9 5.5-2V4M2.5 8c0 1.1 2.5 2 5.5 2s5.5-.9 5.5-2"/></g>,
      'sql': <g><rect x="2" y="3" width="12" height="10" rx="1.5"/><path d="M4.5 6.5l2 1.8-2 1.8M8.5 10.5h3"/></g>,
      'endpoints': <g><path d="M5.5 4L2 8l3.5 4M10.5 4L14 8l-3.5 4"/></g>,
      'txlemetry-ai': <g><path d="M8 2l1.4 3.8L13 7l-3.6 1.2L8 12l-1.4-3.8L3 7l3.6-1.2zM12.5 11.5l.6 1.5 1.4.6-1.4.6-.6 1.5-.6-1.5-1.4-.6 1.4-.6z"/></g>,
      'ai-observability': <g><path d="M1.8 8S4 3.8 8 3.8 14.2 8 14.2 8 12 12.2 8 12.2 1.8 8 1.8 8z"/><circle cx="8" cy="8" r="2"/></g>,
      'getting-started': <g><path d="M8 1.8l5.5 4.4V14h-4v-4h-3v4h-4V6.2z"/></g>,
      'sdks': <g><path d="M8 1.8l5.5 3.1v6.2L8 14.2l-5.5-3.1V4.9z"/><path d="M2.5 4.9L8 8m0 0l5.5-3.1M8 8v6.2"/></g>,
      'workflows': <g><rect x="1.8" y="2" width="4.6" height="4" rx="1"/><rect x="9.6" y="10" width="4.6" height="4" rx="1"/><path d="M4 6v3a2 2 0 002 2h3.6"/></g>,
      'logs': <g><line x1="3" y1="4" x2="13" y2="4"/><line x1="3" y1="8" x2="13" y2="8"/><line x1="3" y1="12" x2="9" y2="12"/><circle cx="12" cy="12" r="1.8"/></g>,
      'distributed-tracing': <g><circle cx="3.2" cy="12.8" r="1.6"/><circle cx="8" cy="8" r="1.6"/><circle cx="12.8" cy="3.2" r="1.6"/><path d="M4.3 11.7L6.9 9.1M9.1 6.9l2.6-2.6"/></g>,
      'support': <g><circle cx="8" cy="8" r="5.5"/><circle cx="8" cy="8" r="2.2"/><path d="M4.1 4.1l2.3 2.3M9.6 9.6l2.3 2.3M11.9 4.1L9.6 6.4M6.4 9.6l-2.3 2.3"/></g>,
    };
    return (
      <svg viewBox="0 0 16 16" className="w-[13px] h-[13px] shrink-0" fill="none" stroke="#17100e" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        {P[slug] || <circle cx="8" cy="8" r="5.5" />}
      </svg>
    );
  }

  function CategoryDropdown({ current, onPick }) {
    const [open, setOpen] = useState(false);
    useEffect(() => {
      function onDoc(e) { if (!e.target.closest('.docs-cat-dd')) setOpen(false); }
      document.addEventListener('mousedown', onDoc);
      return () => document.removeEventListener('mousedown', onDoc);
    }, []);
    const groups = [];
    CATEGORIES.forEach((c) => {
      let g = groups.find((x) => x.label === c.group);
      if (!g) { g = { label: c.group, items: [] }; groups.push(g); }
      g.items.push(c);
    });
    return (
      <div className="docs-cat-dd relative mb-5">
        <button type="button" onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-[9px] border border-[#e3ded9] bg-white text-left hover:border-[#d0c7bf] transition-colors">
          <CatIcon slug={current} />
          <span className="flex-1 text-[#17100e] text-[13.5px] font-semibold truncate">{CAT[current].name}</span>
          <span className={`text-[10px] text-[#b0a69f] transition-transform ${open ? 'rotate-180' : ''}`}>▼</span>
        </button>
        {open && (
          /* Compact panel: every category visible at once (no internal scroll), icon + ✓ on current. */
          <div className="absolute z-30 left-0 w-[218px] mt-1.5 bg-white border border-[#e9e3dd] rounded-[10px] shadow-[0_16px_40px_rgba(20,20,20,0.16)] py-1">
            {groups.map((g) => (
              <div key={g.label}>
                {g.items.map((c) => (
                  <button key={c.slug} type="button"
                    onClick={() => { onPick(c.slug); setOpen(false); }}
                    className={`w-full flex items-center gap-1.5 text-left px-2 py-[2.5px] text-[12.5px] leading-[1.35] ${current === c.slug ? 'font-semibold' : 'hover:bg-[#f6f1ec]'}`}
                    style={{ color: '#17100e' }}>
                    <span className="w-2.5 shrink-0 text-[10px]">{current === c.slug ? '✓' : ''}</span>
                    <CatIcon slug={c.slug} />
                    <span className="truncate">{c.name}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  function DocsPage() {
    const [key, setKey] = useState(keyFromHash());
    const [cat, docSlug] = key.split('/');

    useEffect(() => {
      function onHash() { setKey(keyFromHash()); window.scrollTo(0, 0); }
      window.addEventListener('hashchange', onHash);
      return () => window.removeEventListener('hashchange', onHash);
    }, []);

    function pickCategory(slug) { window.location.hash = docKey(slug, firstDoc(slug)); }

    const category = CAT[cat];
    const page = DOCS[cat].pages[docSlug];

    return (
      <PageShell>
        {/* pt clears the floating header pill so content never sits under it */}
        <div style={{ fontFamily: "'Inter', sans-serif" }} className="pt-[132px]">
          <div className="max-w-[1220px] mx-auto px-6 pb-20 flex gap-10">
            {/* Sidebar: category dropdown + this category's grouped TOC */}
            <aside className="hidden lg:block w-[270px] shrink-0">
              {/* Dropdown lives OUTSIDE the scroll area so its panel is never clipped;
                  only the table of contents below scrolls. */}
              <div className="sticky top-[124px] flex flex-col max-h-[calc(100vh-148px)]">
                <div className="shrink-0">
                  <CategoryDropdown current={cat} onPick={pickCategory} />
                </div>
                <div className="flex-1 overflow-y-auto pr-2">
                {DOCS[cat].toc.map((grp) => (
                  <div key={grp.label} className="mb-4">
                    <p className="text-[#9a908a] text-[11px] font-semibold uppercase tracking-[1px] mb-1.5 px-1">{grp.label}</p>
                    <ul className="space-y-0.5">
                      {grp.items.map(([slug, name]) => {
                        const k = docKey(cat, slug);
                        return (
                          <li key={slug}>
                            <a href={'#' + k}
                              className={`block px-2.5 py-1.5 rounded-[7px] text-[14px] no-underline transition-colors ${
                                key === k ? 'bg-[#17100e] font-semibold' : 'hover:bg-[#f4ede7]'
                              }`}
                              /* Inline color beats the landing's global anchor color rules,
                                 which were overriding text-white and rendering dark-on-dark. */
                              style={{ color: key === k ? '#ffffff' : '#4a423e' }}>
                              {name}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
                </div>
              </div>
            </aside>

            {/* Content */}
            <main className="flex-1 min-w-0 max-w-[760px]">
              <p className="text-[13px] font-semibold uppercase tracking-[1.5px] text-[#b8552e]">{category.name}</p>
              <h1 className="mt-2 text-[#17100e] text-[38px] leading-[1.08] font-semibold tracking-[-1px]">
                {(DOCS[cat].toc.flatMap((g) => g.items).find(([s]) => s === docSlug) || [null, category.name])[1]}
              </h1>
              {page.blurb && <p className="mt-3 text-[#5b514d] text-[17px] leading-[1.5]">{page.blurb}</p>}
              {docSlug === 'overview' && category.image && (
                <div className="mt-6 rounded-[14px] overflow-hidden border border-[#ece7e2] bg-[#faf7f3]">
                  <img loading="lazy" decoding="async" alt="" src={category.image} className="w-full block" />
                </div>
              )}
              <div className="mt-4">{page.sections.map((s, i) => <DocSection key={i} s={s} />)}</div>

              <div className="mt-10 rounded-[14px] border border-[#ece7e2] bg-[#faf7f3] p-6 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-[#17100e] text-[17px] font-semibold tracking-[-0.3px]">Still have a question?</p>
                  <p className="mt-1 text-[#7a716c] text-[14px]">Talk to the Txlemetry team — we reply fast.</p>
                </div>
                <a data-spa href="/demo" className="bg-[#17100e] rounded-[7px] px-[16px] py-[10px] text-[14px] font-semibold no-underline whitespace-nowrap"
                  /* Inline color beats the landing's global anchor rules (dark-on-dark otherwise). */
                  style={{ color: '#ffffff' }}>Contact support</a>
              </div>
            </main>
          </div>
        </div>
      </PageShell>
    );
  }

  window.DocsPage = DocsPage;
})();
