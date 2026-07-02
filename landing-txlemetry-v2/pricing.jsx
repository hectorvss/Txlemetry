/* global React, TxlemetryV2 */
(function () {
  const { useMemo, useState, useEffect } = React;
  const { PageShell } = TxlemetryV2;

  const FONT = "'Inter', sans-serif";
  const DISPLAY = "'Instrument Serif', Georgia, serif";
  const PRODUCT_DISPLAY = "'Inter Tight', 'Inter', sans-serif";
  const SERIF = "'Cormorant Garamond', 'Instrument Serif', Georgia, serif";
  const INK = '#020917';
  const MUTED = '#68615a';
  const SOFT = '#faf9f6';
  const WARM = '#f1eee7';
  const LINE = '#d8d1c7';
  const DARK = '#05070d';
  const BLUE = '#0007cb';
  const GREEN = '#2f8f5b';
  const ORANGE = '#f07830';

  // Two full-page backdrops. The second one activates after the
  // intentional scroll buffer that follows Pay-as-you-go.
  const BG_WARM = '/assets/txl/hero.png';
  const BG_BLUE = '/assets/txl/card-18.png';

  function money(value) {
    if (value <= 0) return 'EUR0';
    return 'EUR' + Math.round(value).toLocaleString('en-US');
  }

  function compact(value) {
    if (value >= 1_000_000) return (value / 1_000_000).toFixed(value % 1_000_000 ? 1 : 0) + 'M';
    if (value >= 1_000) return (value / 1_000).toFixed(value % 1_000 ? 1 : 0) + 'k';
    return String(value);
  }

  function clampPlan(score) {
    if (score < 25) return 'Free';
    if (score < 45) return 'Launch';
    if (score < 70) return 'Growth';
    return 'Scale';
  }

  // Real tiered rate card (events + recordings — the two dominant cost drivers)
  // used to compute what each plan's bundled capacity would cost on pure
  // pay-as-you-go pricing. This is what makes the "save X%" badge on each
  // plan card an honest number instead of a marketing guess.
  const EVENT_TIERS = [
    [0, 1_000_000, 0],
    [1_000_000, 2_000_000, 0.00005],
    [2_000_000, 15_000_000, 0.0000343],
    [15_000_000, 50_000_000, 0.0000295],
    [50_000_000, 100_000_000, 0.0000218],
    [100_000_000, 250_000_000, 0.0000150],
    [250_000_000, Infinity, 0.000009],
  ];
  const RECORDING_TIERS = [
    [0, 5_000, 0],
    [5_000, 15_000, 0.005],
    [15_000, 50_000, 0.0035],
    [50_000, 150_000, 0.002],
    [150_000, 500_000, 0.0017],
    [500_000, Infinity, 0.0015],
  ];
  const FLAG_TIERS = [
    [0, 1_000_000, 0],
    [1_000_000, 2_000_000, 0.0001],
    [2_000_000, 10_000_000, 0.000045],
    [10_000_000, 50_000_000, 0.000025],
    [50_000_000, Infinity, 0.00001],
  ];
  const SURVEY_TIERS = [
    [0, 1_500, 0],
    [1_500, 2_000, 0.1],
    [2_000, 10_000, 0.035],
    [10_000, 20_000, 0.015],
    [20_000, Infinity, 0.01],
  ];
  const ERROR_TIERS = [
    [0, 100_000, 0],
    [100_000, 325_000, 0.00037],
    [325_000, 10_000_000, 0.00014],
    [10_000_000, Infinity, 0.000115],
  ];
  const AI_TIERS = [
    [0, 100_000, 0],
    [100_000, Infinity, 0.00006],
  ];
  function tieredCost(volume, tiers) {
    let cost = 0;
    for (const [start, end, rate] of tiers) {
      if (volume <= start) continue;
      cost += (Math.min(volume, end) - start) * rate;
    }
    return cost;
  }
  // The tier a given volume currently sits in — used to show the marginal
  // (per-unit) rate that applies right now, so it visibly changes as a
  // slider crosses a bracket boundary instead of pretending pricing is flat.
  function activeTier(volume, tiers) {
    let active = tiers[0];
    for (const t of tiers) { if (volume > t[0]) active = t; else break; }
    return active;
  }
  // What the plan's bundled capacity would cost each month on pure
  // pay-as-you-go pricing. This is the anchor the subscription is priced
  // FROM: monthly price = this cost minus the plan's subscriptionDiscount.
  function subscriptionPaygReference(plan) {
    if (!plan.events && !plan.recordings) return 0;
    return Math.round(tieredCost(plan.events || 0, EVENT_TIERS) + tieredCost(plan.recordings || 0, RECORDING_TIERS));
  }

  function CornerDots({ color = BLUE, inset = 18 }) {
    return (
      <div className="absolute pointer-events-none" style={{ inset }}>
        <span className="absolute left-0 top-0 size-[8px]" style={{ background: color }} />
        <span className="absolute right-0 top-0 size-[8px]" style={{ background: color }} />
        <span className="absolute left-0 bottom-0 size-[8px]" style={{ background: color }} />
        <span className="absolute right-0 bottom-0 size-[8px]" style={{ background: color }} />
      </div>
    );
  }

  function Button({ children, onClick, tone = 'dark' }) {
    const dark = tone === 'dark';
    return (
      <button
        onClick={onClick}
        className="h-[48px] px-[22px] inline-flex items-center justify-center text-[14px] leading-[20px] transition-transform hover:-translate-y-[1px]"
        style={{
          fontFamily: FONT,
          fontWeight: 500,
          border: dark ? '1px solid transparent' : `1px solid ${LINE}`,
          background: dark ? INK : 'rgba(255,255,255,0.86)',
          color: dark ? 'white' : INK,
          borderRadius: 4,
          boxShadow: dark ? '0 14px 30px rgba(2,9,23,0.18)' : 'none',
        }}
      >
        {children}
      </button>
    );
  }

  function Eyebrow({ children, color = MUTED }) {
    return (
      <p className="m-0 text-[11px] uppercase tracking-[0.14em] leading-[14px]" style={{ fontFamily: FONT, color, fontWeight: 500 }}>
        {children}
      </p>
    );
  }

  function SectionTitle({ eyebrow, title, text, light = false }) {
    return (
      <div className="max-w-[760px]">
        {eyebrow && <Eyebrow color={light ? 'rgba(255,255,255,0.62)' : INK}>{eyebrow}</Eyebrow>}
        <h2
          className="m-0 mt-[14px] text-[clamp(42px,5vw,78px)] leading-[0.94] tracking-[-0.025em]"
          style={{ fontFamily: DISPLAY, color: light ? 'white' : INK, fontWeight: 400 }}
        >
          {title}
        </h2>
        {text && (
          <p className="m-0 mt-[18px] text-[15px] leading-[24px] max-w-[620px]" style={{ fontFamily: FONT, color: light ? 'rgba(255,255,255,0.68)' : INK }}>
            {text}
          </p>
        )}
      </div>
    );
  }

  const plans = [
    {
      name: 'Free',
      strap: 'Validate without budget',
      monthly: 0,
      annual: 0,
      tag: 'Forever',
      description: 'For solo builders and early product discovery.',
      allowance: '1M events, 5k recordings, 1 project',
      events: 1_000_000,
      recordings: 5_000,
      bestFor: 'Founders, prototypes and internal tools.',
      support: 'Community support',
      limits: ['1 project', '1 year retention', 'Basic roles'],
      modules: ['Product analytics', 'Session replay', 'Feature flags'],
      features: ['Trends, funnels and retention', '5k recordings and 1M flag requests included free', 'Basic dashboards and cohorts', 'Public docs and community support', 'No credit card required, ever'],
      cta: 'Start free',
    },
    {
      name: 'Launch',
      strap: 'Your first real workspace',
      monthly: 79,
      annual: 59,
      subscriptionDiscount: 25,
      tag: 'Starter',
      description: 'For small teams shipping weekly and learning fast.',
      allowance: '3M events, 15k recordings, 3 projects',
      events: 3_000_000,
      recordings: 15_000,
      bestFor: 'Small SaaS teams with one product motion.',
      support: 'Email support',
      limits: ['3 projects', '3 year retention', 'Billing limits'],
      modules: ['Analytics', 'Replay', 'Flags', 'Surveys'],
      features: ['Everything in Free, uncapped for a real team', 'Survey responses included, not metered separately', 'Saved cohorts, dashboards and email alerts', 'Spend caps so usage never surprises you', 'Bundled capacity, cheaper than metering each product'],
      cta: 'Choose Launch',
    },
    {
      name: 'Growth',
      strap: 'Replace the analytics stack',
      monthly: 349,
      annual: 279,
      subscriptionDiscount: 35,
      tag: 'Most popular',
      featured: true,
      description: 'For teams replacing a stack of analytics tools.',
      allowance: '25M events, 140k recordings, 12 projects',
      events: 25_000_000,
      recordings: 140_000,
      bestFor: 'Product, growth and data teams working together.',
      support: 'Priority support',
      limits: ['12 projects', '7 year retention', 'SSO included'],
      modules: ['Analytics', 'Replay', 'Flags', 'Experiments', 'Warehouse', 'AI', 'Surveys'],
      features: ['Warehouse sync and SQL-ready exports', 'AI insight summaries and anomaly prompts baked in', 'Experiments with real feature impact, not just A/B stats', 'SSO, priority support and an onboarding review', 'The volume where subscribing beats metering by far'],
      cta: 'Choose Growth',
    },
    {
      name: 'Scale',
      strap: 'Serious volume and governance',
      monthly: 899,
      annual: 749,
      subscriptionDiscount: 50,
      tag: 'Power',
      description: 'For companies with multiple products and serious volume.',
      allowance: '120M events, 650k recordings, unlimited projects',
      events: 120_000_000,
      recordings: 650_000,
      bestFor: 'Multi-product companies with governance needs.',
      support: 'Dedicated onboarding',
      limits: ['Unlimited projects', '7 year retention', 'Audit log'],
      modules: ['All Growth modules', 'Pipelines', 'Error tracking', 'LLM analytics', 'Advanced permissions'],
      features: ['Data pipelines and event destinations included', 'Error tracking connected to session replay', 'Advanced permissions, SSO and audit log', 'Quarterly product analytics review with our team', 'The best unit economics Txlemetry offers, by far'],
      cta: 'Choose Scale',
    },
  ];

  // Charm pricing: snap a derived price to the nearest 9-ending number
  // (...99, 149, 199...) so the list reads like a price, not a calculator output.
  function prettyPrice(x) {
    if (x <= 0) return 0;
    if (x < 100) return Math.max(9, Math.round(x / 10) * 10 - 1);
    return Math.round(x / 50) * 50 - 1;
  }

  // Subscription pricing promise: each paid plan costs its bundled capacity's
  // real pay-as-you-go price minus the plan's discount (Launch -25%,
  // Growth -35%, Scale -50%), charm-rounded. Annual billing takes a further
  // 20% off the monthly price.
  plans.forEach((plan) => {
    if (!plan.subscriptionDiscount) return; // Free stays at 0
    const payg = subscriptionPaygReference(plan);
    plan.monthly = prettyPrice(payg * (1 - plan.subscriptionDiscount / 100));
    plan.annual = prettyPrice(plan.monthly * 0.8);
  });

  // Feature cards — each links through to the full /all-features page.
  const featureCatalog = [
    ['Product analytics', 'Funnels, trends, retention, paths and cohorts.', 'All plans'],
    ['Session replay', 'Recordings, rage clicks and session context.', 'All plans'],
    ['Feature flags', 'Targeted rollouts, remote config and kill switches.', 'All plans'],
    ['Experiments', 'A/B tests and feature impact on real product data.', 'Growth+'],
    ['Surveys', 'In-product feedback and response analytics.', 'Launch+'],
    ['Data warehouse', 'Sync clean product data into your warehouse.', 'Growth+'],
    ['Error tracking', 'Exceptions and product impact linked to replay.', 'Scale+'],
    ['LLM analytics', 'Track prompts, model cost, latency and quality.', 'Growth+'],
  ];

  const comparisonGroups = [
    {
      title: 'Usage and capacity',
      rows: [
        ['Analytics events / month', '1M', '3M', '25M', '120M'],
        ['Session recordings / month', '5k', '15k', '140k', '650k'],
        ['Feature flag requests', '1M', '5M', '50M', '250M'],
        ['Survey responses', '-', '5k', '50k', '250k'],
        ['Projects', '1', '3', '12', 'Unlimited'],
        ['Retention', '1 year', '3 years', '7 years', '7 years'],
      ],
    },
    {
      title: 'Product modules',
      rows: [
        ['Product analytics', 'Core', 'Full', 'Full', 'Full'],
        ['Session replay', 'Sampled', 'Full', 'Full', 'Full'],
        ['Feature flags', 'Basic', 'Full', 'Full', 'Full'],
        ['Experiments', '-', '-', 'Included', 'Included'],
        ['Data warehouse', '-', '-', 'Included', 'Included'],
        ['Data pipelines', '-', '-', '-', 'Included'],
        ['Error tracking', '-', '-', '-', 'Included'],
        ['LLM analytics', '-', '-', 'Included', 'Included'],
      ],
    },
    {
      title: 'Governance and support',
      rows: [
        ['Unlimited team members', 'Yes', 'Yes', 'Yes', 'Yes'],
        ['Billing limits', 'Basic', 'Included', 'Advanced', 'Advanced'],
        ['SSO', '-', '-', 'Included', 'Included'],
        ['Roles and permissions', 'Basic', 'Basic', 'Advanced', 'Advanced'],
        ['Audit log', '-', '-', '-', 'Included'],
        ['Support', 'Community', 'Email', 'Priority', 'Dedicated'],
      ],
    },
  ];

  const paygRows = [
    { key: 'events', label: 'Analytics events', free: 1_000_000, max: 300_000_000, tiers: EVENT_TIERS, start: 230, color: '#c96442' },
    { key: 'recordings', label: 'Session recordings', free: 5_000, max: 800_000, tiers: RECORDING_TIERS, start: 190, color: '#2f8f5b' },
    { key: 'flags', label: 'Feature flag requests', free: 1_000_000, max: 80_000_000, tiers: FLAG_TIERS, start: 170, color: '#5877b8' },
    { key: 'surveys', label: 'Survey responses', free: 1_500, max: 250_000, tiers: SURVEY_TIERS, start: 95, color: '#b98a4a' },
    { key: 'errors', label: 'Exceptions tracked', free: 100_000, max: 25_000_000, tiers: ERROR_TIERS, start: 125, color: '#be5672' },
    { key: 'ai', label: 'LLM analytics events', free: 100_000, max: 25_000_000, tiers: AI_TIERS, start: 145, color: '#765bc9' },
  ];

  function sliderVolume(row, raw) {
    const t = raw / 1000;
    return Math.round((row.max * Math.pow(t, 3)) / 1000) * 1000;
  }

  function PlanCard({ plan, annual }) {
    const price = annual ? plan.annual : plan.monthly;
    const payg = subscriptionPaygReference(plan);
    // Real saving vs pay-as-you-go for the price on screen: monthly shows the
    // plan discount exactly (25/35/50); annual shows it stacked with the 20%.
    const savingsPct = payg > price ? Math.round((1 - price / payg) * 100) : 0;
    return (
      <article
        className="relative flex flex-col min-h-[740px] p-[24px] overflow-hidden"
        style={{
          background: plan.featured ? DARK : 'rgba(255,255,255,0.92)',
          color: plan.featured ? 'white' : INK,
          border: `1px solid ${plan.featured ? DARK : LINE}`,
          borderRadius: 0,
          boxShadow: plan.featured ? '0 28px 70px rgba(2,9,23,0.32)' : '0 22px 50px rgba(2,9,23,0.16)',
          backdropFilter: plan.featured ? 'none' : 'blur(6px)',
        }}
      >
        <CornerDots color={plan.featured ? ORANGE : 'rgba(2,9,23,0.22)'} inset={14} />
        <div className="relative">
          <div className="flex items-center justify-between gap-[12px]">
            <Eyebrow color={plan.featured ? 'rgba(255,255,255,0.62)' : MUTED}>{plan.tag}</Eyebrow>
            {plan.featured && <span className="h-[10px] w-[10px]" style={{ background: ORANGE }} />}
          </div>
          <h3 className="m-0 mt-[22px] text-[42px] leading-[38px] tracking-[-0.025em]" style={{ fontFamily: DISPLAY, fontWeight: 400 }}>
            {plan.name}
          </h3>
          <p className="m-0 mt-[8px] text-[13px] leading-[19px]" style={{ fontFamily: FONT, color: plan.featured ? 'rgba(255,255,255,0.68)' : MUTED, fontWeight: 500 }}>
            {plan.strap}
          </p>
        </div>

        <div className="relative mt-[34px]">
          <div className="flex items-end gap-[8px]">
            <span className="text-[64px] leading-[50px] tracking-[-0.035em]" style={{ fontFamily: DISPLAY, fontWeight: 400 }}>
              {money(price)}
            </span>
            <span className="text-[12px] leading-[18px] pb-[4px]" style={{ fontFamily: FONT, color: plan.featured ? 'rgba(255,255,255,0.62)' : MUTED }}>/mo</span>
          </div>
          <p className="m-0 mt-[14px] text-[13px] leading-[20px]" style={{ fontFamily: FONT, color: plan.featured ? 'rgba(255,255,255,0.7)' : MUTED }}>
            {plan.description}
          </p>
          {savingsPct > 0 && (
            <div
              className="mt-[14px] inline-flex items-center gap-[8px] px-[10px] py-[7px]"
              style={{
                border: `1px solid ${plan.featured ? 'rgba(255,157,88,0.4)' : 'rgba(47,143,91,0.3)'}`,
                background: plan.featured ? 'rgba(240,120,48,0.12)' : 'rgba(47,143,91,0.08)',
              }}
            >
              <span className="text-[12px] leading-[16px]" style={{ fontFamily: FONT, color: plan.featured ? 'rgba(255,255,255,0.5)' : MUTED, textDecoration: 'line-through' }}>
                {money(payg)} pay-as-you-go
              </span>
              <span className="text-[12px] leading-[16px]" style={{ fontFamily: FONT, fontWeight: 600, color: plan.featured ? ORANGE : GREEN }}>
                Save {savingsPct}%
              </span>
            </div>
          )}
        </div>

        <div className="relative mt-[24px]" style={{ borderTop: `1px solid ${plan.featured ? 'rgba(255,255,255,0.16)' : LINE}` }}>
          {[
            ['Best for', plan.bestFor],
            ['Capacity', plan.allowance],
            ['Support', plan.support],
          ].map(([label, value]) => (
            <div key={label} className="py-[11px] grid grid-cols-[72px_1fr] gap-[12px]" style={{ borderBottom: `1px solid ${plan.featured ? 'rgba(255,255,255,0.12)' : LINE}` }}>
              <p className="m-0 text-[10px] uppercase tracking-[0.1em]" style={{ fontFamily: FONT, color: plan.featured ? 'rgba(255,255,255,0.46)' : MUTED, fontWeight: 500 }}>{label}</p>
              <p className="m-0 text-[12.5px] leading-[18px]" style={{ fontFamily: FONT, color: plan.featured ? 'rgba(255,255,255,0.84)' : INK }}>{value}</p>
            </div>
          ))}
        </div>

        <div className="relative mt-[18px]">
          <p className="m-0 text-[10px] uppercase tracking-[0.12em]" style={{ fontFamily: FONT, color: plan.featured ? 'rgba(255,255,255,0.5)' : MUTED, fontWeight: 500 }}>Modules</p>
          <div className="flex flex-wrap gap-[6px] mt-[10px]">
            {plan.modules.map((module) => (
              <span key={module} className="px-[8px] py-[5px] text-[11px] leading-[14px]" style={{ fontFamily: FONT, color: plan.featured ? 'rgba(255,255,255,0.82)' : INK, border: `1px solid ${plan.featured ? 'rgba(255,255,255,0.16)' : LINE}`, background: plan.featured ? 'rgba(255,255,255,0.05)' : SOFT }}>
                {module}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mt-[18px] grid gap-[7px]">
          {plan.limits.map((limit) => (
            <div key={limit} className="flex items-center gap-[8px] text-[12px] leading-[17px]" style={{ fontFamily: FONT, color: plan.featured ? 'rgba(255,255,255,0.66)' : MUTED }}>
              <span className="size-[4px]" style={{ background: plan.featured ? 'rgba(255,255,255,0.35)' : 'rgba(2,9,23,0.25)' }} />
              {limit}
            </div>
          ))}
          <div className="flex items-center gap-[8px] text-[12px] leading-[17px]" style={{ fontFamily: FONT, color: plan.featured ? 'rgba(255,255,255,0.66)' : MUTED }}>
            <span className="size-[4px]" style={{ background: plan.featured ? 'rgba(255,255,255,0.35)' : 'rgba(2,9,23,0.25)' }} />
            {plan.support}
          </div>
        </div>

        <ul className="relative list-none p-0 m-0 mt-[20px] flex flex-col gap-[10px]">
          {plan.features.map((feature) => (
            <li key={feature} className="flex gap-[10px] text-[12.5px] leading-[18px]" style={{ fontFamily: FONT, color: plan.featured ? 'rgba(255,255,255,0.78)' : INK }}>
              <span className="mt-[7px] size-[5px] shrink-0" style={{ background: plan.featured ? ORANGE : INK }} />
              {feature}
            </li>
          ))}
        </ul>

        <div className="relative mt-auto pt-[26px]">
          <Button tone={plan.featured ? 'light' : 'dark'} onClick={() => TxlemetryV2.navigate('/signup')}>
            {plan.cta}
          </Button>
          <button
            onClick={() => TxlemetryV2.navigate('/all-features')}
            className="block mt-[12px] text-left text-[12px] leading-[16px] underline underline-offset-[4px]"
            style={{ fontFamily: FONT, color: plan.featured ? 'rgba(255,255,255,0.72)' : MUTED }}
          >
            See all features
          </button>
        </div>
      </article>
    );
  }

  function FeatureCards() {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[12px] mt-[36px]">
        {featureCatalog.map(([title, body, tag]) => (
          <button
            key={title}
            onClick={() => TxlemetryV2.navigate('/all-features')}
            className="text-left relative p-[20px] min-h-[168px] flex flex-col transition-transform hover:-translate-y-[3px]"
            style={{ background: 'rgba(255,255,255,0.9)', border: `1px solid ${LINE}`, backdropFilter: 'blur(6px)', cursor: 'pointer' }}
          >
            <Eyebrow>{tag}</Eyebrow>
            <h3 className="m-0 mt-[16px] text-[24px] leading-[24px] tracking-[-0.018em]" style={{ fontFamily: DISPLAY, color: INK, fontWeight: 400 }}>{title}</h3>
            <p className="m-0 mt-[8px] text-[12.5px] leading-[18px]" style={{ fontFamily: FONT, color: MUTED }}>{body}</p>
            <span className="mt-auto pt-[14px] text-[12px]" style={{ fontFamily: FONT, color: INK, fontWeight: 500 }}>See how it works →</span>
          </button>
        ))}
      </div>
    );
  }

  function BundleDesigner() {
    const [events, setEvents] = useState(42);
    const [recordings, setRecordings] = useState(31);
    const [products, setProducts] = useState(3);
    const score = events * 0.48 + recordings * 0.32 + products * 6;
    const recommended = clampPlan(score);

    return (
      <div className="grid lg:grid-cols-[0.92fr_1.08fr] gap-[24px] mt-[42px]">
        <div className="p-[28px] relative" style={{ border: `1px solid ${LINE}`, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)' }}>
          <CornerDots color="rgba(2,9,23,0.16)" />
          {[
            ['Events per month', events, setEvents, 'M'],
            ['Recordings per month', recordings, setRecordings, 'k'],
            ['Products and workspaces', products, setProducts, ''],
          ].map(([label, value, setter, suffix]) => (
            <div key={label} className="relative py-[22px]" style={{ borderTop: label === 'Events per month' ? 'none' : `1px solid ${LINE}` }}>
              <div className="flex items-end justify-between gap-[16px]">
                <p className="m-0 text-[14px] leading-[20px]" style={{ fontFamily: FONT, color: INK, fontWeight: 500 }}>{label}</p>
                <p className="m-0 text-[36px] leading-[32px] tracking-[-0.025em]" style={{ fontFamily: DISPLAY, color: INK, fontWeight: 400 }}>{value}{suffix}</p>
              </div>
              <input className="w-full mt-[16px]" type="range" min="0" max="100" value={value} onChange={(event) => setter(Number(event.target.value))} style={{ accentColor: INK }} />
            </div>
          ))}
        </div>

        <div className="relative overflow-hidden p-[30px] min-h-[460px] flex flex-col justify-between" style={{ background: DARK, color: 'white' }}>
          <img className="absolute inset-0 size-full object-cover opacity-35" src="/assets/txl/card-20.png" alt="" loading="lazy" decoding="async" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(5,7,13,0.96), rgba(5,7,13,0.72))' }} />
          <CornerDots color={ORANGE} />
          <div className="relative">
            <Eyebrow color="rgba(255,255,255,0.58)">Recommended bundle</Eyebrow>
            <h3 className="m-0 mt-[16px] text-[88px] leading-[0.88] tracking-[-0.035em]" style={{ fontFamily: DISPLAY, fontWeight: 400 }}>{recommended}</h3>
            <p className="m-0 mt-[22px] text-[15px] leading-[24px] max-w-[440px]" style={{ fontFamily: FONT, color: 'rgba(255,255,255,0.7)' }}>
              This recommender treats events, recordings and workspace complexity as separate pressure points. It is designed to make the right plan obvious before you talk to anyone.
            </p>
          </div>
          <div className="relative grid grid-cols-3 gap-[10px] mt-[34px]">
            {['No per-seat tax', 'Committed capacity', 'Discounted overages'].map((item) => (
              <div key={item} className="p-[14px] text-[12px] leading-[16px]" style={{ fontFamily: FONT, border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.72)' }}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function PayAsYouGoCalculator() {
    const [sliders, setSliders] = useState(() => Object.fromEntries(paygRows.map((row) => [row.key, row.start])));
    const rows = useMemo(() => paygRows.map((row) => {
      const volume = sliderVolume(row, sliders[row.key]);
      const cost = tieredCost(volume, row.tiers);
      const [tierStart, tierEnd, marginalRate] = activeTier(volume, row.tiers);
      const tierLabel = marginalRate === 0 ? 'within free tier' : `${compact(tierStart)}-${tierEnd === Infinity ? '∞' : compact(tierEnd)} bracket`;
      return { ...row, volume, cost, marginalRate, tierLabel };
    }), [sliders]);
    const total = rows.reduce((sum, row) => sum + row.cost, 0);
    const cheaperPlan = [...plans].reverse().find((plan) => plan.monthly > 0 && plan.monthly < total);
    const cheaperPct = cheaperPlan ? Math.round((1 - cheaperPlan.monthly / total) * 100) : 0;

    return (
      <div className="grid lg:grid-cols-[1.25fr_0.75fr] mt-[42px]" style={{ border: `1px solid ${LINE}`, background: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(6px)' }}>
        <div className="p-[28px]">
          {rows.map((row, index) => (
            <div key={row.key} className="py-[18px]" style={{ borderTop: index ? `1px solid ${LINE}` : 'none' }}>
              <div className="flex items-center justify-between gap-[18px]">
                <div>
                  <p className="m-0 text-[14px] leading-[20px]" style={{ fontFamily: FONT, color: INK, fontWeight: 500 }}>{row.label}</p>
                  <p className="m-0 mt-[2px] text-[12px] leading-[18px]" style={{ fontFamily: FONT, color: MUTED }}>
                    {compact(row.free)} free · {row.marginalRate === 0 ? 'within free tier' : <>now EUR{row.marginalRate}/unit <span style={{ color: row.color }}>({row.tierLabel})</span></>}
                  </p>
                </div>
                <div className="text-right">
                  <p className="m-0 text-[25px] leading-[24px] tracking-[-0.025em]" style={{ fontFamily: DISPLAY, color: INK, fontWeight: 400 }}>{compact(row.volume)}</p>
                  <p className="m-0 text-[12px] leading-[16px]" style={{ fontFamily: FONT, color: MUTED }}>{money(row.cost)}</p>
                </div>
              </div>
              <input
                className="w-full mt-[12px]"
                type="range"
                min="0"
                max="1000"
                value={sliders[row.key]}
                onChange={(event) => setSliders((current) => ({ ...current, [row.key]: Number(event.target.value) }))}
                style={{ accentColor: row.color }}
              />
            </div>
          ))}
        </div>

        <aside className="relative p-[28px] flex flex-col" style={{ borderLeft: `1px solid ${LINE}`, background: 'rgba(250,249,246,0.9)' }}>
          <CornerDots color="rgba(2,9,23,0.15)" />
          <Eyebrow>Live estimate</Eyebrow>
          <p className="m-0 mt-[14px] text-[78px] leading-[64px] tracking-[-0.035em]" style={{ fontFamily: DISPLAY, color: INK, fontWeight: 400 }}>{money(total)}</p>
          <p className="m-0 mt-[10px] text-[13px] leading-[20px]" style={{ fontFamily: FONT, color: MUTED }}>Estimated monthly usage after free tiers.</p>
          {cheaperPlan && (
            <div className="mt-[16px] p-[14px]" style={{ background: 'rgba(240,120,48,0.1)', border: '1px solid rgba(240,120,48,0.3)' }}>
              <p className="m-0 text-[13px] leading-[19px]" style={{ fontFamily: FONT, color: INK }}>
                At this volume, <strong>{cheaperPlan.name}</strong> costs <strong>{money(cheaperPlan.monthly)}/mo</strong> — {cheaperPct}% less than pay-as-you-go.
              </p>
            </div>
          )}
          <div className="mt-[28px] h-[14px] flex overflow-hidden" style={{ background: 'rgba(2,9,23,0.08)' }}>
            {rows.filter((row) => row.cost > 0).map((row) => (
              <span key={row.key} style={{ width: `${Math.max(2, (row.cost / Math.max(total, 1)) * 100)}%`, background: row.color }} />
            ))}
          </div>
          <div className="mt-[24px] flex flex-col gap-[10px]">
            {rows.map((row) => (
              <div key={row.key} className="flex items-center justify-between gap-[10px] text-[12px] leading-[16px]" style={{ fontFamily: FONT }}>
                <span className="flex items-center gap-[8px]" style={{ color: MUTED }}><span className="size-[8px]" style={{ background: row.color }} />{row.label}</span>
                <span style={{ color: INK, fontWeight: 500 }}>{money(row.cost)}</span>
              </div>
            ))}
          </div>
          <div className="mt-auto pt-[28px]">
            <Button onClick={() => TxlemetryV2.navigate('/signup')}>Start pay as you go</Button>
          </div>
        </aside>
      </div>
    );
  }

  function FAQItem({ item, open, onClick }) {
    return (
      <div style={{ borderTop: `1px solid ${LINE}` }}>
        <button className="w-full py-[22px] flex items-center justify-between gap-[18px] text-left" onClick={onClick}>
          <span className="text-[17px] leading-[24px]" style={{ fontFamily: FONT, color: INK, fontWeight: 500 }}>{item.q}</span>
          <span className="text-[24px] leading-[24px]" style={{ color: MUTED }}>{open ? '-' : '+'}</span>
        </button>
        {open && <p className="m-0 pb-[22px] max-w-[760px] text-[14px] leading-[23px]" style={{ fontFamily: FONT, color: MUTED }}>{item.a}</p>}
      </div>
    );
  }

  function FeatureComparison() {
    const cols = plans.length;
    return (
      <div className="mt-[44px]" style={{ border: `1px solid ${LINE}`, background: 'rgba(255,255,255,0.95)', overflowX: 'auto', backdropFilter: 'blur(6px)' }}>
        <div className="min-w-[980px]">
          <div className="grid sticky top-0 z-[1]" style={{ gridTemplateColumns: `1.35fr repeat(${cols}, 1fr)`, background: SOFT, borderBottom: `1px solid ${LINE}` }}>
            <div className="p-[16px]" />
            {plans.map((plan) => (
              <div key={plan.name} className="p-[16px] text-center" style={{ borderLeft: `1px solid ${LINE}` }}>
                <p className="m-0 text-[13px] leading-[18px]" style={{ fontFamily: FONT, color: INK, fontWeight: 500 }}>{plan.name}</p>
                <p className="m-0 mt-[3px] text-[11px] leading-[15px]" style={{ fontFamily: FONT, color: MUTED }}>{money(plan.annual) + '/mo annual'}</p>
              </div>
            ))}
          </div>
          {comparisonGroups.map((group) => (
            <div key={group.title}>
              <div className="p-[14px] text-[11px] uppercase tracking-[0.14em]" style={{ fontFamily: FONT, color: INK, fontWeight: 500, background: WARM, borderBottom: `1px solid ${LINE}` }}>{group.title}</div>
              {group.rows.map((row) => (
                <div key={row[0]} className="grid" style={{ gridTemplateColumns: `1.35fr repeat(${cols}, 1fr)`, borderBottom: `1px solid ${LINE}` }}>
                  <div className="p-[14px] text-[13px] leading-[18px]" style={{ fontFamily: FONT, color: MUTED }}>{row[0]}</div>
                  {row.slice(1, 1 + cols).map((cell, index) => (
                    <div key={index} className="p-[14px] text-center text-[13px] leading-[18px]" style={{ fontFamily: FONT, color: cell === '-' ? 'rgba(2,9,23,0.28)' : INK, borderLeft: `1px solid ${LINE}` }}>
                      {cell}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  function PricingPage() {
    const [annual, setAnnual] = useState(true);
    const [openFaq, setOpenFaq] = useState(0);
    // Scroll-driven backdrop: stay warm through subscriptions and Pay-as-you-go,
    // then switch during the intentional scroll buffer before the lower content.
    const [warm, setWarm] = useState(true);
    useEffect(() => {
      const onScroll = () => {
        const trigger = document.getElementById('pricing-bg-transition');
        if (!trigger) return;
        const rect = trigger.getBoundingClientRect();
        setWarm(rect.top > window.innerHeight * 0.42);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      return () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      };
    }, []);

    const faqs = [
      { q: 'How is Txlemetry priced?', a: 'You can choose a subscription bundle or pay as you go. Bundles include committed monthly capacity and cheaper overages. Pay as you go charges only usage above each free tier.' },
      { q: 'Do you charge per seat?', a: 'No. Invite product, data, engineering, support and leadership without turning collaboration into a billing problem.' },
      { q: 'Can I set spending limits?', a: 'Yes. You can cap each product area, receive alerts before limits are hit, and pause ingestion instead of receiving a surprise invoice.' },
      { q: 'What happens when I exceed my plan?', a: 'Overages are billed at the discounted rate attached to your plan. Growth and Scale get better unit economics than pure pay as you go.' },
      { q: 'Is the Free plan really free forever?', a: 'Yes. It is designed for real projects, not as a fake trial. You only pay when you choose a plan or exceed free usage limits.' },
      { q: 'Can I run in a specific data region?', a: 'Yes. Growth and Scale support custom regions, compliance review, DPA options, SAML, SCIM, audit logs and dedicated support paths.' },
    ];

    return (
      <PageShell>
        {/* Single interactive backdrop — both images preloaded, opacity toggled instantly. */}
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0, backgroundColor: SOFT }}>
          <div className="absolute inset-0" style={{ backgroundImage: `url('${BG_WARM}')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: warm ? 1 : 0, transition: 'opacity 900ms ease' }} />
          <div className="absolute inset-0" style={{ backgroundImage: `url('${BG_BLUE}')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: warm ? 0 : 1, transition: 'opacity 900ms ease' }} />
        </div>

        <div className="relative" style={{ zIndex: 1 }}>
          {/* Opens directly on the subscription boxes */}
          <section className="relative pt-[132px] pb-[80px]">
            <div className="relative max-w-[1440px] mx-auto px-[18px]">
              <div className="flex flex-wrap items-end justify-between gap-[24px]">
                <SectionTitle eyebrow="Subscription plans" title="Choose a plan by operating mode, not headcount." text="Every tier includes unlimited team members. The difference is capacity, retention, governance, support and which advanced product modules are unlocked." />
                <div className="flex p-[5px]" style={{ border: `1px solid ${LINE}`, background: 'rgba(255,255,255,0.86)' }}>
                  <button className="px-[18px] h-[40px] text-[13px]" onClick={() => setAnnual(true)} style={{ fontFamily: FONT, fontWeight: 500, color: INK, background: annual ? 'white' : 'transparent' }}>Annual, save 20%</button>
                  <button className="px-[18px] h-[40px] text-[13px]" onClick={() => setAnnual(false)} style={{ fontFamily: FONT, fontWeight: 500, color: INK, background: annual ? 'transparent' : 'white' }}>Monthly</button>
                </div>
              </div>
              <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-[14px] mt-[40px]">
                {plans.map((plan) => <PlanCard key={plan.name} plan={plan} annual={annual} />)}
              </div>
            </div>
          </section>

          {/* Interactive bundle finder */}
          <section className="relative py-[80px]">
            <div className="max-w-[1240px] mx-auto px-[18px]">
              <SectionTitle eyebrow="Interactive bundle finder" title="Move the sliders. See the plan snap into place." text="A second decision layer for teams that want the subscription path, but need to feel how volume changes the recommendation." />
              <BundleDesigner />
            </div>
          </section>

          {/* Pay as you go */}
          <section id="payg-calculator" className="relative py-[84px]">
            <div className="max-w-[1240px] mx-auto px-[18px]">
              <SectionTitle eyebrow="Pay as you go" title="A first-class plan, not a fallback." text="Use Txlemetry without a subscription when usage is variable. You still get the same product surface, free tiers per module and billing controls, just with unit-based pricing." />
              <PayAsYouGoCalculator />
            </div>
          </section>

          {/* Intentional scroll buffer: the backdrop switches here, after Pay-as-you-go. */}
          <section id="pricing-bg-transition" className="relative min-h-[72vh] flex items-center">
            <div className="max-w-[1240px] mx-auto px-[18px] w-full">
              <div className="max-w-[560px] ml-auto p-[24px]" style={{ background: 'rgba(255,255,255,0.72)', border: `1px solid ${LINE}`, backdropFilter: 'blur(10px)' }}>
                <Eyebrow>Keep scrolling</Eyebrow>
                <p className="m-0 mt-[14px] text-[30px] leading-[34px] tracking-[-0.02em]" style={{ fontFamily: DISPLAY, color: INK }}>
                  The pricing model is done. Now the platform value takes over.
                </p>
              </div>
            </div>
          </section>

          {/* Feature cards → each links to the full /all-features page */}
          <section className="relative py-[80px]">
            <div className="max-w-[1240px] mx-auto px-[18px]">
              <div className="flex flex-wrap items-end justify-between gap-[24px]">
                <SectionTitle eyebrow="Everything in one platform" title="More than analytics." text="Pick any product to see how it works. Each card opens the full feature page where every capability is explained." />
                <Button onClick={() => TxlemetryV2.navigate('/all-features')}>See all features →</Button>
              </div>
              <FeatureCards />
            </div>
          </section>

          {/* FAQ */}
          <section className="relative py-[84px]">
            <div className="max-w-[1240px] mx-auto px-[18px]">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-[42px]">
                <div>
                  <SectionTitle eyebrow="FAQ" title="Questions finance, product and engineering all ask." text="The important details before you commit: limits, overages, contracts, data governance and how billing scales with you." />
                </div>
                <div className="p-[clamp(20px,3vw,30px)]" style={{ background: 'rgba(255,255,255,0.9)', border: `1px solid ${LINE}`, backdropFilter: 'blur(6px)' }}>
                  {faqs.map((item, index) => (
                    <FAQItem key={item.q} item={item} open={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)} />
                  ))}
                  <div style={{ borderBottom: `1px solid ${LINE}` }} />
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="relative pt-[40px] pb-[110px]">
            <div className="max-w-[1240px] mx-auto px-[18px]">
              <div className="relative overflow-hidden p-[clamp(30px,6vw,76px)]" style={{ background: 'rgba(255,255,255,0.9)', border: `1px solid ${LINE}`, backdropFilter: 'blur(6px)' }}>
                <CornerDots />
                <div className="relative max-w-[820px]">
                  <p className="m-0 text-[44px] md:text-[82px] leading-[0.86] tracking-[-0.035em]" style={{ fontFamily: DISPLAY, color: INK, fontWeight: 400 }}>
                    Start free today. Upgrade only when the data proves it.
                  </p>
                  <p className="m-0 mt-[20px] text-[15px] leading-[24px] max-w-[560px]" style={{ fontFamily: FONT, color: MUTED }}>
                    No credit card for Free, no per-seat tax later, and governance controls that unlock as you scale.
                  </p>
                  <div className="mt-[30px] flex flex-wrap gap-[12px]">
                    <Button onClick={() => TxlemetryV2.navigate('/signup')}>Create workspace</Button>
                    <Button tone="light" onClick={() => TxlemetryV2.navigate('/all-features')}>Explore all features</Button>
                  </div>
                </div>
                <p className="absolute right-[34px] bottom-[26px] hidden lg:block m-0 text-[96px] leading-[0.8] tracking-[-0.08em]" style={{ fontFamily: SERIF, color: 'rgba(2,9,23,0.13)', fontStyle: 'italic' }}>
                  tx
                </p>
              </div>
            </div>
          </section>

        </div>
      </PageShell>
    );
  }

  window.PricingPage = PricingPage;
})();
