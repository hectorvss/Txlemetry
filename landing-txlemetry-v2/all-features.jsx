/* global React, TxlemetryV2 */
(function () {
  const { useState } = React;
  const { PageShell } = TxlemetryV2;

  const FONT = "'Inter', sans-serif";
  const DISPLAY = "'Instrument Serif', Georgia, serif";
  const SERIF = "'Cormorant Garamond', 'Instrument Serif', Georgia, serif";
  const INK = '#090907';
  const MUTED = 'rgba(9,9,7,0.68)';
  const LINE = '#d8d0c2';
  const PAPER = 'rgba(250,249,246,0.94)';
  const PAPER_SOLID = '#faf9f6';
  const SOFT = '#f1eadf';
  const BLUE = '#0007cb';
  const FLOWER_BG = '/assets/txl/card-23.png';

  const PLANS = [
    { key: 'free', name: 'Free', annual: 'EUR0', monthly: 'EUR0', note: 'Permanent free tier' },
    { key: 'launch', name: 'Launch', annual: 'EUR59', monthly: 'EUR79', note: 'Starter subscription' },
    { key: 'growth', name: 'Growth', annual: 'EUR279', monthly: 'EUR349', note: 'Most popular' },
    { key: 'scale', name: 'Scale', annual: 'EUR749', monthly: 'EUR899', note: 'Power and governance' },
  ];

  const FEATURE_GROUPS = [
    {
      title: 'Plan, usage and billing',
      rows: [
        ['Monthly price', 'EUR0', 'EUR59 annual / EUR79 monthly', 'EUR279 annual / EUR349 monthly', 'EUR749 annual / EUR899 monthly'],
        ['Ideal customer', 'Founders, prototypes and internal tools', 'Small SaaS teams with one product motion', 'Product, growth and data teams working together', 'Multi-product companies with governance needs'],
        ['Analytics events / month', '1M', '3M', '25M', '120M'],
        ['Session recordings / month', '5k sampled', '15k full replay', '140k full replay', '650k full replay'],
        ['Feature flag requests / month', '1M', '5M', '50M', '250M'],
        ['Survey responses / month', '-', '5k', '50k', '250k'],
        ['Projects', '1', '3', '12', 'Unlimited'],
        ['Data retention', '1 year', '3 years', '7 years', '7 years'],
        ['Unlimited team members', 'Included', 'Included', 'Included', 'Included'],
        ['Overage economics', 'Standard pay-as-you-go', '10% lower overages', '35% lower overages', '50% lower overages'],
        ['Billing limits and alerts', 'Basic', 'Included', 'Advanced', 'Advanced'],
      ],
    },
    {
      title: 'Product analytics',
      rows: [
        ['Dashboards and saved reports', 'Basic dashboards', 'Saved dashboards and team views', 'Advanced dashboards and shared reporting', 'Executive and multi-product reporting'],
        ['Trends and breakdowns', 'Core', 'Full', 'Full with advanced breakdowns', 'Full with governance controls'],
        ['Funnels', 'Core funnels', 'Full funnels', 'Full funnels with saved cohorts', 'Full funnels with organization-wide templates'],
        ['Retention analysis', 'Core retention', 'Full retention', 'Full retention with cohort overlays', 'Full retention with advanced exports'],
        ['Paths and user journeys', 'Basic paths', 'Full paths', 'Full paths with cohort comparison', 'Full paths with multi-project analysis'],
        ['Cohorts and audiences', 'Basic cohorts', 'Saved cohorts', 'Advanced cohorts', 'Advanced cohorts with permissions'],
        ['Revenue analytics', '-', 'Included', 'Included', 'Included'],
        ['Group analytics', '-', 'Basic account/workspace groups', 'Advanced group analytics', 'Advanced group analytics at scale'],
        ['Custom formulas and derived metrics', '-', 'Included', 'Included', 'Included'],
      ],
    },
    {
      title: 'Session replay and behavior quality',
      rows: [
        ['Session replay', 'Sampled replay', 'Full replay', 'Full replay', 'Full replay'],
        ['Console logs and network context', 'Basic', 'Included', 'Included', 'Included'],
        ['Rage clicks and dead clicks', 'Included', 'Included', 'Included', 'Included'],
        ['Heatmaps', 'Basic', 'Included', 'Included', 'Included'],
        ['Replay retention controls', 'Basic', 'Standard', 'Advanced', 'Advanced'],
        ['Replay linked from analytics', 'Included', 'Included', 'Included', 'Included'],
        ['Error impact from replay', '-', '-', 'Included', 'Advanced'],
      ],
    },
    {
      title: 'Feature flags and activation',
      rows: [
        ['Feature flags', 'Basic', 'Full', 'Full', 'Full'],
        ['Targeting rules', 'Basic', 'Advanced', 'Advanced', 'Advanced'],
        ['Remote config and payloads', '-', 'Included', 'Included', 'Included'],
        ['Kill switches', 'Included', 'Included', 'Included', 'Included'],
        ['Progressive rollouts', 'Basic', 'Included', 'Included', 'Included'],
        ['Approval workflows', '-', '-', 'Included', 'Included'],
        ['Flag impact reporting', '-', 'Basic', 'Advanced', 'Advanced'],
      ],
    },
    {
      title: 'Experiments, surveys and feedback',
      rows: [
        ['Surveys', '-', 'Included', 'Included', 'Included'],
        ['In-product feedback', '-', 'Included', 'Included', 'Included'],
        ['Survey targeting', '-', 'Basic', 'Advanced', 'Advanced'],
        ['A/B tests', '-', '-', 'Included', 'Included'],
        ['Multivariate experiments', '-', '-', 'Included', 'Included'],
        ['Holdouts', '-', '-', 'Included', 'Included'],
        ['Experiment decision reporting', '-', '-', 'Included', 'Advanced'],
        ['Experiment impact on feature flags', '-', '-', 'Included', 'Included'],
      ],
    },
    {
      title: 'AI, warehouse and data platform',
      rows: [
        ['Txlemetry AI insights', 'Basic prompts', 'Included', 'Advanced insight summaries', 'Advanced insight summaries'],
        ['Natural-language product questions', 'Basic', 'Included', 'Included', 'Included'],
        ['Anomaly prompts', '-', 'Basic', 'Included', 'Included'],
        ['Data warehouse sync', '-', '-', 'Included', 'Included'],
        ['SQL-ready exports', '-', '-', 'Included', 'Included'],
        ['Data pipelines', '-', '-', '-', 'Included'],
        ['Event destinations', '-', '-', '-', 'Included'],
        ['LLM analytics', '-', '-', 'Included', 'Included'],
        ['Prompt, model, latency and cost tracking', '-', '-', 'Included', 'Included'],
        ['Custom data contracts', '-', '-', '-', 'Available'],
      ],
    },
    {
      title: 'Security, governance and support',
      rows: [
        ['Roles and permissions', 'Basic', 'Basic', 'Advanced', 'Advanced'],
        ['SSO', '-', '-', 'Included', 'Included'],
        ['Audit log', '-', '-', '-', 'Included'],
        ['EU data residency', 'Included', 'Included', 'Included', 'Included'],
        ['DPA and security review', 'Standard', 'Standard', 'Available', 'Available'],
        ['Support level', 'Community', 'Email', 'Priority', 'Dedicated onboarding'],
        ['Onboarding review', '-', '-', 'Included', 'Quarterly product analytics review'],
        ['Procurement support', '-', '-', 'Available', 'Available'],
      ],
    },
  ];

  const PAYG_ROWS = [
    ['Analytics events', '1M free', 'EUR0.00005 each', 'Product events, pageviews, identifies, groups and custom events after the free allowance.'],
    ['Session recordings', '5k free', 'EUR0.005 each', 'Captured sessions with replay, console and interaction context.'],
    ['Feature flag requests', '1M free', 'EUR0.0001 each', 'Flag evaluations, remote config checks and rollout requests.'],
    ['Survey responses', '1.5k free', 'EUR0.10 each', 'Completed survey responses connected to users, accounts and behavior.'],
    ['Exceptions tracked', '100k free', 'EUR0.00037 each', 'Errors and release-health events linked to product impact.'],
    ['LLM analytics events', '100k free', 'EUR0.00006 each', 'Prompt, cost, model, latency and quality tracking for AI-native products.'],
  ];

  const FAQS = [
    ['Is Free a real tier?', 'Yes. Free is permanent and includes 1M events, 5k sampled recordings, 1 project, product analytics, session replay and feature flags.'],
    ['Where does pay-as-you-go fit?', 'Pay-as-you-go is a usage path and an overage layer. It has free allowances per module, then unit pricing after those allowances.'],
    ['Why choose a subscription instead of pure usage?', 'Subscriptions include committed capacity, retention, governance, support and lower overage economics as the company scales.'],
    ['Do you charge per seat?', 'No. Txlemetry is priced around usage, product maturity and governance, not collaboration.'],
    ['Which plan should a serious SaaS choose?', 'Launch is the first paid workspace. Growth is the stack-replacement tier. Scale is for multi-product companies with governance needs.'],
  ];

  function navigate(to) {
    TxlemetryV2.navigate(to);
  }

  function CornerDots({ color = 'rgba(9,9,7,0.14)' }) {
    return (
      <div className="absolute inset-[16px] pointer-events-none">
        <div className="absolute left-0 top-0 size-[8px]" style={{ background: color }} />
        <div className="absolute right-0 top-0 size-[8px]" style={{ background: color }} />
        <div className="absolute left-0 bottom-0 size-[8px]" style={{ background: color }} />
        <div className="absolute right-0 bottom-0 size-[8px]" style={{ background: color }} />
      </div>
    );
  }

  function Eyebrow({ children }) {
    return (
      <p className="m-0 text-[12px] uppercase tracking-[0.14em]" style={{ fontFamily: FONT, color: INK, fontWeight: 760 }}>{children}</p>
    );
  }

  function Cell({ value }) {
    const muted = value === '-' || value === 'Available' || value === 'Basic' || value === 'Standard';
    return (
      <span className="text-[13px] leading-[18px]" style={{ fontFamily: FONT, color: muted ? MUTED : INK, fontWeight: value === '-' ? 500 : 620 }}>
        {value}
      </span>
    );
  }

  function PlanHeader({ plan, isAnnual }) {
    return (
      <div className="px-[18px] py-[18px] min-h-[132px]">
        <p className="m-0 text-[18px] leading-[22px]" style={{ fontFamily: FONT, color: INK, fontWeight: 760 }}>{plan.name}</p>
        <p className="m-0 mt-[7px] text-[12px] leading-[16px]" style={{ fontFamily: FONT, color: MUTED }}>{plan.note}</p>
        <p className="m-0 mt-[14px] text-[26px] leading-[28px] tracking-[-0.03em]" style={{ fontFamily: DISPLAY, color: INK, fontWeight: 500 }}>
          {isAnnual ? plan.annual : plan.monthly}
          <span className="text-[11px] leading-[14px] ml-[3px]" style={{ fontFamily: FONT, color: MUTED }}>/mo</span>
        </p>
      </div>
    );
  }

  function FeatureMatrix({ isAnnual }) {
    return (
      <div className="mt-[34px] overflow-x-auto" style={{ border: `1px solid ${LINE}`, background: PAPER, boxShadow: '0 26px 70px rgba(42,30,12,0.16)' }}>
        <div className="min-w-[1320px]">
          <div className="grid sticky top-0 z-[2]" style={{ gridTemplateColumns: `1.55fr repeat(${PLANS.length}, 1fr)`, background: SOFT, borderBottom: `1px solid ${LINE}` }}>
            <div className="p-[18px] flex flex-col justify-end">
              <span className="text-[13px] uppercase tracking-[0.12em]" style={{ fontFamily: FONT, color: INK, fontWeight: 760 }}>Feature list</span>
              <span className="mt-[6px] text-[12px] leading-[17px]" style={{ fontFamily: FONT, color: MUTED }}>Detailed comparison across the real subscription tiers.</span>
            </div>
            {PLANS.map((plan) => (
              <div key={plan.key} style={{ borderLeft: `1px solid ${LINE}` }}>
                <PlanHeader plan={plan} isAnnual={isAnnual} />
              </div>
            ))}
          </div>

          {FEATURE_GROUPS.map((group) => (
            <section key={group.title}>
              <div className="px-[18px] py-[13px]" style={{ background: '#fffaf1', borderBottom: `1px solid ${LINE}` }}>
                <p className="m-0 text-[14px] leading-[20px]" style={{ fontFamily: FONT, color: INK, fontWeight: 780 }}>{group.title}</p>
              </div>
              {group.rows.map((row) => (
                <div key={row[0]} className="grid" style={{ gridTemplateColumns: `1.55fr repeat(${PLANS.length}, 1fr)`, borderBottom: `1px solid ${LINE}` }}>
                  {row.map((cell, index) => (
                    <div key={`${row[0]}-${index}`} className={index === 0 ? 'px-[18px] py-[16px]' : 'px-[14px] py-[16px] text-center'} style={{ borderLeft: index === 0 ? 0 : `1px solid ${LINE}` }}>
                      {index === 0 ? (
                        <span className="text-[13px] leading-[18px]" style={{ fontFamily: FONT, color: INK, fontWeight: 700 }}>{cell}</span>
                      ) : (
                        <Cell value={cell} />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </section>
          ))}
        </div>
      </div>
    );
  }

  function PayAsYouGoList() {
    return (
      <div className="mt-[34px] grid md:grid-cols-2 xl:grid-cols-3 gap-[14px]">
        {PAYG_ROWS.map(([name, free, rate, detail]) => (
          <article key={name} className="p-[22px] min-h-[220px] flex flex-col" style={{ background: PAPER, border: `1px solid ${LINE}` }}>
            <p className="m-0 text-[12px] uppercase tracking-[0.12em]" style={{ fontFamily: FONT, color: MUTED, fontWeight: 760 }}>{free}</p>
            <h3 className="m-0 mt-[16px] text-[32px] leading-[32px] tracking-[-0.035em]" style={{ fontFamily: DISPLAY, color: INK, fontWeight: 500 }}>{name}</h3>
            <p className="m-0 mt-[12px] text-[13px] leading-[20px]" style={{ fontFamily: FONT, color: INK }}>{detail}</p>
            <p className="m-0 mt-auto pt-[22px] text-[18px] leading-[22px]" style={{ fontFamily: FONT, color: BLUE, fontWeight: 760 }}>{rate}</p>
          </article>
        ))}
      </div>
    );
  }

  function FAQItem({ item, open, onClick }) {
    return (
      <div style={{ borderTop: `1px solid ${LINE}` }}>
        <button onClick={onClick} className="w-full flex items-center justify-between gap-[18px] py-[20px] text-left bg-transparent border-0 cursor-pointer">
          <span className="text-[16px] leading-[23px]" style={{ fontFamily: FONT, color: INK, fontWeight: 700 }}>{item[0]}</span>
          <span className="text-[24px] leading-none" style={{ color: INK }}>{open ? '-' : '+'}</span>
        </button>
        {open && <p className="m-0 pb-[20px] text-[14px] leading-[22px]" style={{ fontFamily: FONT, color: INK }}>{item[1]}</p>}
      </div>
    );
  }

  function AllFeaturesPage() {
    const [isAnnual, setIsAnnual] = useState(true);
    const [openFaq, setOpenFaq] = useState(0);

    return (
      <PageShell>
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0, backgroundImage: `url('${FLOWER_BG}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />

        <main className="relative" style={{ zIndex: 1 }}>
          <section className="relative min-h-[78vh] flex items-end">
            <div className="max-w-[1440px] mx-auto px-[18px] pt-[150px] pb-[72px] w-full">
              <div className="relative max-w-[1220px] p-[28px] md:p-[36px]" style={{ background: PAPER, border: `1px solid ${LINE}` }}>
                <CornerDots />
                <Eyebrow>Explore all features</Eyebrow>
                <h1 className="m-0 mt-[18px] max-w-[1020px] text-[64px] md:text-[98px] leading-[0.86] tracking-[-0.06em]" style={{ fontFamily: DISPLAY, color: INK, fontWeight: 500 }}>
                  The complete Txlemetry feature list.
                </h1>
                <p className="m-0 mt-[22px] max-w-[760px] text-[17px] leading-[27px]" style={{ fontFamily: FONT, color: INK }}>
                  A wider, detailed reference for everything included in Free, Launch, Growth and Scale, plus the pay-as-you-go free tiers and unit pricing.
                </p>
                <div className="mt-[28px] flex flex-wrap items-center gap-[12px]">
                  <button onClick={() => navigate('/pricing')} className="h-[44px] px-[18px] cursor-pointer" style={{ fontFamily: FONT, background: INK, color: 'white', border: `1px solid ${INK}`, fontWeight: 720 }}>Back to pricing</button>
                  <button onClick={() => navigate('/signup')} className="h-[44px] px-[18px] cursor-pointer" style={{ fontFamily: FONT, background: 'white', color: INK, border: `1px solid ${INK}`, fontWeight: 720 }}>Start free</button>
                  <div className="inline-flex p-[5px]" style={{ background: 'white', border: `1px solid ${LINE}` }}>
                    <button onClick={() => setIsAnnual(true)} className="h-[38px] px-[16px] border-0 cursor-pointer" style={{ fontFamily: FONT, background: isAnnual ? SOFT : 'transparent', color: INK, fontWeight: 720 }}>Annual</button>
                    <button onClick={() => setIsAnnual(false)} className="h-[38px] px-[16px] border-0 cursor-pointer" style={{ fontFamily: FONT, background: !isAnnual ? SOFT : 'transparent', color: INK, fontWeight: 720 }}>Monthly</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="relative py-[70px]">
            <div className="max-w-[1420px] mx-auto px-[18px]">
              <div className="relative p-[22px] md:p-[30px]" style={{ background: 'rgba(255,255,255,0.82)', border: `1px solid ${LINE}` }}>
                <CornerDots />
                <div className="max-w-[880px]">
                  <Eyebrow>Full comparison</Eyebrow>
                  <h2 className="m-0 mt-[14px] text-[52px] md:text-[72px] leading-[0.9] tracking-[-0.05em]" style={{ fontFamily: DISPLAY, color: INK, fontWeight: 500 }}>
                    More columns, more detail, same visual language.
                  </h2>
                </div>
                <FeatureMatrix isAnnual={isAnnual} />
              </div>
            </div>
          </section>

          <section className="relative py-[76px]">
            <div className="max-w-[1420px] mx-auto px-[18px]">
              <div className="relative p-[22px] md:p-[30px]" style={{ background: 'rgba(255,255,255,0.82)', border: `1px solid ${LINE}` }}>
                <CornerDots />
                <div className="max-w-[900px]">
                  <Eyebrow>Pay as you go</Eyebrow>
                  <h2 className="m-0 mt-[14px] text-[52px] md:text-[72px] leading-[0.9] tracking-[-0.05em]" style={{ fontFamily: DISPLAY, color: INK, fontWeight: 500 }}>
                    Free tiers and usage rates, listed plainly.
                  </h2>
                  <p className="m-0 mt-[18px] text-[15px] leading-[24px]" style={{ fontFamily: FONT, color: INK }}>
                    Pay-as-you-go uses the same product surface. Each module has a free allowance, then clear unit pricing after that allowance.
                  </p>
                </div>
                <PayAsYouGoList />
              </div>
            </div>
          </section>

          <section className="relative py-[76px]">
            <div className="max-w-[1040px] mx-auto px-[18px]">
              <div className="p-[24px] md:p-[30px]" style={{ background: PAPER, border: `1px solid ${LINE}` }}>
                <Eyebrow>FAQ</Eyebrow>
                <h2 className="m-0 mt-[14px] text-[54px] md:text-[68px] leading-[0.92] tracking-[-0.05em]" style={{ fontFamily: DISPLAY, color: INK, fontWeight: 500 }}>Questions before choosing a tier.</h2>
                <div className="mt-[30px]">
                  {FAQS.map((item, index) => <FAQItem key={item[0]} item={item} open={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)} />)}
                  <div style={{ borderTop: `1px solid ${LINE}` }} />
                </div>
              </div>
            </div>
          </section>

        </main>
      </PageShell>
    );
  }

  window.AllFeaturesPage = AllFeaturesPage;
})();
