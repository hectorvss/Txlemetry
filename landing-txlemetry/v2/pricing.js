/* global React, TxV2 */
(function () {
  const { useState } = React;
  const h = React.createElement;
  const { PageShell } = TxV2;

  const plans = [
    {
      name: 'Free',
      price: 0,
      badge: 'Start here',
      desc: 'For solo builders and small teams validating product analytics.',
      cta: 'Start free',
      features: ['1 project', '1M analytics events/mo', '5K session recordings/mo', '1M feature flag requests/mo', 'Community support'],
      specs: ['1-year retention', 'Unlimited members', 'Autocapture + dashboards', 'Surveys and replay included'],
    },
    {
      name: 'Launch',
      price: 49,
      badge: 'Early team',
      desc: 'For teams shipping the first serious analytics and release workflow.',
      cta: 'Choose Launch',
      features: ['3 projects', '2-year retention', 'Email support', 'Billing alerts', 'Basic warehouse exports'],
      specs: ['Feature flags + experiments', 'Error tracking included', 'Survey targeting', 'Cohort sync basics'],
    },
    {
      name: 'Growth',
      price: 149,
      badge: 'Most useful',
      featured: true,
      desc: 'For product, growth, and engineering teams running Txlemetry every week.',
      cta: 'Choose Growth',
      features: ['8 projects', '5-year retention', 'Priority support', 'Advanced billing limits', 'Warehouse + data pipelines'],
      specs: ['Experiment guardrails', 'Replay retention controls', 'AI SQL assistance', 'Role-based workspace controls'],
    },
    {
      name: 'Scale',
      price: 399,
      badge: 'High volume',
      desc: 'For mature teams with high traffic, governance, and multi-product usage.',
      cta: 'Choose Scale',
      features: ['20 projects', '7-year retention', 'Dedicated onboarding', 'Usage forecasting', 'Advanced governance'],
      specs: ['SSO-ready path', 'Custom retention policy', 'Data pipeline priority', 'Security review support'],
    },
    {
      name: 'Enterprise',
      price: null,
      badge: 'Talk to sales',
      desc: 'For organizations needing procurement, controls, custom volume, and support.',
      cta: 'Talk to sales',
      features: ['Custom projects', 'Custom retention', 'Dedicated success', 'Procurement support', 'Custom contract'],
      specs: ['SAML/SCIM path', 'Architecture review', 'Volume discounts', 'Enterprise support SLA'],
    },
  ];

  const meters = [
    { id: 'events', name: 'Analytics events', free: 1000000, rate: 0.00005, unit: 'event', defaultValue: 2500000, max: 20000000, step: 250000 },
    { id: 'replays', name: 'Session recordings', free: 5000, rate: 0.005, unit: 'recording', defaultValue: 12000, max: 100000, step: 1000 },
    { id: 'flags', name: 'Feature flag requests', free: 1000000, rate: 0.0001, unit: 'request', defaultValue: 4000000, max: 50000000, step: 500000 },
    { id: 'surveys', name: 'Survey responses', free: 1500, rate: 0.1, unit: 'response', defaultValue: 3000, max: 25000, step: 500 },
    { id: 'exceptions', name: 'Exceptions', free: 100000, rate: 0.00037, unit: 'exception', defaultValue: 250000, max: 2000000, step: 25000 },
    { id: 'rows', name: 'Warehouse rows', free: 1000000, rate: 0.000015, unit: 'row', defaultValue: 5000000, max: 50000000, step: 500000 },
    { id: 'ai', name: 'AI observability events', free: 100000, rate: 0.00006, unit: 'event', defaultValue: 300000, max: 5000000, step: 50000 },
    { id: 'logs', name: 'Logs', free: 50, rate: 0.25, unit: 'GB', defaultValue: 120, max: 2000, step: 10 },
  ];

  const formatNumber = (value) => new Intl.NumberFormat('en-US').format(value);
  const formatMoney = (value) => `$${Math.round(value).toLocaleString('en-US')}`;
  const usageCost = (meter, value) => Math.max(0, value - meter.free) * meter.rate;

  function RangeControl({ label, value, min, max, step, onChange, suffix }) {
    return h('label', { className: 'tx-pricing-range' },
      h('span', null, label),
      h('strong', null, `${formatNumber(value)}${suffix ? ` ${suffix}` : ''}`),
      h('input', { type: 'range', min, max, step, value, onChange: (event) => onChange(Number(event.target.value)) })
    );
  }

  function PricingPage() {
    const [annual, setAnnual] = useState(true);
    const [teamSize, setTeamSize] = useState(12);
    const [retention, setRetention] = useState(5);
    const [projects, setProjects] = useState(6);
    const [usage, setUsage] = useState(() => meters.reduce((acc, meter) => ({ ...acc, [meter.id]: meter.defaultValue }), {}));
    const [openFaq, setOpenFaq] = useState(0);

    const subscriptionBase = teamSize <= 3 ? 0 : teamSize <= 10 ? 49 : teamSize <= 25 ? 149 : 399;
    const retentionAddon = Math.max(0, retention - 1) * 12;
    const projectAddon = Math.max(0, projects - 3) * 8;
    const subscriptionEstimate = subscriptionBase + retentionAddon + projectAddon;
    const usageTotal = meters.reduce((sum, meter) => sum + usageCost(meter, usage[meter.id]), 0);
    const monthlyEstimate = subscriptionEstimate + usageTotal;
    const annualEstimate = monthlyEstimate * 12 * 0.82;

    const faq = [
      ['What is included in Free?', 'Free includes enough product analytics, replay, feature flags, surveys, error tracking, warehouse rows, AI observability, and logs to launch a real product loop.'],
      ['How do subscriptions and pay-as-you-go work together?', 'The subscription controls workspace maturity: projects, retention, support, governance, and billing controls. Pay-as-you-go covers product usage above free allowances.'],
      ['Can each product scale separately?', 'Yes. Analytics events, recordings, flag requests, survey responses, exceptions, rows, AI events, and logs each have their own allowance and rate.'],
      ['What happens if usage spikes?', 'Usage stays visible in the calculator model: teams can set billing limits, review high-volume meters, and move to Scale or Enterprise when controls matter more.'],
      ['Is this tied to PostHog product surfaces?', 'Yes. The categories map to PostHog-style product analytics, web analytics, session replay, feature flags, experiments, surveys, data stack, pipelines, AI observability, logs, workflows, and endpoints.'],
      ['When should we talk to sales?', 'Talk to sales when you need custom volume, procurement, security review, migration planning, dedicated success, or enterprise support terms.'],
    ];

    return h(PageShell, null,
      h('section', { className: 'tx-page-hero tx-pricing-hero tx-pricing-v3-hero' },
        h('div', { className: 'container' },
          h('div', { className: 'h-eyebrow' }, 'Pricing'),
          h('h1', null, 'Pricing that scales like your product.'),
          h('p', null, 'One free subscription, three paid tiers, enterprise sales, transparent usage meters, and a calculator for the full Txlemetry product OS.'),
          h('div', { className: 'tx-toggle tx-pricing-toggle' },
            h('button', { className: annual ? 'is-active' : '', onClick: () => setAnnual(true) }, 'Annual - save 18%'),
            h('button', { className: !annual ? 'is-active' : '', onClick: () => setAnnual(false) }, 'Monthly')
          )
        )
      ),

      h('section', { className: 'section tx-pricing-plans-section' },
        h('div', { className: 'container' },
          h('div', { className: 'tx-section-head' },
            h('div', { className: 'h-eyebrow' }, 'Subscriptions'),
            h('h2', { className: 'h-section' }, 'Five ways to run the same product system.'),
            h('p', { className: 'lede' }, 'Start free, then add retention, support, governance, volume planning, and enterprise controls as the team grows.')
          ),
          h('div', { className: 'tx-pricing-plan-grid' }, plans.map((plan) => {
            const displayPrice = plan.price === null ? 'Custom' : plan.price === 0 ? '$0' : formatMoney(annual ? plan.price * 0.82 : plan.price);
            return h('article', { key: plan.name, className: plan.featured ? 'tx-pricing-plan is-featured' : 'tx-pricing-plan' },
              h('div', { className: 'tx-pricing-plan-top' },
                h('span', null, plan.badge),
                h('h3', null, plan.name),
                h('strong', null, displayPrice),
                plan.price !== null && h('em', null, plan.price === 0 ? 'forever' : '/ month')
              ),
              h('p', null, plan.desc),
              h('ul', null, plan.features.map((feature) => h('li', { key: feature }, feature))),
              h('div', { className: 'tx-pricing-spec-grid' }, plan.specs.map((spec) => h('small', { key: spec }, spec))),
              h('a', { 'data-spa': true, href: plan.price === null ? '/demo' : '/signup', className: plan.featured ? 'btn btn-primary' : 'btn btn-secondary' }, plan.cta)
            );
          }))
        )
      ),

      h('section', { className: 'section tx-pricing-control-section' },
        h('div', { className: 'container tx-pricing-control-grid' },
          h('div', null,
            h('div', { className: 'h-eyebrow' }, 'Subscription sliders'),
            h('h2', { className: 'h-section' }, 'Shape the workspace before usage.'),
            h('p', { className: 'lede' }, 'Tune seats, retention, and projects. This estimates the subscription layer before product meters start adding variable cost.'),
            h('div', { className: 'tx-pricing-control-stack' },
              h(RangeControl, { label: 'Team members', value: teamSize, min: 1, max: 80, step: 1, onChange: setTeamSize }),
              h(RangeControl, { label: 'Data retention', value: retention, min: 1, max: 7, step: 1, suffix: 'years', onChange: setRetention }),
              h(RangeControl, { label: 'Projects', value: projects, min: 1, max: 30, step: 1, onChange: setProjects })
            )
          ),
          h('aside', { className: 'tx-pricing-estimate-card' },
            h('span', null, 'Subscription estimate'),
            h('strong', null, formatMoney(subscriptionEstimate)),
            h('p', null, 'Workspace layer: members, projects, retention, support tier, billing controls, and governance readiness.'),
            h('div', { className: 'tx-pricing-mini-grid' },
              h('div', null, h('b', null, teamSize), h('small', null, 'members')),
              h('div', null, h('b', null, retention), h('small', null, 'years')),
              h('div', null, h('b', null, projects), h('small', null, 'projects'))
            )
          )
        )
      ),

      h('section', { className: 'section tx-paygo-v3' },
        h('div', { className: 'container' },
          h('div', { className: 'tx-section-head' },
            h('div', { className: 'h-eyebrow' }, 'Pay as you go'),
            h('h2', { className: 'h-section' }, 'Every PostHog-style meter is adjustable.'),
            h('p', { className: 'lede' }, 'Move the sliders for analytics, replay, flags, surveys, exceptions, warehouse rows, AI events, and logs. Free allowances are applied first.')
          ),
          h('div', { className: 'tx-paygo-grid' },
            meters.map((meter) => {
              const value = usage[meter.id];
              const cost = usageCost(meter, value);
              return h('article', { key: meter.id, className: 'tx-paygo-meter' },
                h('div', { className: 'tx-paygo-meter-head' },
                  h('span', null, meter.name),
                  h('strong', null, formatMoney(cost))
                ),
                h('p', null, `${formatNumber(meter.free)} free ${meter.unit}${meter.unit === 'GB' ? '' : 's'} included`),
                h('input', {
                  type: 'range',
                  min: meter.free,
                  max: meter.max,
                  step: meter.step,
                  value,
                  onChange: (event) => setUsage({ ...usage, [meter.id]: Number(event.target.value) })
                }),
                h('div', { className: 'tx-paygo-meter-foot' },
                  h('span', null, `${formatNumber(value)} ${meter.unit}${meter.unit === 'GB' ? '' : 's'}`),
                  h('em', null, `$${meter.rate}/${meter.unit}`)
                )
              );
            })
          )
        )
      ),

      h('section', { className: 'section tx-pricing-calculator' },
        h('div', { className: 'container tx-pricing-calc-grid' },
          h('div', { className: 'tx-pricing-calc-main' },
            h('div', { className: 'h-eyebrow' }, 'Calculator'),
            h('h2', { className: 'h-section' }, 'Estimated Txlemetry bill.'),
            h('p', { className: 'lede' }, 'This combines the subscription layer with pay-as-you-go usage. It is built for planning, not surprise billing.'),
            h('div', { className: 'tx-pricing-breakdown' },
              h('div', null, h('span', null, 'Subscription'), h('strong', null, formatMoney(subscriptionEstimate))),
              h('div', null, h('span', null, 'Usage'), h('strong', null, formatMoney(usageTotal))),
              h('div', null, h('span', null, annual ? 'Annualized monthly equivalent' : 'Monthly total'), h('strong', null, formatMoney(annual ? annualEstimate / 12 : monthlyEstimate)))
            )
          ),
          h('aside', { className: 'tx-pricing-total-card' },
            h('span', null, annual ? 'Annual estimate' : 'Monthly estimate'),
            h('strong', null, annual ? formatMoney(annualEstimate) : formatMoney(monthlyEstimate)),
            h('p', null, annual ? 'Includes annual discount across the estimated monthly workspace and usage mix.' : 'Monthly estimate before any annual commitment or enterprise discount.'),
            h('a', { 'data-spa': true, href: monthlyEstimate > 1000 ? '/demo' : '/signup', className: 'btn btn-primary' }, monthlyEstimate > 1000 ? 'Talk to sales' : 'Start with this setup')
          )
        )
      ),

      h('section', { className: 'section tx-pricing-specs-section' },
        h('div', { className: 'container' },
          h('div', { className: 'tx-section-head' },
            h('div', { className: 'h-eyebrow' }, 'What the plans unlock'),
            h('h2', { className: 'h-section' }, 'Specifics across the whole Product OS.')
          ),
          h('div', { className: 'tx-pricing-spec-list' },
            [
              ['Analytics', 'Trends, funnels, paths, retention, lifecycle, cohorts, stickiness, web analytics, and dashboards.'],
              ['Replay', 'Session recordings, console context, linked events, frustration signals, and replay filters.'],
              ['Release', 'Feature flags, payloads, local evaluation, gradual rollout, experiments, and guardrail metrics.'],
              ['Listen', 'Surveys, NPS, PMF, feedback inbox, roadmap signal, and workflow follow-up.'],
              ['Data', 'Warehouse rows, SQL, BI, sources, pipelines, destinations, exports, and endpoints.'],
              ['Observe', 'Error tracking, logs, AI traces, spans, model cost, latency, and impacted users.'],
            ].map((item) => h('article', { key: item[0] }, h('strong', null, item[0]), h('p', null, item[1])))
          )
        )
      ),

      h('section', { className: 'section tx-pricing-faq tx-pricing-faq-v3' },
        h('div', { className: 'container tx-split' },
          h('div', null,
            h('div', { className: 'h-eyebrow' }, 'FAQ'),
            h('h2', { className: 'h-section' }, 'Pricing questions, answered plainly.'),
            h('p', { className: 'lede' }, 'A pricing page should make the product easier to buy and easier to reason about.')
          ),
          h('div', { className: 'tx-faq-list' }, faq.map((item, index) =>
            h('article', { key: item[0], className: openFaq === index ? 'is-open' : '', onClick: () => setOpenFaq(openFaq === index ? null : index) },
              h('button', { type: 'button' }, h('span', null, item[0]), h('strong', null, openFaq === index ? '-' : '+')),
              openFaq === index && h('p', null, item[1])
            )
          ))
        )
      ),

      h('section', { className: 'tx-final-home-cta' },
        h('div', { className: 'container' },
          h('h2', null, 'Start free, model usage, scale when the product proves it.'),
          h('p', null, 'Txlemetry pricing keeps subscriptions, usage, and enterprise conversations in one clear system.'),
          h('div', { className: 'tx-actions' },
            h('a', { 'data-spa': true, href: '/signup', className: 'btn btn-primary' }, 'Get started free'),
            h('a', { 'data-spa': true, href: '/demo', className: 'btn btn-secondary' }, 'Talk to sales')
          )
        )
      )
    );
  }

  window.PricingPage = PricingPage;
  window.PaywallPage = PricingPage;
})();
