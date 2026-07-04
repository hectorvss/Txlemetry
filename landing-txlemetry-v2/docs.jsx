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
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-[9px] border border-[#e3ded9] bg-white text-left hover:border-[#d0c7bf] transition-colors">
          <span className="flex-1 text-[#17100e] text-[14px] font-semibold truncate">{CAT[current].name}</span>
          <span className={`text-[10px] text-[#b0a69f] transition-transform ${open ? 'rotate-180' : ''}`}>▼</span>
        </button>
        {open && (
          <div className="absolute z-30 left-0 right-0 mt-1.5 bg-white border border-[#e9e3dd] rounded-[11px] shadow-[0_16px_40px_rgba(20,20,20,0.16)] py-1.5 max-h-[460px] overflow-y-auto">
            {groups.map((g) => (
              <div key={g.label} className="py-1">
                <p className="px-3 py-1 text-[#9a908a] text-[11px] font-semibold uppercase tracking-[1px]">{g.label}</p>
                {g.items.map((c) => (
                  <button key={c.slug} type="button"
                    onClick={() => { onPick(c.slug); setOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 text-[14px] ${current === c.slug ? 'text-[#b8552e] font-semibold' : 'text-[#3a332f] hover:bg-[#f6f1ec]'}`}>
                    {c.name}
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
              <div className="sticky top-[124px] max-h-[calc(100vh-148px)] overflow-y-auto pr-2">
                <CategoryDropdown current={cat} onPick={pickCategory} />
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
                                key === k ? 'bg-[#17100e] text-white font-semibold' : 'text-[#4a423e] hover:bg-[#f4ede7]'
                              }`}>
                              {name}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
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
                <a data-spa href="/demo" className="bg-[#17100e] rounded-[7px] px-[16px] py-[10px] text-white text-[14px] font-semibold no-underline whitespace-nowrap">Contact support</a>
              </div>
            </main>
          </div>
        </div>
      </PageShell>
    );
  }

  window.DocsPage = DocsPage;
})();
