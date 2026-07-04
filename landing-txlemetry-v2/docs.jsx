/* global React, TxlemetryV2 */
(function () {
  const { PageShell } = TxlemetryV2;

  /* Docs topics. Each `id` is used as an in-page anchor so the SaaS can deep-link
     (e.g. txlemetry.com/docs#feature-flags). Keep ids in sync with the SaaS repoint map. */
  const TOPICS = [
    {
      id: 'getting-started',
      name: 'Getting started',
      summary: 'Create your project, add the snippet and start capturing product data in minutes.',
      steps: [
        'Create a project from your Txlemetry workspace and copy your project API key.',
        'Add the Txlemetry snippet (or install the SDK) in your app so events start flowing.',
        'Open Home and confirm your first events arrive in the Activity view.',
      ],
    },
    {
      id: 'dashboards',
      name: 'Dashboards & analytics',
      summary: 'Build trends, funnels and retention to answer real product questions.',
      steps: [
        'Open Product analytics and create an insight (trend, funnel, retention or paths).',
        'Pin insights to a dashboard and share it with your team.',
        'Add filters and breakdowns to slice the data by any property.',
      ],
    },
    {
      id: 'session-replay',
      name: 'Session replay',
      summary: 'Watch real sessions to understand the behavior behind a metric.',
      steps: [
        'Enable session recording in Settings once the snippet is installed.',
        'Open Session replay and filter recordings by user, page or event.',
        'Jump from any insight into the sessions behind it.',
      ],
    },
    {
      id: 'feature-flags',
      name: 'Feature flags',
      summary: 'Ship safely with progressive rollouts and remote configuration.',
      steps: [
        'Create a feature flag and choose a release condition (percentage, property or cohort).',
        'Read the flag in your app with the SDK to gate a feature.',
        'Roll out gradually and monitor impact from the same data model.',
      ],
    },
    {
      id: 'experiments',
      name: 'Experiments',
      summary: 'Run A/B tests tied to your metrics to measure what actually works.',
      steps: [
        'Create an experiment and pick a primary metric.',
        'Assign variants with a feature flag and start the test.',
        'Let Txlemetry compute significance and call the winner.',
      ],
    },
    {
      id: 'surveys',
      name: 'Surveys',
      summary: 'Collect qualitative feedback in-product without extra tools.',
      steps: [
        'Create a survey and target it with a feature flag or URL condition.',
        'Choose the question types and where it appears.',
        'Review responses alongside the rest of your product data.',
      ],
    },
    {
      id: 'data-pipelines',
      name: 'Data pipelines',
      summary: 'Route product signals in and out of your stack without losing context.',
      steps: [
        'Connect a destination or source from Data pipelines.',
        'Map the events and properties you want to sync.',
        'Monitor delivery and retries from the pipeline view.',
      ],
    },
    {
      id: 'web-analytics',
      name: 'Web analytics',
      summary: 'Understand traffic, conversion and content performance.',
      steps: [
        'Open Web analytics once the snippet is capturing pageviews.',
        'Review sessions, sources and top pages.',
        'Drill into any metric to the underlying product behavior.',
      ],
    },
    {
      id: 'txlemetry-ai',
      name: 'Txlemetry AI',
      summary: 'An AI workspace that helps you query data and move from insight to action.',
      steps: [
        'Open Txlemetry AI from the sidebar.',
        'Ask a question in natural language about your product data.',
        'Turn the answer into an insight, dashboard or next step.',
      ],
    },
  ];

  const RESOURCES = [
    { name: 'Tutorials', desc: 'Step-by-step guides for common product and growth workflows.', href: '#getting-started' },
    { name: 'Help center', desc: 'Answers to the most common questions about using Txlemetry.', href: '#getting-started' },
    { name: 'Support', desc: 'Talk to our team when you need a hand — we reply fast.', href: '/demo' },
  ];

  function DocsPage() {
    return (
      <PageShell>
        <div style={{ fontFamily: "'Inter', sans-serif" }}>
          {/* Hero */}
          <div className="max-w-[1120px] mx-auto px-6 pt-[72px] pb-8">
            <p className="text-[13px] font-semibold uppercase tracking-[1.5px] text-[#b8552e]">Documentation</p>
            <h1 className="mt-3 text-[#17100e] text-[44px] leading-[1.05] font-semibold tracking-[-1.2px] max-w-[720px]">
              Everything you need to get the most out of Txlemetry.
            </h1>
            <p className="mt-4 text-[#5b514d] text-[17px] leading-[1.5] max-w-[640px]">
              Docs, tutorials, help and support in one place — from installing the snippet to running experiments
              and asking Txlemetry AI about your product data.
            </p>
            <div className="flex gap-3 mt-6">
              <a data-spa href="#getting-started" className="bg-[#17100e] rounded-[6px] px-[16px] py-[10px] text-white text-[15px] font-semibold tracking-[-0.4px] no-underline">Get started</a>
              <a data-spa href="/demo" className="border border-[#e3ded9] rounded-[6px] px-[16px] py-[10px] text-[#17100e] text-[15px] font-semibold tracking-[-0.4px] no-underline">Talk to us</a>
            </div>
          </div>

          {/* Topic index */}
          <div className="max-w-[1120px] mx-auto px-6 pb-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {TOPICS.map((t) => (
                <a key={t.id} href={'#' + t.id} data-spa className="block border border-[#ece7e2] rounded-[10px] p-4 no-underline hover:border-[#d8cfc7] transition-colors">
                  <p className="text-[#17100e] text-[15px] font-semibold tracking-[-0.3px]">{t.name}</p>
                  <p className="mt-1 text-[#7a716c] text-[13px] leading-[1.45]">{t.summary}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Topic sections */}
          <div className="max-w-[820px] mx-auto px-6 py-8">
            {TOPICS.map((t) => (
              <section key={t.id} id={t.id} className="scroll-mt-24 py-8 border-t border-[#f0ebe6] first:border-t-0">
                <h2 className="text-[#17100e] text-[26px] font-semibold tracking-[-0.6px]">{t.name}</h2>
                <p className="mt-2 text-[#5b514d] text-[16px] leading-[1.55]">{t.summary}</p>
                <ol className="mt-4 space-y-2">
                  {t.steps.map((s, i) => (
                    <li key={i} className="flex gap-3 text-[#3a332f] text-[15px] leading-[1.5]">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-[#f4ede7] text-[#b8552e] text-[13px] font-semibold flex items-center justify-center">{i + 1}</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>

          {/* Resources / support */}
          <div className="max-w-[1120px] mx-auto px-6 py-10">
            <h2 className="text-[#17100e] text-[22px] font-semibold tracking-[-0.5px]">Tutorials, help & support</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
              {RESOURCES.map((r) => (
                <a key={r.name} data-spa href={r.href} className="block border border-[#ece7e2] rounded-[10px] p-5 no-underline hover:border-[#d8cfc7] transition-colors">
                  <p className="text-[#17100e] text-[16px] font-semibold tracking-[-0.3px]">{r.name}</p>
                  <p className="mt-1 text-[#7a716c] text-[14px] leading-[1.45]">{r.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </PageShell>
    );
  }

  window.DocsPage = DocsPage;
})();
