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
          S('Autocapture', { p: ['Once the snippet is installed, autocapture records front-end interactions with no extra code — so you can answer questions about behavior retroactively, even for interactions you never thought to instrument.'], list: ['Pageviews and pageleaves.', 'Clicks on buttons and links.', 'Form submissions and input changes (values are not captured by default).', 'Rage clicks — repeated frustrated clicking on the same element.'], note: 'Autocapture can be scoped: use an allowlist/denylist of CSS selectors to control which elements produce events, and disable it entirely if you prefer explicit instrumentation only.' }),
          S('Custom events', { p: ['Custom events describe what matters in your product — a subscription started, a report exported, a limit hit. Send them with one call and attach properties for later filtering and breakdowns.'], code: [
            { lang: 'JavaScript', code: `// Simple event\ntxlemetry.capture('report_exported')\n\n// With properties for filtering & breakdowns\ntxlemetry.capture('subscription_started', {\n  plan: 'pro',\n  seats: 5,\n  source: 'pricing_page',\n})` },
            { lang: 'Node.js', code: `client.capture({\n  distinctId: user.id,\n  event: 'subscription_started',\n  properties: { plan: 'pro', seats: 5 },\n})` },
          ] }),
          S('Naming conventions', { p: ['A consistent scheme keeps the event list navigable as it grows. A common pattern is object_action in snake_case.'], table: { head: ['Good', 'Avoid', 'Why'], rows: [
            ['subscription_started', 'Subscribed!', 'Predictable, sortable, greppable'],
            ['report_exported', 'export', 'Says what happened to what'],
            ['invite_sent', 'user clicked invite button then it sent', 'Short and stable across UI changes'],
          ] } }),
        ]),
        'identify-users': p('Tie events to a known user with identify.', [
          S('How identification works', { p: ['Before login, a visitor gets an anonymous distinct ID. When you call identify with your own user ID (after signup or login), Txlemetry links the anonymous history to the identified person — so the journey from first visit to conversion is one continuous story.'], code: [
            { lang: 'JavaScript', code: `// After successful login/signup\ntxlemetry.identify(user.id, {\n  email: user.email,\n  name: user.name,\n  plan: user.plan,\n})\n\n// On logout — reset so the next visitor\n// doesn't inherit this identity\ntxlemetry.reset()` },
          ] }),
          S('Person properties', { p: ['Properties passed to identify are stored on the person and become usable in every filter, breakdown and cohort. Use $set-style updates to keep them current (e.g. when the plan changes).'] }),
          S('Rules of thumb', { list: ['Use a stable internal user ID — never an email that can change.', 'Call identify as early as you know who the user is, on every platform.', 'Call reset on logout on shared devices.', 'Keep person properties small and meaningful: plan, role, signup date.'] }),
        ]),
        trends: p('Count and aggregate events over time with breakdowns.', [
          S('What trends answer', { p: ['Trends are the workhorse insight: how often does something happen, and is it going up or down? A trend plots one or more event series over time, at the interval you choose (hour, day, week, month), over any date range.'] }),
          S('Aggregations', { table: { head: ['Aggregation', 'What it measures', 'Example'], rows: [
            ['Total count', 'Every occurrence of the event', 'Pageviews per day'],
            ['Unique users', 'Distinct persons doing it', 'Daily active users'],
            ['Weekly/monthly active', 'Rolling distinct users', 'WAU / MAU'],
            ['Property sum / avg / p90', 'Numeric property math', 'Average order value'],
            ['Per-user average', 'Events divided by users', 'Reports created per user'],
          ] } }),
          S('Build a trend', { steps: ['Choose the event to measure (or an action combining several).', 'Pick the aggregation from the table above.', 'Add a breakdown (e.g. by plan, browser, country) to split the series.', 'Add more series to compare events on the same chart.', 'Set the date range and interval, then save to a dashboard.'] }),
          S('Working with the chart', { list: ['Click a point to see the users behind it — and jump to their sessions.', 'Use formulas (A/B) to chart ratios like conversion or events-per-user.', 'Compare against the previous period to spot regressions at a glance.', 'Switch the display: line, bar, table, number or world map.'] }),
        ]),
        funnels: p('Measure conversion and drop-off across ordered steps.', [
          S('What funnels answer', { p: ['A funnel measures how many users complete an ordered sequence of steps — and where the rest fall out. It is the tool for questions like "what fraction of signups reach their first insight?" and "which step of checkout loses the most users?".'] }),
          S('Build a funnel', { steps: ['Add the ordered steps; each step is an event or action.', 'Choose the conversion window — how long a user has to finish (e.g. 14 days).', 'Optionally break down by a property to compare segments side by side.', 'Save it, and click any step to inspect the users who dropped off there.'] }),
          S('Step ordering', { table: { head: ['Mode', 'Meaning', 'Use when'], rows: [
            ['Sequential', 'Steps in order, other events may happen between', 'Most product funnels'],
            ['Strict order', 'Steps must be consecutive, nothing in between', 'Tight UI flows'],
            ['Any order', 'All steps completed, any sequence', 'Checklist-style activation'],
          ] } }),
          S('Analyzing drop-off', { p: ['Each step shows its conversion from the previous one and the median time between steps. The biggest cliff is your highest-leverage fix: open the users who dropped there, watch their session replays, and look for the friction — an error, a confusing form, a missing affordance.'], note: 'From any funnel step you can jump straight to the session recordings of users who dropped off — the fastest path from "where" to "why".' }),
        ]),
        retention: p('See how many users return over time after a first action.', [
          S('What retention answers', { p: ['Retention measures whether your product creates a habit: of the users who did something in a given period, how many came back and did it again later? It is the metric that separates growth that sticks from growth that leaks.'] }),
          S('Reading the grid', { p: ['Each row is a cohort of users who started in the same period (e.g. the week of March 3). Each column shows what share of them returned 1, 2, 3… periods later. Color intensity mirrors the percentage, so a healthy product shows a "floor" — the curve flattens instead of decaying to zero.'] }),
          S('Configuration', { table: { head: ['Setting', 'Options', 'Effect'], rows: [
            ['Start event', 'Any event or action', 'Who enters each cohort'],
            ['Return event', 'Same or different event', 'What counts as "came back"'],
            ['Retention type', 'First-time vs recurring', 'Only brand-new users, or anyone active'],
            ['Period', 'Day / week / month', 'Granularity of the grid'],
          ] } }),
          S('Tips', { list: ['Use first-time retention to judge onboarding quality.', 'Pick a return event that reflects real value, not just opening the app.', 'Break down by acquisition source to compare cohort quality.', 'Click any cell to see exactly which users it contains.'] }),
        ]),
        paths: p('Visualize the routes users take through your product.', [
          S('What paths answer', { p: ['Paths reconstruct the actual sequences of pages and events users perform, laid out as a flow diagram. They surface the journeys you didn’t design: the detours before conversion, the loops that signal confusion, the unexpected entry points.'] }),
          S('Configuration', { list: ['Start point — see everything that follows a page or event.', 'End point — see every route that leads to a destination (e.g. purchase).', 'Event types — pageviews, screen views, custom events or autocaptured clicks.', 'Number of paths per step — widen or simplify the diagram.', 'Exclusions — hide noisy events that clutter the picture.'] }),
          S('Reading the diagram', { p: ['Edge thickness is volume: thick lines are common routes, thin ones are edge cases. Look for loops (users bouncing between two screens), dead ends before your goal, and popular routes you never optimized because you didn’t know they existed.'], note: 'Set the funnel’s biggest drop-off step as a path start point to see where those users actually went instead.' }),
        ]),
        stickiness: p('How repeatedly users engage over a period.', [ S('Overview', { p: ['Stickiness measures how many days (or intervals) users perform an action within a period — a proxy for habit strength.'] }) ]),
        lifecycle: p('New, returning, resurrecting and dormant users.', [ S('Overview', { p: ['Lifecycle breaks your active users into new, returning, resurrecting and dormant each period, so you can see growth quality at a glance.'] }) ]),
        'sql-insights': p('Drop into SQL when the visual builder is not enough.', [ S('Overview', { p: ['SQL insights let you write queries directly against your events, then save the result like any other insight.'] }) ]),
        dashboards: p('Collect insights into shareable, filterable boards.', [
          S('Overview', { p: ['Dashboards bring related insights together. Add a dashboard-level date range or filter and every tile updates at once.'] }),
          S('Create a dashboard', { steps: ['Create a dashboard or start from a template.', 'Add tiles by pinning insights.', 'Apply a dashboard filter or date override.', 'Share with your team or a public link.'] }),
        ]),
        cohorts: p('Group users by behavior or properties.', [
          S('What are cohorts', { p: ['A cohort is a reusable, named group of users. Define it once — "trial users in Spain", "did an export in the last 7 days" — and use it everywhere: as a filter on any insight, a breakdown, a survey audience or a feature-flag target.'] }),
          S('Types', { table: { head: ['Type', 'Definition', 'Updates'], rows: [
            ['Dynamic', 'A set of property/behavior criteria', 'Continuously, as users match or stop matching'],
            ['Static', 'A fixed list (uploaded or snapshotted)', 'Never — frozen at creation'],
          ] } }),
          S('Building criteria', { list: ['Person properties: plan = pro, country = ES.', 'Behavior: performed an event N times in a window, or stopped performing it.', 'First-time behavior: did something for the first time recently.', 'Combine criteria with AND / OR, and nest groups for precision.'], note: 'Feature flags can only target property-based cohorts — behavioral criteria (events performed) are not evaluable at flag time.' }),
        ]),
        actions: p('Name and reuse combinations of events.', [
          S('What are actions', { p: ['An action gives a durable name to something users do, defined from one or more events or autocaptured elements. Insights built on the action keep working when the underlying UI changes — you update the action’s definition once, not thirty insights.'] }),
          S('Ways to define one', { list: ['From a custom event name.', 'From autocapture: pick the element by selector, text or href — or point and click with the toolbar.', 'From a pageview URL (exact, contains, or regex).', 'Combine several definitions with OR into one action.'] }),
        ]),
        annotations: p('Mark releases and events on your charts.', [
          S('Overview', { p: ['Annotations pin context to dates on every chart: a release, a campaign launch, an outage. Three months later, the spike explains itself instead of demanding an investigation.'] }),
          S('Scopes', { list: ['Insight — visible only on one chart.', 'Project — visible on every chart in the project.', 'Organization — visible across projects.'] }),
        ]),
        properties: p('Event, person, group and session properties.', [
          S('Property types', { table: { head: ['Type', 'Attached to', 'Examples'], rows: [
            ['Event properties', 'A single event', 'button name, current URL, value'],
            ['Person properties', 'The user', 'plan, email, signup date'],
            ['Group properties', 'An account/organization', 'company size, ARR tier'],
            ['Session properties', 'One session', 'entry URL, initial referrer, duration'],
          ] } }),
          S('Where they work', { p: ['Every property is available in filters, breakdowns, cohort criteria, funnel exclusions and SQL. Default properties (device, browser, geo-IP, UTM) are captured automatically; your custom ones ride along on capture and identify calls.'] }),
        ]),
        sampling: p('Trade precision for speed on large datasets.', [
          S('Overview', { p: ['With sampling on, an insight computes over a representative fraction of events and extrapolates. Queries return much faster on very large datasets, at the cost of small statistical noise.'], note: 'Sampled results are estimates — turn sampling off for financial reporting or anything where the exact count matters.' }),
        ]),
        faq: p('Common questions about product analytics.', [
          S('FAQ', { qa: [
            ['Does autocapture need code?', 'No — the snippet records pageviews and interactions automatically; custom events are one capture call when you want richer semantics.'],
            ['Can I combine events and warehouse data?', 'Yes — link a source in Data warehouse and join it with events in SQL insights.'],
            ['Why do unique-user counts differ between insights?', 'Check the date ranges, filters and whether sampling is enabled; also confirm identify is called consistently so users aren’t split into several persons.'],
            ['Can I rename or fix an event after the fact?', 'Historical events are immutable, but actions let you re-map names, and transformations can normalize future events at ingestion.'],
            ['How fresh are results?', 'Events are queryable seconds after capture; dashboard tiles cache and refresh periodically.'],
          ] }),
        ]),
      },
    },
  };

  DOCS['web-analytics'] = {
    toc: [
      { label: 'Get started', items: [['overview', 'Overview'], ['getting-started', 'Getting started']] },
      { label: 'Features', items: [['dashboard', 'The dashboard'], ['channels', 'Channels & UTMs'], ['conversion-goals', 'Conversion goals'], ['sessions', 'Sessions'], ['web-vitals', 'Core web vitals'], ['bounce-rate', 'Bounce rate']] },
      { label: 'Reference', items: [['vs-product-analytics', 'Web vs product analytics'], ['faq', 'FAQ']] },
    ],
    pages: {
      overview: p('Traffic, sources, conversion and content performance in one simple view.', [
        S('What is web analytics', { p: ['Web analytics gives you the familiar top-level view of your site — visitors, sessions, top pages, referrers and conversion — without setting anything up beyond the snippet. It is designed for at-a-glance monitoring, while staying connected to the deeper product data underneath: when a number looks off, you can drill straight into the events and sessions behind it.'] }),
        S('What you get', { list: ['Visitors, pageviews and sessions over time, with period comparison.', 'Top sources, channels and UTM campaign breakdowns.', 'Top pages, entry pages and exit pages.', 'Device, browser and geography splits.', 'Conversion goals tied to your own events.', 'Core web vitals monitoring.'] }),
      ]),
      'getting-started': p('From snippet to populated dashboard in minutes.', [
        S('Requirements', { p: ['Web analytics is powered by the same capture as everything else: once the Txlemetry snippet is installed and sending pageviews, the dashboard populates automatically — no extra tagging plan needed.'] }),
        S('Steps', { steps: ['Install the snippet (see SDKs & install) so pageviews are captured.', 'Open Web analytics — traffic appears as soon as events arrive.', 'Optionally define a conversion goal to track success against traffic.'] }),
      ]),
      dashboard: p('Reading the web analytics dashboard.', [
        S('Layout', { p: ['The dashboard is a fixed set of tiles: a traffic graph, source/channel tables, page tables and device/geo splits. Every tile responds to the shared date range and filters at the top, so the whole page always describes the same slice of traffic.'] }),
        S('Filtering', { list: ['Filter by any property (country, device, campaign…).', 'Compare against the previous period to spot changes.', 'Click a row (a source, a page) to filter the whole dashboard by it.'] }),
      ]),
      channels: p('Where your traffic comes from.', [
        S('Channels', { p: ['Traffic is classified into channels — direct, organic search, paid, referral, social, email — based on the referrer and UTM parameters of each session, so you can compare acquisition sources at a glance.'] }),
        S('UTM tracking', { p: ['UTM parameters (utm_source, utm_medium, utm_campaign, utm_term, utm_content) are captured automatically on first touch and attached to the session, making campaign breakdowns available with no extra setup.'] }),
      ]),
      'conversion-goals': p('Define what success means for your site.', [
        S('Overview', { p: ['A conversion goal is an event that represents success — a signup, a purchase, a demo booking. Once set, the dashboard shows conversion alongside traffic so you can judge quality, not just volume.'] }),
        S('Set a goal', { steps: ['Open Web analytics and choose "Add conversion goal".', 'Pick the event (or action) that represents success.', 'The conversion tile now tracks it against visitors and sessions.'] }),
      ]),
      sessions: p('How visits are grouped into sessions.', [
        S('Overview', { p: ['A session groups the activity of one visitor until 30 minutes of inactivity. Session duration, entry page and exit page are derived automatically, and each web session links to its full event stream and replay if recording is enabled.'] }),
      ]),
      'web-vitals': p('Monitor real-user performance.', [
        S('Overview', { p: ['Core web vitals (LCP, CLS, INP, FCP) are collected from real users when enabled, so you can watch performance percentiles per page and catch regressions after a release.'] }),
      ]),
      'bounce-rate': p('How bounce rate is measured.', [
        S('Overview', { p: ['A session bounces when it has a single pageview, no autocaptured interaction and lasts under 10 seconds. Bounce rate is shown per page and per source, so you can see which acquisition traffic actually engages.'] }),
      ]),
      'vs-product-analytics': p('When to use each.', [
        S('Comparison', { list: ['Web analytics: fixed, zero-config dashboard for site traffic questions.', 'Product analytics: fully flexible insights (trends, funnels, retention) for product behavior questions.', 'Both read the same events — start in web analytics, drill into product analytics when you need depth.'] }),
      ]),
      faq: p('Common questions about web analytics.', [
        S('FAQ', { qa: [['Do I need to configure anything?', 'No — pageviews from the snippet are enough; goals and vitals are optional toggles.'], ['Does it work alongside product analytics?', 'Yes, they share the same event data; nothing is double-counted or duplicated.'], ['Can I see individual visitors?', 'Yes — drill from any tile into the underlying sessions and persons.']] }),
      ]),
    },
  };

  DOCS['session-replay'] = {
    toc: [
      { label: 'Get started', items: [['overview', 'Overview'], ['enable', 'Enable recordings']] },
      { label: 'Features', items: [['watching', 'Watching replays'], ['filtering', 'Filtering & search'], ['console-network', 'Console & network'], ['privacy', 'Privacy & masking'], ['volume', 'Sampling & volume']] },
      { label: 'Reference', items: [['troubleshooting', 'Troubleshooting'], ['faq', 'FAQ']] },
    ],
    pages: {
      overview: p('Watch real sessions to see the behavior behind a metric.', [
        S('What is session replay', { p: ['Session replay records real user sessions — DOM changes, clicks, scrolls, inputs — so you can watch exactly what a user experienced. Because replays share the same data model as analytics, you can jump from a funnel drop-off or an error straight into the sessions where it happened.'] }),
        S('What it is for', { list: ['Debugging: see the exact steps that led to a bug or a rage click.', 'UX research: watch how real users navigate a flow.', 'Support: reproduce what a specific user reported.', 'Metric forensics: go from "conversion dropped" to "here is why".'] }),
      ]),
      enable: p('Turn on recording and choose what gets captured.', [
        S('Enable on the web', { steps: ['Install the snippet or JavaScript SDK (see SDKs & install).', 'Enable session recording in Project settings — recording starts for new sessions immediately.', 'Optionally enable console log and network capture for richer debugging.', 'Open Session replay — recordings appear as users browse.'], code: [
          { lang: 'JavaScript', code: `txlemetry.init('<project-api-key>', {\n  api_host: 'https://txlemetry.com',\n  // Optional: fine-tune what replay captures\n  session_recording: {\n    maskAllInputs: true,        // mask every input value\n    recordCrossOriginIframes: false,\n  },\n})` },
        ] }),
        S('Start and stop programmatically', { p: ['Recording can also be controlled from code — useful to record only after consent, or only inside a flow you are studying.'], code: [
          { lang: 'JavaScript', code: `// After the user accepts your privacy prompt\ntxlemetry.startSessionRecording()\n\n// Stop when leaving the sensitive area\ntxlemetry.stopSessionRecording()` },
        ] }),
        S('Mobile', { p: ['Mobile session replay is available in the iOS, Android, React Native and Flutter SDKs, with the same privacy controls as the web. Enable it in the SDK’s configuration when initializing.'] }),
      ]),
      watching: p('The replay player and its tools.', [
        S('The player', { list: ['Timeline with activity markers — clicks, navigations, errors and rage clicks stand out.', 'Playback speed control (up to 4×) and automatic inactivity skipping.', 'The event stream synced to the video — click any event to jump to that exact moment.', 'Console and network panels alongside the playback when capture is enabled.', 'Notes and timestamped sharing links for teammates.'] }),
        S('Suggested workflow', { steps: ['Arrive from an insight, error or user profile so the list is already scoped.', 'Skim at 2× with inactivity skipping — most sessions resolve in a minute.', 'When something odd happens, open the event stream and console at that timestamp.', 'Drop a note at the moment and share the link in the issue or PR.'] }),
      ]),
      filtering: p('Find the sessions that matter.', [
        S('Available filters', { table: { head: ['Filter', 'Example'], rows: [
          ['Person / user', 'Sessions of a specific customer from a support ticket'],
          ['Events performed', 'Sessions where checkout_failed happened'],
          ['Page visited', 'Sessions touching /onboarding'],
          ['Duration', 'Longer than 5 minutes'],
          ['Device / browser / country', 'Mobile Safari sessions from Spain'],
          ['Console errors', 'Sessions with at least one JS error'],
        ] } }),
        S('Playlists', { p: ['Saved filters become playlists — living collections your team can watch through, like "checkout failures this week" or "first sessions of enterprise trials". New matching recordings join automatically.'] }),
      ]),
      'console-network': p('Debug with console logs and network activity.', [
        S('What gets captured', { p: ['With console and network capture enabled, each replay carries the browser console output (logs, warnings, errors) and the network requests made during the session — method, status code, timing and size — synchronized with the video. You debug a production failure without asking the user for a HAR file or a screenshot of DevTools.'] }),
        S('Typical debugging flow', { steps: ['Open the replay at the moment of the problem (an error marker on the timeline usually points at it).', 'Check the console panel for the exception or warning at that timestamp.', 'Check the network panel: did a request fail, return a 4xx/5xx, or take seconds?', 'Cross-reference with the event stream to see what the user did right before.'] }),
        S('Privacy', { note: 'Network capture records metadata (URL, status, timing) — request/response bodies are not recorded. Console capture can be disabled independently if your logs may contain sensitive values.' }),
      ]),
      privacy: p('Keep sensitive data out of recordings.', [
        S('Defaults', { p: ['Password fields are masked always and unconditionally. Beyond that, you choose the level: mask every input, mask specific elements, or block recording on entire pages.'] }),
        S('Masking controls', { table: { head: ['Control', 'How', 'Effect'], rows: [
          ['Mask all inputs', 'maskAllInputs: true (default)', 'Every typed value becomes ***'],
          ['Mask specific inputs', 'CSS selector config', 'Only matched fields masked'],
          ['Mask any element', 'Add class txl-mask', 'Element rendered as a placeholder box'],
          ['Block recording', 'Add class txl-no-capture / page rules', 'Nothing recorded for that element/page'],
        ] } }),
        S('Configuration example', { code: [
          { lang: 'JavaScript', code: `txlemetry.init('<project-api-key>', {\n  session_recording: {\n    maskAllInputs: true,\n    maskInputOptions: { email: true },\n    maskTextSelector: '.sensitive, [data-private]',\n  },\n})` },
        ] }),
        S('Good to know', { note: 'Masking happens in the browser, before anything leaves the page — masked content never reaches the server.' }),
      ]),
      volume: p('Control how much gets recorded.', [
        S('Why control volume', { p: ['Recording every session of a high-traffic product is rarely necessary. Volume controls let you keep the recordings that answer questions while keeping costs predictable.'] }),
        S('Available controls', { table: { head: ['Control', 'Example', 'Best for'], rows: [
          ['Sampling', 'Record 20% of sessions', 'High-traffic products'],
          ['Minimum duration', 'Skip sessions under 5s', 'Filtering bounces'],
          ['Feature flag gate', 'Record only when flag matches', 'Studying one rollout or cohort'],
          ['Programmatic start/stop', 'startSessionRecording()', 'Consent flows, specific funnels'],
        ] } }),
        S('Combining controls', { p: ['Controls compose: e.g. sample 50% of sessions, but only for users inside the new-checkout flag, and skip anything under 10 seconds. Start broad while you calibrate, then narrow.'] }),
      ]),
      troubleshooting: p('Recordings not appearing?', [
        S('Checklist', { steps: ['Confirm recording is enabled in Project settings.', 'Check that the snippet/SDK version supports replay.', 'Ad blockers can prevent capture on some visitors — compare against server-side pageview counts.', 'Verify your domain is in the authorized URLs if you restricted capture.'] }),
      ]),
      faq: p('Common questions about session replay.', [
        S('FAQ', { qa: [['Does replay slow my site down?', 'Capture is asynchronous and batched; the overhead is designed to be negligible for real users.'], ['How long are recordings kept?', 'Recordings follow your plan’s retention window; you can also save specific ones to keep them longer.'], ['Can I record only some users?', 'Yes — sample by percentage, gate by feature flag, or start recording programmatically.']] }),
      ]),
    },
  };

  DOCS['feature-flags'] = {
    toc: [
      { label: 'Get started', items: [['overview', 'Overview'], ['create', 'Create a flag'], ['use-in-code', 'Use flags in code']] },
      { label: 'Features', items: [['targeting', 'Release conditions'], ['multivariate', 'Multivariate flags'], ['payloads', 'Payloads & remote config'], ['bootstrapping', 'Bootstrapping & local eval'], ['scheduling', 'Scheduling & rollbacks'], ['dependencies', 'Flag dependencies']] },
      { label: 'Guides', items: [['phased-rollout', 'Do a phased rollout']] },
      { label: 'Reference', items: [['best-practices', 'Best practices'], ['troubleshooting', 'Troubleshooting'], ['faq', 'FAQ']] },
    ],
    pages: {
      overview: p('Ship safely with progressive rollouts and remote configuration.', [
        S('What are feature flags', { p: ['Feature flags decouple deploying code from releasing it. You ship a feature dark, then turn it on for a percentage of users, a cohort, or users matching a property — and turn it off instantly if something goes wrong, without another deploy.'] }),
        S('Why use them', { list: ['Progressive rollouts: 5% → 25% → 100%, watching metrics at each step.', 'Kill switches: disable a misbehaving feature in seconds.', 'Targeting: beta features only for a cohort or plan.', 'Experiments: flags are the assignment mechanism for A/B tests.', 'Remote config: change values in production without deploying.'] }),
      ]),
      create: p('Create and configure your first flag.', [
        S('Steps', { steps: ['Open Feature flags and create a new flag with a descriptive key (e.g. new-checkout).', 'Choose the release condition: percentage of users, person properties, or a cohort.', 'Save — the flag is live and evaluable from every SDK immediately.', 'Increase the rollout percentage as confidence grows.'] }),
        S('Flag states', { list: ['Enabled/disabled — the master switch.', 'Rollout % — what share of matching users get the flag.', 'Conditions — who is eligible at all.'] }),
      ]),
      'use-in-code': p('Read flags from your application.', [
        S('Client-side (web)', { p: ['In the browser, check a flag with isFeatureEnabled and branch your UI on the result. Flags are fetched once for the current user and cached; for decisions that affect first paint, combine this with bootstrapping to avoid a flash of the wrong variant.'], code: [
          { lang: 'JavaScript', code: `// Boolean flag\nif (txlemetry.isFeatureEnabled('new-checkout')) {\n  renderNewCheckout()\n}\n\n// Multivariate: which variant did this user get?\nconst variant = txlemetry.getFeatureFlag('pricing-test')\nif (variant === 'annual-first') {\n  showAnnualFirstPricing()\n}` },
          { lang: 'React', code: `import { useFeatureFlagEnabled } from '@txlemetry/react'\n\nfunction Nav() {\n  const showNewNav = useFeatureFlagEnabled('new-nav')\n  return showNewNav ? <NewNav /> : <ClassicNav />\n}` },
        ] }),
        S('Server-side', { p: ['Backend SDKs evaluate flags per distinct ID. With local evaluation enabled, flag definitions are cached in your process and each check runs in-memory — no network call per request.'], code: [
          { lang: 'Node.js', code: `const enabled = await client.isFeatureEnabled(\n  'new-checkout',\n  distinctId\n)\nif (enabled) {\n  // new code path\n}` },
          { lang: 'Python', code: `if txlemetry.feature_enabled('new-checkout', distinct_id):\n    render_new_checkout()` },
        ] }),
        S('Reacting to flag changes', { p: ['On the web you can subscribe to flag updates, so the UI can react if a rollout changes mid-session.'], code: [
          { lang: 'JavaScript', code: `txlemetry.onFeatureFlags(() => {\n  // flags loaded or refreshed\n  updateUI()\n})` },
        ] }),
        S('Good to know', { note: 'Identify users before evaluating flags. Anonymous and identified users have different distinct IDs, and consistent bucketing depends on evaluating against the same ID everywhere.' }),
      ]),
      targeting: p('Who gets the feature.', [
        S('Condition types', { table: { head: ['Condition', 'Example', 'Best for'], rows: [
          ['Percentage rollout', '25% of all users', 'Gradual releases with instant rollback'],
          ['Person property', 'plan = enterprise', 'Plan- or attribute-based gating'],
          ['Cohort', 'Beta testers', 'Reusable, centrally-managed groups'],
          ['Group', 'organization = Acme', 'B2B: whole accounts at once'],
        ] } }),
        S('How percentage bucketing works', { p: ['The rollout percentage is decided by a stable hash of the user’s distinct ID and the flag key. The same user always lands in the same bucket for a given flag — across sessions and devices — and raising the percentage only adds users; nobody who had the feature loses it.'] }),
        S('Combining conditions', { p: ['Conditions inside one set are ANDed together (plan = pro AND country = ES); multiple sets are ORed. The first matching set decides the result, and each set can carry its own rollout percentage.'] }),
      ]),
      multivariate: p('More than on/off.', [
        S('Overview', { p: ['Multivariate flags return one of several string variants (e.g. control / red / blue) with weights you define — the building block for experiments with multiple treatments.'] }),
      ]),
      payloads: p('Attach configuration to a flag.', [
        S('Overview', { p: ['A flag can carry a JSON payload. Use it as remote config: change copy, limits, or endpoints in production by editing the payload — no deploy needed. The payload is returned alongside the flag value in every SDK.'] }),
      ]),
      bootstrapping: p('Avoid flicker and evaluate locally.', [
        S('Bootstrapping', { p: ['Pass the user’s flags to the client on first render (from your server) so UI gated by flags renders correctly immediately, with no flash of the wrong variant.'] }),
        S('Local evaluation', { p: ['Server SDKs can poll flag definitions and evaluate them in-process — microsecond checks, no network call per request.'] }),
      ]),
      scheduling: p('Automate flag changes over time.', [
        S('Overview', { p: ['Schedule a flag to change at a future time — enable a launch at 9:00, or ramp a rollout automatically. Every change is recorded in the flag’s history so rollbacks are one click.'] }),
      ]),
      dependencies: p('Make one flag depend on another.', [
        S('What are flag dependencies', { p: ['A dependent flag only activates when another flag — its base — evaluates to a given value. This unlocks layered rollout strategies: a feature that must not appear until its foundation is live, an experiment restricted to users already inside another rollout, or a safety interlock between risky changes.'] }),
        S('When to use them', { list: [
          'Layered rollouts — enable a complex feature only after its foundational pieces are active.',
          'Conditional experiments — test only within users who already have another feature.',
          'Safety interlocks — critical base flags must be on before dependents can activate.',
          'Segmentation — target users by their participation in other rollouts.',
        ] }),
        S('Set up a dependency', { steps: [
          'Create the base flag with its own release conditions, and save it.',
          'Create (or edit) the dependent flag and, in its release conditions, add a condition on the base flag’s value.',
          'Choose the required value — true, false, or a specific variant — and add any extra conditions or rollout percentage.',
          'Save. Evaluating the dependent flag now resolves its whole chain automatically: the base is checked first, then the dependent’s own conditions.',
        ] }),
        S('Supported dependency conditions', { table: { head: ['Base flag type', 'Conditions you can set'], rows: [
          ['Boolean flag', 'equals true · equals false'],
          ['Multivariate flag', 'equals a specific variant'],
          ['Multivariate flag', 'equals true (any variant) · equals false (no variant)'],
        ] } }),
        S('Example: beta program', { p: ['A common pattern: a beta-program base flag rolled out to 10% of users, and a new-dashboard dependent flag conditioned on beta-program = true with 100% rollout. Users see the new dashboard only if they are inside the beta.'], code: [
          { lang: 'JavaScript', code: `// The dependent flag is evaluated like any other —\n// its dependency chain resolves automatically\nif (txlemetry.isFeatureEnabled('new-dashboard')) {\n  showNewDashboard()\n}` },
        ] }),
        S('Troubleshooting', { steps: [
          'Check the base flag is active and returning the expected value for that user.',
          'Verify the dependency condition matches what the base actually returns (variant vs boolean).',
          'Remember the rollout percentage still applies after conditions match.',
          'Confirm the user meets all the other conditions, not just the dependency.',
        ] }),
      ]),
      'phased-rollout': p('Release to progressively larger groups, safely.', [
        S('What is a phased rollout', { p: ['A phased rollout ships a feature to a small group first, then to progressively larger — and more important — groups as confidence grows. Feature flags and cohorts provide the mechanics: the flag gates the code path; the phases decide who is inside it.'] }),
        S('Prerequisites', { p: ['Accurate targeting needs user identification: flags key off the distinct ID, so call identify when users log in. Any person properties or cohorts you plan to phase with must exist before the rollout starts.'], note: 'If your users are anonymous, percentage rollouts still work (they bucket by the anonymous ID), but property- and cohort-based phases won’t match anyone.' }),
        S('Phase with the flag', { steps: [
          'Create a flag with a key like phased-rollout, describing the phases and their dates in the description.',
          'Set the release condition to phase 1 — e.g. your internal team (by email domain) or 5% of users.',
          'Ship the gated code path reading the flag.',
          'At each phase, edit the flag’s release condition to the next group and save — no deploy needed.',
        ], code: [
          { lang: 'React', code: `// app/page.js\nimport { useEffect, useState } from 'react'\nimport { useTxlemetry } from '@txlemetry/react'\n\nexport default function Home() {\n  const [flag, setFlag] = useState(false)\n  const txl = useTxlemetry()\n\n  useEffect(() => {\n    setFlag(txl.isFeatureEnabled('phased-rollout') === true)\n  }, [])\n\n  return flag ? <NewExperience /> : <CurrentExperience />\n}` },
        ] }),
        S('Phase with cohorts', { p: ['Cohorts make phases reusable: define one cohort per phase (with the properties that describe the group), then swap the cohort in the flag’s release condition as the rollout progresses. If you repeat phase rollouts often, the same cohorts serve every launch.'], note: 'Dynamic behavioral cohorts (based on events performed) can’t be used in flags — build phase cohorts from person properties.' }),
        S('Watch the impact', { list: [
          'Pair the rollout with a dashboard of guardrail metrics (errors, conversion, latency).',
          'Create an experiment on the flag if you want statistical confidence per phase.',
          'Roll back instantly by lowering the percentage or disabling the flag.',
        ] }),
      ]),
      'best-practices': p('Naming, cleanup and safety.', [
        S('Recommendations', { list: ['Use descriptive kebab-case keys and a naming convention per team.', 'Default to safe behavior when a flag can’t be evaluated.', 'Remove flags once fully rolled out — stale flags are tech debt.', 'Pair risky rollouts with a dashboard of guardrail metrics.'] }),
      ]),
      troubleshooting: p('Flag not behaving as expected?', [
        S('Checklist', { steps: ['Check the flag’s conditions against the actual person properties of the affected user.', 'Confirm the SDK identifies the user before evaluating (anonymous vs identified IDs differ).', 'Use the flag’s usage tab to see recent evaluations and results.', 'For local evaluation, confirm definitions are refreshing (poll interval).'] }),
      ]),
      faq: p('Common questions about feature flags.', [
        S('FAQ', { qa: [['Do flags affect performance?', 'Client evaluations are cached; server local-evaluation is in-process. Overhead is negligible in practice.'], ['Same user, different devices?', 'Evaluation keys off the distinct ID — identify users consistently and results follow them across devices.'], ['Can non-developers change flags?', 'Yes, rollout and conditions are editable from the UI without code changes.']] }),
      ]),
    },
  };

  DOCS['experiments'] = {
    toc: [
      { label: 'Get started', items: [['overview', 'Overview'], ['create', 'Create an experiment']] },
      { label: 'Features', items: [['metrics', 'Goals & metrics'], ['variants', 'Variants & assignment'], ['results', 'Reading results'], ['no-code', 'No-code experiments']] },
      { label: 'Reference', items: [['sample-size', 'Duration & sample size'], ['best-practices', 'Best practices'], ['faq', 'FAQ']] },
    ],
    pages: {
      overview: p('Run A/B tests tied to your metrics and let Txlemetry call the winner.', [
        S('What are experiments', { p: ['Experiments measure whether a change actually moves a metric. Variants are assigned with a feature flag, exposures and goals are tracked on your event data, and Txlemetry computes the statistics — so the decision is grounded in evidence, not opinion.'] }),
        S('How it fits together', { list: ['A feature flag assigns each user a variant, consistently.', 'An exposure event marks who saw which variant.', 'Your goal metric (a funnel or trend) is compared across variants.', 'The engine reports each variant’s probability of being best.'] }),
      ]),
      create: p('Set up a test from hypothesis to launch.', [
        S('Steps', { steps: ['Create an experiment: name it and write the hypothesis.', 'Choose the primary metric — a funnel (conversion) or trend (count/value).', 'Define the variants — control plus one or more tests — and traffic split.', 'Implement the variant behavior in code by reading the experiment’s flag.', 'Launch, and let it run until results are conclusive.'] }),
      ]),
      metrics: p('What you measure decides what you learn.', [
        S('Primary metric', { p: ['The primary metric is the single number the experiment exists to move — conversion through a funnel, count of a key event, or a property sum (e.g. revenue). Decide it before launching to avoid cherry-picking afterwards.'] }),
        S('Secondary metrics', { p: ['Add secondary and guardrail metrics to catch side effects — e.g. a variant that raises signups but hurts retention.'] }),
      ]),
      variants: p('How users are split.', [
        S('Assignment', { p: ['Assignment is deterministic per distinct ID: the same user always sees the same variant, across sessions and devices, as long as identification is consistent. Splits can be equal or weighted.'] }),
        S('Exposure', { p: ['A user counts as exposed the first time the flag is evaluated for them. Only exposed users enter the analysis, keeping the comparison fair.'] }),
      ]),
      results: p('Interpreting the numbers.', [
        S('Overview', { p: ['The results view shows each variant’s metric value, the observed uplift versus control, and the probability that each variant is the best. When the probability crosses the significance threshold, the experiment is marked conclusive.'] }),
        S('Caution', { list: ['Don’t stop early on a lucky streak — respect the planned duration.', 'Check secondary metrics before shipping the winner.', 'A conclusive "no effect" is also a valid, useful result.'] }),
      ]),
      'no-code': p('Test copy and UI without a deploy.', [
        S('Overview', { p: ['No-code experiments let you define visual changes (text, styles, element visibility) on top of a variant from the toolbar, so marketing-style tests don’t need engineering time.'] }),
      ]),
      'sample-size': p('How long to run a test.', [
        S('Overview', { p: ['Duration depends on traffic, baseline conversion and the effect size you care about. The setup screen estimates the days needed from your recent traffic. Small effects on low-traffic pages take long — consider testing bigger changes or higher-traffic surfaces.'] }),
      ]),
      'best-practices': p('Running trustworthy experiments.', [
        S('Recommendations', { list: ['One primary metric, decided upfront.', 'Run full weeks to average out weekday/weekend cycles.', 'Don’t peek-and-stop; wait for conclusiveness.', 'Document the hypothesis and the decision, win or lose.'] }),
      ]),
      faq: p('Common questions about experiments.', [
        S('FAQ', { qa: [['Can I run several experiments at once?', 'Yes — independent random assignment means concurrent experiments generally don’t bias each other.'], ['What if I change a running experiment?', 'Changing variants or metrics mid-flight invalidates the comparison; restart instead.'], ['Do experiments work server-side?', 'Yes — read the flag in your backend and track the exposure event there.']] }),
      ]),
    },
  };

  DOCS['surveys'] = {
    toc: [
      { label: 'Get started', items: [['overview', 'Overview'], ['create-first', 'Create your first survey']] },
      { label: 'Features', items: [['question-types', 'Question types'], ['targeting', 'Targeting & display'], ['customization', 'Customization'], ['custom-ui', 'Custom survey UI'], ['results', 'Analyzing results']] },
      { label: 'Templates', items: [['nps', 'NPS'], ['csat', 'CSAT'], ['churn', 'Churn surveys']] },
      { label: 'Reference', items: [['troubleshooting', 'Troubleshooting'], ['faq', 'FAQ']] },
    ],
    pages: {
      overview: p('Collect in-product feedback without bolting on another tool.', [
        S('What are surveys', { p: ['Surveys let you ask users questions directly in your product — satisfaction scores, open feedback, interest in a feature — and analyze the responses next to the rest of your product data. Because targeting uses the same properties, cohorts and flags as everything else, you can ask exactly the right users at exactly the right moment.'] }),
        S('Typical uses', { list: ['NPS and CSAT programs.', 'Feedback prompts after using a new feature.', 'Churn/cancellation reasons.', 'Recruiting users for interviews.'] }),
      ]),
      'create-first': p('From zero to a live survey in minutes.', [
        S('Requirements', { p: ['Surveys render through the same JavaScript snippet/SDK used for capture — if events flow, surveys can display. No extra installation is needed on the web.'] }),
        S('Steps', { steps: ['Open Surveys and create a new survey (blank or from a template).', 'Write the questions and choose their types.', 'Define who sees it and where (URL, properties, cohort or flag).', 'Preview it, then launch. Responses stream into the results view.'] }),
      ]),
      'question-types': p('Pick the right format for the question.', [
        S('Available types', { list: ['Rating (1–5, 1–10 or emoji) — for scores like NPS/CSAT.', 'Single choice — pick one option.', 'Multiple choice — pick several.', 'Open text — free-form feedback.', 'Link — drive users to an external page (e.g. book an interview).'] }),
        S('Multi-step surveys', { p: ['Chain several questions with optional branching, so a low rating can be followed by "what went wrong?" while a high one asks for a review.'] }),
      ]),
      targeting: p('Who sees the survey, where and when.', [
        S('Conditions', { list: ['URL contains/matches — show only on certain pages.', 'Person properties and cohorts — segment precisely.', 'Feature flag — tie display to a rollout.', 'Wait period and response limits — avoid over-surveying the same person.'] }),
        S('Scheduling', { p: ['Control when a survey starts and stops, and cap total responses so analysis stays manageable.'] }),
      ]),
      customization: p('Make it look like your product.', [
        S('Overview', { p: ['Adjust colors, position, border radius and button text from the survey editor — no code. The widget inherits your font by default so it blends into the page.'] }),
      ]),
      'custom-ui': p('Render surveys with your own components.', [
        S('Overview', { p: ['If the built-in widget doesn’t fit, fetch active surveys from the SDK and render them with your own UI, then send responses back with a capture call. You keep full visual control while targeting and analysis stay in Txlemetry.'] }),
      ]),
      results: p('From responses to decisions.', [
        S('Overview', { p: ['Each survey has a results view: response counts, score distributions, and every open-text answer. Because responses are events, you can also slice them in product analytics — e.g. NPS by plan, or churn reasons by cohort.'] }),
      ]),
      nps: p('Measure loyalty with Net Promoter Score.', [
        S('Overview', { p: ['The NPS template asks "how likely are you to recommend us?" on a 0–10 scale. Detractors (0–6), passives (7–8) and promoters (9–10) are classified automatically, and the score trend is tracked over time.'] }),
        S('Tips', { list: ['Survey a rolling sample, not everyone at once.', 'Follow the score with an open "why?" question.', 'Compare NPS across plans or cohorts to find friction.'] }),
      ]),
      csat: p('Measure satisfaction after key moments.', [
        S('Overview', { p: ['CSAT asks "how satisfied are you?" right after an experience — onboarding, support, a purchase. Trigger it on the event that ends the experience so feedback is fresh.'] }),
      ]),
      churn: p('Learn why users leave.', [
        S('Overview', { p: ['Show a short survey in the cancellation flow asking the reason for leaving. Pair the answers with usage data to separate price complaints from product gaps.'] }),
      ]),
      troubleshooting: p('Survey not showing?', [
        S('Checklist', { steps: ['Confirm the survey is launched (not draft) and within its schedule.', 'Check the display conditions against the current user’s properties and URL.', 'The same user won’t see a survey twice unless configured to.', 'Ad blockers can suppress the widget for some visitors.'] }),
      ]),
      faq: p('Common questions about surveys.', [
        S('FAQ', { qa: [['Do surveys work on mobile?', 'Yes — mobile SDKs support surveys, with the same targeting.'], ['Can I export responses?', 'Yes — responses are events, so they export like any other data.'], ['Can I A/B test a survey?', 'Yes — gate it with a flag or experiment like any feature.']] }),
      ]),
    },
  };

  DOCS['error-tracking'] = {
    toc: [
      { label: 'Get started', items: [['overview', 'Overview'], ['installation', 'Installation']] },
      { label: 'Core features', items: [['capture', 'Capturing exceptions'], ['stack-traces', 'Stack traces & source maps'], ['grouping', 'Issue grouping'], ['management', 'Issue management'], ['alerts', 'Alerts'], ['releases', 'Releases & deploys']] },
      { label: 'Platform', items: [['with-platform', 'With replay & analytics']] },
      { label: 'Reference', items: [['sdks', 'Supported SDKs'], ['faq', 'FAQ']] },
    ],
    pages: {
      overview: p('Capture, group and triage exceptions with full user context.', [
        S('What is error tracking', { p: ['Error tracking captures the exceptions your application throws, groups them into issues, and shows each one with the users affected, the sessions where it happened and the releases involved. Instead of a bare stack trace, you get the full story around every failure.'] }),
        S('Why here and not a separate tool', { list: ['Errors link to session replays — watch the crash happen.', 'Errors link to persons — see exactly who is affected.', 'Errors join analytics — chart error rates like any metric.', 'One snippet, one data model, no extra vendor.'] }),
      ]),
      installation: p('Enable exception capture in your stack.', [
        S('Web', { p: ['With the JavaScript snippet installed, enable exception autocapture and unhandled errors and promise rejections are reported automatically. You can also capture handled errors explicitly from a try/catch.'] }),
        S('Backend & mobile', { p: ['Server SDKs (Node, Python, Ruby, Go, PHP, .NET, Rust, Elixir…) and mobile SDKs (iOS, Android, React Native, Flutter) each expose a capture-exception call plus automatic hooks for their framework — pick your platform in SDKs & install.'] }),
      ]),
      capture: p('Automatic and manual exception capture.', [
        S('Automatic', { p: ['Unhandled exceptions, unhandled promise rejections and framework-level errors are captured with no code changes once enabled.'] }),
        S('Manual', { p: ['Capture handled errors with the SDK’s captureException call, attaching extra properties (context, tags) that later help filtering and grouping.'] }),
      ]),
      'stack-traces': p('Readable traces in production.', [
        S('Source maps', { p: ['Upload source maps at build time so minified production traces resolve to your original files, lines and function names. The CLI integrates into CI so maps ship with every release.'] }),
        S('Code context', { p: ['Traces show the surrounding source lines for each frame, and optionally the values of local variables at the moment of the crash, so many issues are diagnosable without reproducing.'] }),
      ]),
      grouping: p('From thousands of events to a handful of issues.', [
        S('Overview', { p: ['Identical exceptions are grouped into a single issue by fingerprint — type, message and trace shape. Each issue tracks first seen, last seen, frequency and affected users.'] }),
        S('Custom grouping', { p: ['When the default fingerprint is too coarse or too fine, set a custom grouping key on capture to control exactly how events cluster.'] }),
      ]),
      management: p('Triage and own what breaks.', [
        S('Workflow', { list: ['States: active, resolved, suppressed — resolve when fixed; a regression reopens it.', 'Assign issues to teammates or teams.', 'Filter by frequency, recency, release or affected users to prioritize.', 'Link issues to your tracker (Linear, GitHub, GitLab).'] }),
      ]),
      alerts: p('Know when something new breaks.', [
        S('Overview', { p: ['Set alerts for new issues, regressions or frequency spikes and deliver them to email or Slack, so the team learns about a breakage from a notification — not from a customer.'] }),
      ]),
      releases: p('Tie errors to the code that shipped.', [
        S('Overview', { p: ['Tag events with a release identifier at build time. Issues then show which release introduced them and whether a fix actually shipped, making "did we break it yesterday?" a filter instead of an investigation.'] }),
      ]),
      'with-platform': p('Errors joined with the rest of your data.', [
        S('Together with', { list: ['Session replay — jump from an issue to recordings of it happening.', 'Product analytics — chart error rate against releases or usage.', 'Feature flags — check if a flag rollout correlates with a spike.', 'Person profiles — see every error a specific user hit before a support ticket.'] }),
      ]),
      sdks: p('Platform coverage.', [
        S('Overview', { p: ['Exception capture is available across the web SDK, major frontend frameworks (Next.js, React, Angular, Svelte, Vue/Nuxt), backends (Node, Python, Ruby/Rails, Go, PHP, .NET, Rust, Elixir, NestJS, Hono) and mobile (iOS, Android, React Native, Flutter), plus a manual API for anything else.'] }),
      ]),
      faq: p('Common questions about error tracking.', [
        S('FAQ', { qa: [['Will it duplicate my current error tool?', 'You can run both during a migration; many teams consolidate once they see errors joined with replays and analytics.'], ['How is noise controlled?', 'Suppress known-noisy issues, rate-limit clients, and filter by release or environment.'], ['Are errors billed like events?', 'Exception events count towards usage like other events; suppression and sampling keep volume in check.']] }),
      ]),
    },
  };

  DOCS['data-pipelines'] = {
    toc: [
      { label: 'Get started', items: [['overview', 'Overview']] },
      { label: 'Pipelines', items: [['sources', 'Sources'], ['transformations', 'Transformations'], ['destinations', 'Destinations'], ['batch-exports', 'Batch exports']] },
      { label: 'Reference', items: [['use-cases', 'Use cases'], ['monitoring', 'Monitoring & retries'], ['faq', 'FAQ']] },
    ],
    pages: {
      overview: p('Route product signals in and out of your stack without losing context.', [
        S('What are data pipelines', { p: ['Data pipelines connect Txlemetry to the rest of your tools in both directions: sources bring external data in, transformations reshape events in flight, and destinations deliver events out — in real time or in scheduled batches. Delivery, retries and monitoring are handled for you.'] }),
        S('The three pieces', { list: ['Sources — ingest data from databases and SaaS tools.', 'Transformations — filter, reshape or enrich events before they are stored or forwarded.', 'Destinations — send events to warehouses, queues, webhooks and SaaS tools.'] }),
      ]),
      sources: p('Bring external data in.', [
        S('Overview', { p: ['Connect a database (e.g. Postgres, MySQL) or a SaaS tool (e.g. billing, CRM, support) as a source and its tables sync on a schedule into the data warehouse, where they can be joined with your events using SQL.'] }),
        S('Steps', { steps: ['Open Data pipelines and add a source.', 'Authorize the connection and pick the tables to sync.', 'Choose the sync frequency.', 'Query the synced tables alongside events in the SQL editor.'] }),
      ]),
      transformations: p('Shape events before they land.', [
        S('Overview', { p: ['Transformations run on events as they are ingested: drop noisy events, strip or hash sensitive properties, normalize values, or add computed fields. They apply before storage, so downstream insights and destinations all see the cleaned data.'] }),
      ]),
      destinations: p('Send events anywhere, as they happen.', [
        S('Overview', { p: ['Realtime destinations forward matching events to other systems within seconds — webhooks, queues, marketing tools, CRMs, Slack and more. Each destination has its own filter, so you send only what the target needs.'] }),
        S('Steps', { steps: ['Add a destination and pick the service (or a generic webhook).', 'Filter which events and properties are forwarded.', 'Map fields to the destination’s format.', 'Enable it and watch deliveries in the monitoring tab.'] }),
      ]),
      'batch-exports': p('Bulk delivery on a schedule.', [
        S('Overview', { p: ['Batch exports deliver your events to a warehouse or object storage (e.g. BigQuery, Snowflake, S3, Postgres) on an hourly or daily schedule, with backfills for historical data. Use them when completeness matters more than latency.'] }),
      ]),
      'use-cases': p('What teams build with pipelines.', [
        S('Examples', { list: ['Keep the data warehouse in sync with product events for BI.', 'Send qualified-signup events to the CRM in real time.', 'Strip PII from events before storage with a transformation.', 'Alert a Slack channel when a high-value action happens.'] }),
      ]),
      monitoring: p('Trust the pipe.', [
        S('Overview', { p: ['Every source, transformation and destination reports runs, failures and retry state. Failed deliveries retry automatically with backoff; persistent failures surface in the UI so nothing disappears silently.'] }),
      ]),
      faq: p('Common questions about data pipelines.', [
        S('FAQ', { qa: [['Do destinations slow ingestion?', 'No — delivery is asynchronous and does not block event capture.'], ['Can I replay missed data?', 'Batch exports support backfills over a date range.'], ['Are transformations reversible?', 'No — they apply at ingestion. Keep a raw copy via a destination if you need the original.']] }),
      ]),
    },
  };

  DOCS['data-warehouse'] = {
    toc: [
      { label: 'Get started', items: [['overview', 'Overview'], ['link-source', 'Link your first source']] },
      { label: 'Working with data', items: [['query', 'Query with SQL'], ['joins', 'Joins'], ['views', 'Views & materialization'], ['unify', 'Unify customer data']] },
      { label: 'Reference', items: [['faq', 'FAQ']] },
    ],
    pages: {
      overview: p('Join product, revenue and business data in one queryable place.', [
        S('What is the data warehouse', { p: ['The data warehouse lets you bring external data — billing, CRM, support, your own database — into Txlemetry and query it with SQL alongside your product events. Analyses can then span behavior and business context without exporting anything to a separate BI stack.'] }),
        S('What you can do', { list: ['Sync tables from databases and SaaS tools on a schedule.', 'Query synced tables and events together with SQL.', 'Join external rows to persons and events.', 'Save queries as views and materialize the expensive ones.', 'Use warehouse data inside regular insights.'] }),
      ]),
      'link-source': p('Connect a database or SaaS tool.', [
        S('Steps', { steps: ['Open Data warehouse and add a source (Postgres, MySQL, billing/CRM tools, or files in object storage).', 'Authorize the connection and select the tables to sync.', 'Pick a sync schedule.', 'Once the first sync completes, the tables appear in the SQL editor’s schema.'] }),
        S('Notes', { list: ['Syncs are incremental where the source supports it.', 'Each table shows its last sync time and row count.', 'Sensitive columns can be excluded from the sync.'] }),
      ]),
      query: p('SQL over events and external tables.', [
        S('Overview', { p: ['The SQL editor exposes your events, persons and every synced table in one schema. Standard SQL (with helpful extensions for event data) lets you answer questions the visual builder can’t, and results can be saved as insights or added to dashboards.'] }),
        S('Tips', { list: ['Explore the schema tree to see available tables and columns.', 'Use LIMIT while iterating on a query.', 'Save frequent queries as views to reuse them.'] }),
      ]),
      joins: p('Connect external rows to your product data.', [
        S('Overview', { p: ['Define a join between a warehouse table and persons (or events) — e.g. billing customers joined on email — and the external columns become usable as if they were person properties: in filters, breakdowns and cohorts.'] }),
        S('Steps', { steps: ['Open the joins configuration in Data warehouse.', 'Pick the table, and the key on each side (e.g. customers.email ↔ person.email).', 'Save — joined fields are now available across insights.'] }),
      ]),
      views: p('Name queries; speed up the heavy ones.', [
        S('Views', { p: ['A view is a saved query that behaves like a table. Use views to encapsulate cleaning/renaming logic once, so every analysis starts from tidy data.'] }),
        S('Materialization', { p: ['Materializing a view precomputes and stores its result on a schedule, so expensive joins or aggregations become instant to query. Ideal for daily rollups used by many dashboards.'] }),
      ]),
      unify: p('One view of the customer.', [
        S('Overview', { p: ['With sources linked and joins defined, revenue, plan and lifecycle data sit next to behavior: chart MRR against feature usage, break retention down by plan from billing, or target an experiment at customers above a revenue threshold.'] }),
      ]),
      faq: p('Common questions about the data warehouse.', [
        S('FAQ', { qa: [['Is this a replacement for my Snowflake/BigQuery?', 'It can be, for product-adjacent analysis; you can also keep both and use batch exports to feed your existing warehouse.'], ['How fresh is synced data?', 'As fresh as the sync schedule you choose per source.'], ['Does querying synced tables cost extra?', 'Storage and sync volume follow warehouse pricing; querying is included.']] }),
      ]),
    },
  };

  DOCS['dashboards'] = {
    toc: [
      { label: 'Get started', items: [['overview', 'Overview'], ['create', 'Create a dashboard']] },
      { label: 'Features', items: [['tiles', 'Tiles & layout'], ['filters', 'Dashboard filters'], ['sharing', 'Sharing & embedding'], ['subscriptions', 'Subscriptions & alerts'], ['templates', 'Templates']] },
      { label: 'Reference', items: [['best-practices', 'Best practices'], ['faq', 'FAQ']] },
    ],
    pages: {
      overview: p('Collect the insights that matter into shareable, filterable boards.', [
        S('What are dashboards', { p: ['A dashboard is a curated set of insights a team watches together — the activation funnel, this week’s retention, error rate by release. Every tile is a live insight: change the dashboard’s date range or filters and all tiles update at once, always describing the same slice of data.'] }),
        S('Typical dashboards', { list: ['Company KPIs for leadership.', 'A launch dashboard combining adoption, errors and replays.', 'A team board tracking one product area in depth.'] }),
      ]),
      create: p('From empty board to team habit.', [
        S('Steps', { steps: ['Open Dashboards and create one (blank or from a template).', 'Add tiles: pin existing insights, or create new ones inline.', 'Arrange and resize tiles by dragging.', 'Set a default date range so the board opens with the right window.'] }),
      ]),
      tiles: p('What lives on a board.', [
        S('Tile types', { list: ['Insights — trends, funnels, retention, paths, SQL results.', 'Text tiles — headings and notes to give the board narrative.', 'Each tile links back to its insight for deeper exploration.'] }),
      ]),
      filters: p('One filter, every tile.', [
        S('Overview', { p: ['Dashboard-level filters and date overrides apply to every tile simultaneously — e.g. filter the whole board to one country or one plan. Underlying insights are not modified; the override lives on the dashboard.'] }),
      ]),
      sharing: p('Get the numbers in front of people.', [
        S('Options', { list: ['Share with teammates via a direct link.', 'Public sharing generates a read-only link for people without an account.', 'Embed a dashboard in another tool with the embed link.', 'Access controls restrict who can edit vs view.'] }),
      ]),
      subscriptions: p('The board comes to you.', [
        S('Overview', { p: ['Subscribe a person or channel to a dashboard and a snapshot arrives on schedule (e.g. Monday 9:00 to Slack or email). Alerts on individual insights notify when a metric crosses a threshold, turning dashboards from something you check into something that warns you.'] }),
      ]),
      templates: p('Start from a proven layout.', [
        S('Overview', { p: ['Templates pre-populate a dashboard for common needs — web analytics overview, growth metrics, feature launch — which you then adapt. Faster than a blank page, and a good way to learn insight patterns.'] }),
      ]),
      'best-practices': p('Dashboards people actually use.', [
        S('Recommendations', { list: ['One question per dashboard; split boards that try to answer everything.', 'Put the single most important number top-left.', 'Use text tiles to explain what "good" looks like.', 'Review and prune quarterly — dead tiles erode trust.'] }),
      ]),
      faq: p('Common questions about dashboards.', [
        S('FAQ', { qa: [['Do dashboards auto-refresh?', 'Tiles cache results and refresh periodically; you can force refresh any time.'], ['Can a tile use a different date range?', 'Yes — tiles can pin their own range, exempt from the dashboard override.'], ['Is there a limit of tiles?', 'Practically no, but past ~20 tiles consider splitting the board.']] }),
      ]),
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

  /* Code block with language label + copy button (PostHog-docs style). */
  function CodeBlock({ block }) {
    const [copied, setCopied] = useState(false);
    return (
      <div className="mt-4 rounded-[10px] overflow-hidden border border-[#3a322e]">
        <div className="flex items-center justify-between px-3 py-1.5" style={{ background: '#241e1b' }}>
          <span className="text-[11px] font-semibold uppercase tracking-[1px]" style={{ color: '#a89d96' }}>{block.lang || 'Code'}</span>
          <button type="button" title={copied ? 'Copied!' : 'Copy to clipboard'}
            onClick={() => { try { navigator.clipboard.writeText(block.code); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch (e) { /* clipboard unavailable */ } }}
            className="flex items-center justify-center w-6 h-6 rounded hover:bg-white/10 transition-colors">
            {copied ? (
              <svg viewBox="0 0 16 16" className="w-[14px] h-[14px]" fill="none" stroke="#8fd39a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5l3.5 3.5L13 4.5"/></svg>
            ) : (
              <svg viewBox="0 0 16 16" className="w-[14px] h-[14px]" fill="none" stroke="#d8cfc7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="5.5" y="5.5" width="8" height="8" rx="1.5"/><path d="M10.5 5.5v-2A1.5 1.5 0 009 2H4a1.5 1.5 0 00-1.5 1.5v5A1.5 1.5 0 004 10h2"/></svg>
            )}
          </button>
        </div>
        <pre className="px-4 py-3 overflow-x-auto m-0 text-[12.5px] leading-[1.65]" style={{ background: '#1c1715', color: '#f0e9e2' }}><code>{block.code}</code></pre>
      </div>
    );
  }

  function DocTable({ table }) {
    return (
      <div className="mt-4 overflow-x-auto rounded-[10px] border border-[#ece7e2]">
        <table className="w-full border-collapse text-[13.5px]">
          <thead>
            <tr>{table.head.map((h, i) => <th key={i} className="text-left px-3 py-2 bg-[#f6f1ec] text-[#17100e] font-semibold border-b border-[#ece7e2]">{h}</th>)}</tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <tr key={i}>{row.map((c, j) => <td key={j} className="px-3 py-2 text-[#4a423e] border-b border-[#f0ebe6] align-top">{c}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function DocSection({ s, id }) {
    return (
      <section id={id} className="py-6 border-t border-[#f0ebe6] first:border-t-0" style={{ scrollMarginTop: '110px' }}>
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
        {s.table && <DocTable table={s.table} />}
        {s.code && s.code.map((block, i) => <CodeBlock key={i} block={block} />)}
        {s.note && (
          <div className="mt-4 rounded-[10px] bg-[#f6f1ec] border-l-[3px] border-[#b8552e] px-4 py-3">
            <p className="text-[#3a332f] text-[14px] leading-[1.55]"><span className="font-semibold">Note: </span>{s.note}</p>
          </div>
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
          <div className="max-w-[1400px] mx-auto px-6 pb-20 flex gap-10">
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
              <div className="mt-4">{page.sections.map((s, i) => <DocSection key={i} s={s} id={'sec-' + i} />)}</div>

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

            {/* Right "Jump to" panel: per-document section index with smooth scroll.
                Uses scrollIntoView (not location.hash) so it never fights the
                #category/doc routing hash. */}
            <aside className="hidden xl:block w-[200px] shrink-0">
              <div className="sticky top-[124px]">
                <p className="text-[#9a908a] text-[11px] font-semibold uppercase tracking-[1px] mb-2">Jump to</p>
                <ul className="space-y-0.5 border-l border-[#ece7e2]">
                  {page.sections.map((s, i) => (
                    <li key={i}>
                      <button type="button"
                        onClick={() => { const el = document.getElementById('sec-' + i); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                        className="block w-full text-left pl-3 py-1 text-[12.5px] leading-[1.35] text-[#5b514d] hover:text-[#17100e] transition-colors">
                        {s.h}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </PageShell>
    );
  }

  window.DocsPage = DocsPage;
})();
