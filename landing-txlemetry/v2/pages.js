/* global React, TxV2 */
(function () {
  const h = React.createElement;
  const { PageShell } = TxV2;
  function CategoryPage({ title, eyebrow, lede, cards, children }) {
    return h(PageShell, null,
      h('section', { className: 'tx-page-hero' }, h('div', { className: 'container' }, h('div', { className: 'h-eyebrow' }, eyebrow), h('h1', null, title), h('p', null, lede))),
      h('section', { className: 'section' }, h('div', { className: 'container tx-card-grid' }, cards.map((c) => h('article', { key: c[0], className: 'tx-info-card' }, h('span', null, c[0]), h('h2', null, c[1]), h('p', null, c[2]))))),
      children
    );
  }
  function DeepSection({ eyebrow, title, lede, items, dark }) {
    return h('section', { className: dark ? 'section tx-deep-section is-dark' : 'section tx-deep-section' },
      h('div', { className: 'container tx-split' },
        h('div', null, h('div', { className: 'h-eyebrow' }, eyebrow), h('h2', { className: 'h-section' }, title), h('p', { className: 'lede' }, lede)),
        h('div', { className: 'tx-deep-list' }, items.map((item) => h('article', { key: item[0] }, h('strong', null, item[0]), h('span', null, item[1]))))
      )
    );
  }
  function DocsPage() {
    return h(CategoryPage, { eyebrow: 'Docs', title: 'Documentation as a launch console.', lede: 'Install SDKs, capture first events, define actions, connect replay, build flags, model warehouse data, and ask AI for the next query.', cards: [['01', 'Install', 'Web, backend, mobile, and server SDK entry points.'], ['02', 'Instrument', 'Events, identity, properties, autocapture, and endpoints.'], ['03', 'Analyze', 'Funnels, paths, retention, SQL, BI, and cohorts.'], ['04', 'Ship', 'Feature flags, experiments, surveys, workflows, and destinations.']],
      children: h(React.Fragment, null,
        h(DeepSection, { eyebrow: 'Implementation paths', title: 'From first event to full Product OS.', lede: 'PostHog docs are organized around sending events, identifying users, creating insights, configuring replay, flags, surveys, warehouse, pipelines, and AI. Txlemetry turns that into guided paths.', items: [['Web install', 'Load the SDK, capture pageviews, identify users, and enrich properties.'], ['Backend install', 'Capture server-side events, groups, feature flag checks, and ingestion endpoints.'], ['Mobile install', 'Track activation, retention, crash/error context, and release cohorts.'], ['Warehouse path', 'Connect sources, model rows, query SQL, build BI, and export downstream.']] }),
        h('section', { className: 'section tx-console-section' }, h('div', { className: 'container' },
          h('div', { className: 'tx-console-card' },
            h('div', null, h('div', { className: 'h-eyebrow' }, 'Command map'), h('h2', null, 'Docs that behave like a product checklist.'), h('p', null, 'Every command represents a concrete implementation job: capture, replay, rollout, survey, warehouse, and observe AI products.')),
            h('pre', null, 'txlemetry init web\ncapture first_event --identity user_id\nopen replay --from funnel_dropoff\nship flag --rollout 10%\nmodel warehouse --source stripe\nobserve ai --trace conversations')
          )
        ))
      )
    });
  }
  function CommunityPage() {
    return h(CategoryPage, { eyebrow: 'Community', title: 'Roadmap, changelog, requests, and builder signal.', lede: 'Txlemetry follows the PostHog spirit: public product direction, community feedback, feature requests, changelog rhythm, and technical writing for builders.', cards: [['Changelog', 'What shipped recently', 'A visible cadence for product improvements and new capabilities.'], ['Roadmap', 'Vote on what comes next', 'A feedback loop for the teams building with the product.'], ['Newsletter', 'Product for Engineers', 'Educational product writing, not generic enterprise theatre.'], ['Community', 'Support and signal', 'A place for implementation questions, workflows, and product ideas.']],
      children: h(React.Fragment, null,
        h(DeepSection, { dark: true, eyebrow: 'Community loops', title: 'A living product newspaper.', lede: 'The community page is not just support. It is a loop between product teams, roadmap decisions, feature requests, implementation lessons, and release notes.', items: [['Feature requests', 'Collect requests, connect them to cohorts and product signals, and show review status.'], ['Public roadmap', 'Expose what is planned, shipping, under review, or intentionally not planned.'], ['Changelog cadence', 'Turn releases into product education and adoption prompts.'], ['Builder writing', 'Keep the voice technical, opinionated, and useful for product engineers.']] }),
        h('section', { className: 'section tx-community-paper' }, h('div', { className: 'container' },
          h('h2', { className: 'h-section' }, 'Signal worth reading.'),
          h('div', { className: 'tx-paper-grid' }, [['Release notes', 'New flags, replay filters, experiment metrics, warehouse sources, and AI observability improvements.'], ['Implementation diaries', 'How to instrument activation, debug churn, and model product revenue.'], ['User questions', 'Recurring community questions become docs, templates, and workflows.']].map((item) => h('article', { key: item[0] }, h('span', null, item[0]), h('p', null, item[1]))))
        ))
      )
    });
  }
  function CompanyPage() {
    return h(CategoryPage, { eyebrow: 'Company', title: 'Transparent by default.', lede: 'Open-source roots, public direction, generous free tiers, usage pricing, technical support, and a product suite built for teams who prefer proof over sales pressure.', cards: [['Open core', 'Auditable foundation', 'Product analytics infrastructure should be inspectable.'], ['Usage pricing', 'No surprise bill', 'Each meter is clear, visible, and tied to a product surface.'], ['Technical support', 'Implementation-aware', 'Support should understand events, SDKs, data, and product questions.'], ['Trust layer', 'Security and governance', 'A credible path for teams that need scale, procurement, and compliance.']],
      children: h(React.Fragment, null,
        h(DeepSection, { eyebrow: 'Operating model', title: 'Built for teams that inspect before they buy.', lede: 'PostHog differentiates itself with open-source roots, transparent pricing, public direction, technical docs, and builder-first communication. Txlemetry should communicate the same trust model.', items: [['Open source posture', 'Make the core product and data model understandable instead of opaque.'], ['Public direction', 'Roadmap, changelog, and community signal make product direction legible.'], ['Technical onboarding', 'Support is implementation-aware: SDKs, events, flags, warehouse, replay, and AI traces.'], ['Governance path', 'Scale teams need retention, projects, support, procurement, and controls.']] }),
        h('section', { className: 'section tx-company-manifesto' }, h('div', { className: 'container' },
          h('h2', null, 'No black boxes. No surprise bill. No sales maze.'),
          h('p', null, 'Txlemetry should feel like a product infrastructure company that shows its work: product specs, pricing meters, open-source roots, and a clear path from free tier to enterprise governance.')
        ))
      )
    });
  }
  function AllFeaturesPage() {
    const featureRows = [
      ['Analyze', 'Trends, funnels, paths, retention, lifecycle, stickiness, cohorts, web analytics, and dashboards.'],
      ['Observe', 'Session replay, error tracking, logs, AI traces, spans, impacted users, and release context.'],
      ['Ship', 'Feature flags, local evaluation, payloads, gradual rollouts, experiments, and guardrail metrics.'],
      ['Listen', 'In-product surveys, NPS, PMF, feedback inbox, product requests, and roadmap signal.'],
      ['Data', 'Warehouse, SQL, BI, sources, data pipelines, batch exports, realtime destinations, and endpoints.'],
      ['AI', 'Natural-language questions, SQL generation, AI observability, cost, latency, and model quality.'],
    ];
    return h(CategoryPage, { eyebrow: 'All features', title: 'Every PostHog surface, reorganized for Txlemetry.', lede: 'A single page for the complete product map: analytics, replay, flags, experiments, surveys, warehouse, pipelines, AI observability, logs, workflows, inbox, and endpoints.', cards: [['Analytics', 'Measure product behavior', 'Funnels, trends, retention, paths, cohorts, lifecycle, web analytics, and dashboards.'], ['Release', 'Ship safely', 'Flags, payloads, rollouts, experiments, guardrails, rollback context, and release analysis.'], ['Data', 'Model and move events', 'Warehouse, SQL, sources, BI, pipelines, destinations, endpoints, and reverse ETL patterns.'], ['Observe', 'Debug what users feel', 'Replay, errors, logs, AI traces, cost, latency, and impacted cohorts.']],
      children: h(React.Fragment, null,
        h(DeepSection, { eyebrow: 'Feature taxonomy', title: 'A category for every product job.', lede: 'Txlemetry uses a broad product catalogue with a PostHog-style taxonomy so teams can scan the whole platform without guessing where a capability lives.', items: featureRows }),
        h('section', { className: 'section tx-community-paper' }, h('div', { className: 'container' },
          h('h2', { className: 'h-section' }, 'Built as connected surfaces, not isolated tools.'),
          h('div', { className: 'tx-paper-grid' }, [['Event first', 'Every product starts from clean capture, identity, properties, groups, and endpoints.'], ['Context everywhere', 'Charts, replays, errors, flags, surveys, and AI traces all point back to product behavior.'], ['Action loops', 'Use cohorts, flags, workflows, destinations, and feedback to turn insight into shipped change.']].map((item) => h('article', { key: item[0] }, h('span', null, item[0]), h('p', null, item[1]))))
        ))
      )
    });
  }
  function TechnologyPage() {
    return h(CategoryPage, { eyebrow: 'Technology', title: 'The stack behind product analytics infrastructure.', lede: 'Txlemetry explains the technical layer: SDKs, ingestion, identity, feature evaluation, replay capture, warehouse modeling, AI traces, privacy, and scale.', cards: [['SDKs', 'Capture everywhere', 'JavaScript, backend, mobile, server, API, and endpoint instrumentation patterns.'], ['Identity', 'Join product context', 'Persons, groups, properties, cohorts, sessions, and event schemas connected across products.'], ['Evaluation', 'Ship close to users', 'Feature flags, payloads, local evaluation, bootstrapping, and rollout controls.'], ['Warehouse', 'Query the truth', 'SQL, BI, sources, models, exports, and downstream syncs.']],
      children: h(React.Fragment, null,
        h(DeepSection, { dark: true, eyebrow: 'Architecture', title: 'From capture to decision in one flow.', lede: 'The technology story maps the actual product chain: collect events, preserve identity, enrich context, analyze behavior, observe failures, experiment safely, and move data downstream.', items: [['Ingestion', 'Capture pageviews, custom events, exceptions, logs, AI spans, survey responses, and workflow triggers.'], ['Storage', 'Keep events, persons, groups, sessions, rows, traces, and recordings queryable by product teams.'], ['Computation', 'Build funnels, retention, paths, cohorts, SQL, experiment results, and cost analysis.'], ['Activation', 'Target flags, run workflows, export data, and close loops from feedback to release.']] }),
        h('section', { className: 'section tx-console-section' }, h('div', { className: 'container' },
          h('div', { className: 'tx-console-card' },
            h('div', null, h('div', { className: 'h-eyebrow' }, 'Technical promise'), h('h2', null, 'Observable, queryable, reversible.'), h('p', null, 'A product analytics stack should let teams inspect what happened, query why it happened, and reverse a release before it becomes a support incident.')),
            h('pre', null, 'capture -> identify -> enrich -> analyze\nreplay -> error -> impact -> rollback\nwarehouse -> sql -> ai -> export\nsurvey -> cohort -> workflow -> ship')
          )
        ))
      )
    });
  }
  function StartupsPage() {
    return h(CategoryPage, { eyebrow: 'Startups', title: 'Start free. Keep the stack when you scale.', lede: 'A Txlemetry startup story: generous free allowances, open-source posture, quick onboarding, and usage pricing that does not punish early product learning.', cards: [['Free tier', 'Useful before procurement', 'Analytics events, replays, flags, survey responses, exceptions, rows, AI events, and logs start with allowances.'], ['Launch fast', 'Instrument in a day', 'SDKs, autocapture, templates, dashboards, replay filters, and flag rollouts accelerate first setup.'], ['Scale later', 'No migration cliff', 'Keep the same product OS as you add warehouse, AI observability, governance, and support.'], ['Open posture', 'Inspect the foundation', 'Builder-first docs, transparent pricing, and product specs make the system easier to trust.']],
      children: h(React.Fragment, null,
        h(DeepSection, { eyebrow: 'Startup path', title: 'A practical route from zero to product signal.', lede: 'Early teams need speed, not procurement theatre. Txlemetry makes the first product loop concrete: instrument, watch, ship, ask, model, and automate.', items: [['Week 1', 'Install SDKs, turn on autocapture, define activation events, and create the first funnel.'], ['Week 2', 'Use replay and surveys to understand drop-offs, then ship a small feature flag rollout.'], ['Month 1', 'Add experiments, cohorts, warehouse rows, and AI-assisted analysis for investor/product reporting.'], ['Scale', 'Add billing limits, retention, support, governance, and high-volume product meters.']] }),
        h('section', { className: 'section tx-company-manifesto' }, h('div', { className: 'container' },
          h('h2', null, 'The free tier should feel like momentum, not bait.'),
          h('p', null, 'Startups can learn with real analytics, real replay, real flags, real surveys, real warehouse paths, and real observability before choosing paid controls.')
        ))
      )
    });
  }
  function ReferenceRoutePage() {
    const path = window.location.pathname.replace(/\/+$/, '') || '/';
    const map = {
      '/ai-agent': ['PostHog AI', 'AI-native product analysis, SQL generation, and data modeling for teams building with Txlemetry.', [['Ask', 'Natural-language questions over product and warehouse data.'], ['Generate', 'SQL, models, and analysis paths from product questions.'], ['Explain', 'Metrics, funnels, cohorts, and anomalies in product language.']]],
      '/ai-agent/slack': ['AI Observability for collaboration', 'The Slack-agent route becomes the place for AI traces, incident context, and product signals that can move into team workflows.', [['Trace', 'LLM spans, conversations, latency, cost, and model quality.'], ['Route', 'Send important product and AI signals into workflows and destinations.'], ['Resolve', 'Connect logs, errors, replay, and impacted users before shipping a fix.']]],
      '/copilot': ['Product copilot', 'Copilot becomes the Txlemetry assistant layer: explain charts, generate SQL, summarize sessions, and guide teams through PostHog-style product work.', [['Analyze', 'Explain trends, funnels, retention, and cohort movement.'], ['Debug', 'Summarize replay, exceptions, logs, and release impact.'], ['Model', 'Draft SQL, warehouse models, and BI-ready metrics.']]],
      '/agent-customer': ['Customer signal OS', 'The customer-agent route is adapted into feedback, surveys, inbox, roadmap, and behavior loops for product teams.', [['Listen', 'Surveys, NPS, PMF, open text, feedback inbox, and feature requests.'], ['Connect', 'Tie customer signal to cohorts, sessions, events, and roadmap decisions.'], ['Act', 'Trigger workflows, follow-ups, and product changes.']]],
      '/agent-trust': ['Trust and control', 'Trust becomes security, governance, transparent pricing, open-source posture, billing limits, and implementation-aware support.', [['Govern', 'Projects, retention, SSO-ready path, support, billing alerts, and controls.'], ['Inspect', 'Open core posture, public specs, docs, and transparent usage meters.'], ['Audit', 'Release context, errors, replay, logs, and traceability.']]],
      '/how-agent-works': ['How Txlemetry works', 'A technical explanation of how events become insights, replays, flags, experiments, warehouse models, AI traces, and workflows.', [['Capture', 'SDKs, APIs, endpoints, identity, properties, groups, and autocapture.'], ['Understand', 'Analytics, replay, errors, logs, warehouse, surveys, and AI assistance.'], ['Ship', 'Flags, experiments, destinations, workflows, and feedback loops.']]],
      '/omnichannel': ['Omnichannel product data', 'Omnichannel becomes every source of product signal in one context: web, backend, mobile, warehouse, surveys, logs, AI, and feedback.', [['Sources', 'Web, server, mobile, warehouse, API, surveys, logs, and traces.'], ['Context', 'Users, groups, sessions, cohorts, properties, and journeys.'], ['Destinations', 'Pipelines, exports, workflows, and downstream tools.']]],
      '/how-it-works': ['The product loop', 'Txlemetry product loop: capture, analyze, observe, ship, listen, model, and automate.', [['Instrument', 'Events, identity, properties, and endpoints.'], ['Learn', 'Funnels, retention, replay, surveys, errors, and AI summaries.'], ['Improve', 'Flags, experiments, workflows, and destinations.']]],
      '/tickets': ['Product work intake', 'Tickets becomes the product work surface: bugs, feature requests, roadmap items, feedback loops, and operational follow-up.', [['Intake', 'Feedback, survey responses, requests, exceptions, and workflow triggers.'], ['Prioritize', 'Rank by impacted users, cohorts, revenue, frequency, and replay context.'], ['Close', 'Connect shipped changes back to users, cohorts, and release outcomes.']]],
      '/reporting': ['Reporting and BI', 'Reporting maps to dashboards, insights, SQL, warehouse models, experiment reporting, web analytics, and AI-generated product answers.', [['Dashboards', 'Trends, funnels, paths, retention, web analytics, and cohorts.'], ['Warehouse', 'SQL, models, BI, sources, and exports.'], ['Forecast', 'Usage, billing, activation, retention, revenue, and experiment impact.']]],
      '/knowledge': ['Knowledge and docs', 'Knowledge becomes the implementation layer: SDK guides, event plans, data dictionaries, launch checklists, and AI-assisted product documentation.', [['Document', 'Events, properties, groups, SDKs, flags, surveys, and warehouse models.'], ['Search', 'Find implementation paths, instrumentation notes, and product definitions.'], ['Improve', 'Turn recurring community questions into docs and templates.']]],
    };
    const current = map[path] || map['/how-it-works'];
    return h(CategoryPage, { eyebrow: 'Reference route', title: current[0], lede: current[1], cards: current[2].map((item, index) => [String(index + 1).padStart(2, '0'), item[0], item[1]]),
      children: h(DeepSection, { dark: true, eyebrow: 'Adapted route structure', title: 'Same route rhythm, Txlemetry product meaning.', lede: 'These pages preserve the reference landing map while turning every route into PostHog-style product analytics, replay, flags, surveys, data, AI, and observability.', items: current[2] })
    });
  }
  window.DocsPage = DocsPage;
  window.CommunityPage = CommunityPage;
  window.CompanyPage = CompanyPage;
  window.AllFeaturesPage = AllFeaturesPage;
  window.TechnologyPage = TechnologyPage;
  window.StartupsPage = StartupsPage;
  window.ReferenceRoutePage = ReferenceRoutePage;
})();
