/* global React, TxV2 */
(function () {
  const h = React.createElement;
  const { PageShell, PRODUCTS } = TxV2;

  function Hero() {
    return h('section', { className: 'tx-hero' },
      h('div', { className: 'tx-hero-bg' }),
      h('div', { className: 'tx-hero-gel', 'aria-hidden': true }),
      h('div', { className: 'container tx-hero-inner' },
        h('h1', null, 'Txlemetry'),
        h('p', { className: 'tx-hero-lede' }, 'AI-native product analytics'),
        h('div', { className: 'tx-actions' },
          h('a', { 'data-spa': true, href: '/signup', className: 'btn btn-primary tx-hero-primary' }, 'Get started', h('span', { 'aria-hidden': true }, '⌄')),
          h('a', { 'data-spa': true, href: '/products', className: 'btn btn-secondary tx-hero-secondary' }, 'Watch demo')
        ),
        h('p', { className: 'tx-fine' }, 'No credit card required · Generous free tier · Open-source core')
      ),
      h('div', { className: 'tx-scroll-cue', 'aria-hidden': true })
    );
  }

  function ProductGrid({ compact = false }) {
    const families = ['Analyze', 'Observe', 'Ship', 'Listen', 'Data', 'AI', 'Act'];
    return h('section', { className: 'section tx-products-section' },
      h('div', { className: 'container' },
        h('div', { className: 'tx-section-head' },
          h('div', { className: 'h-eyebrow' }, 'Product OS'),
          h('h2', { className: 'h-section' }, compact ? 'Every PostHog capability, translated to Txlemetry.' : 'A screen for every product surface.'),
          h('p', { className: 'lede' }, 'Each category uses PostHog product specifications as the underlying information model: analytics, replay, flags, experimentation, surveys, data, AI, observability, and automation.')
        ),
        h('div', { className: 'tx-family-row' }, families.map((fam) => h('span', { key: fam }, fam))),
        h('div', { className: 'tx-product-grid' }, PRODUCTS.map((p) =>
          h('a', { key: p.slug, 'data-spa': true, href: p.slug, className: 'tx-product-card' },
            h('span', null, `${p.family} / ${p.free}`),
            h('h3', null, p.name),
            h('p', null, p.desc),
            h('strong', null, p.price)
          )
        ))
      )
    );
  }

  function LogoStrip() {
    return h('section', { className: 'tx-logo-strip' },
      h('div', { className: 'container' },
        h('div', { className: 'tx-logo-strip-label' }, 'Built for product, engineering, data, growth, and AI teams'),
        h('div', { className: 'tx-logo-row' }, ['Product Analytics', 'Replay', 'Flags', 'Experiments', 'Surveys', 'Warehouse', 'AI Observability'].map((item) => h('span', { key: item }, item)))
      )
    );
  }

  function FeatureStory() {
    const stories = [
      ['Measure', 'Product analytics, web analytics, funnels, trends, paths, retention, cohorts, and autocaptured actions.', 'Start with what happened.'],
      ['Watch', 'Session replay, error tracking, logs, traces, and impacted-user context connected to the exact product journey.', 'See why it happened.'],
      ['Ship', 'Feature flags, experiments, surveys, workflows, and destinations close the loop from insight to release.', 'Act without leaving the system.'],
    ];
    return h('section', { className: 'section tx-feature-story' },
      h('div', { className: 'container' },
        h('div', { className: 'tx-section-head' },
          h('div', { className: 'h-eyebrow' }, 'How Txlemetry works'),
          h('h2', { className: 'h-section' }, 'The product loop, built as one operating system.'),
          h('p', { className: 'lede' }, 'PostHog specifications give the product surface. Txlemetry turns that surface into a landing flow that feels like a complete SaaS, not a pile of feature links.')
        ),
        h('div', { className: 'tx-story-grid' }, stories.map((story, index) =>
          h('article', { key: story[0], className: 'tx-story-card' },
            h('span', null, `0${index + 1}`),
            h('h3', null, story[0]),
            h('p', null, story[1]),
            h('strong', null, story[2])
          )
        ))
      )
    );
  }

  function Outcomes() {
    const stats = [
      ['1M', 'analytics events included monthly'],
      ['5K', 'session recordings included monthly'],
      ['1M', 'feature flag requests included monthly'],
      ['50GB', 'logs included monthly'],
    ];
    return h('section', { className: 'section tx-outcomes' },
      h('div', { className: 'container tx-split' },
        h('div', null,
          h('div', { className: 'h-eyebrow' }, 'Generous by default'),
          h('h2', { className: 'h-section' }, 'Start free, then scale product by product.'),
          h('p', { className: 'lede' }, 'The pricing model mirrors PostHog: useful free allowances first, then usage-based meters that scale down at volume. Teams can adopt analytics, replay, flags, surveys, data, and observability independently.')
        ),
        h('div', { className: 'tx-stats-grid' }, stats.map((s) => h('article', { key: s[0] + s[1] }, h('strong', null, s[0]), h('span', null, s[1]))))
      )
    );
  }

  function FinalHomeCTA() {
    return h('section', { className: 'tx-final-home-cta' },
      h('div', { className: 'container' },
        h('h2', null, 'Analytics that become decisions. Decisions that become releases.'),
        h('p', null, 'Bring product data, user context, feature control, warehouse data, AI traces, and workflows into one calm operating layer.'),
        h('div', { className: 'tx-actions' },
          h('a', { 'data-spa': true, href: '/signup', className: 'btn btn-primary' }, 'Get started free'),
          h('a', { 'data-spa': true, href: '/pricing', className: 'btn btn-secondary' }, 'See pricing')
        )
      )
    );
  }

  function HomePage() {
    return h(PageShell, null,
      h(Hero),
      h(LogoStrip),
      h('section', { className: 'section tx-structure' },
        h('div', { className: 'container tx-split' },
          h('div', null,
            h('div', { className: 'h-eyebrow' }, 'Reference architecture, Txlemetry product'),
            h('h2', { className: 'h-section' }, 'One landing, many product rooms.'),
            h('p', { className: 'lede' }, 'The navigation, page rhythm, cards, auth flow, and CTA pattern follow the reference landing. The content, backgrounds, product taxonomy, and final floral wordmarks are Txlemetry.')
          ),
          h('div', { className: 'tx-mini-dashboard' },
            ['Capture', 'Understand', 'Ship', 'Learn'].map((x, i) => h('div', { key: x }, h('strong', null, `0${i + 1}`), h('span', null, x)))
          )
        )
      ),
      h(ProductGrid, { compact: true }),
      h(FeatureStory),
      h(Outcomes),
      h(FinalHomeCTA)
    );
  }

  function ProductsPage() {
    return h(PageShell, null,
      h('section', { className: 'tx-page-hero' },
        h('div', { className: 'container' },
          h('div', { className: 'h-eyebrow' }, 'Products'),
          h('h1', null, 'Every PostHog-style product gets its own Txlemetry screen.'),
          h('p', null, 'Product analytics, web analytics, replay, flags, experiments, surveys, data, pipelines, AI, observability, logs, workflows, inbox, and endpoints.')
        )
      ),
      h(ProductGrid)
    );
  }

  function ProductPage() {
    const path = window.location.pathname.replace(/\/+$/, '') || '/';
    const p = PRODUCTS.find((item) => item.slug === path) || PRODUCTS[0];
    const related = PRODUCTS.filter((item) => (p.pairs || []).includes(item.name)).slice(0, 4);
    return h(PageShell, null,
      h('section', { className: 'tx-product-detail' },
        h('div', { className: 'container' },
          h('div', { className: 'h-eyebrow' }, p.family),
          h('h1', null, p.name),
          h('p', { className: 'tx-product-lede' }, p.desc),
          h('div', { className: 'tx-product-meta' },
            h('span', null, p.free),
            h('span', null, p.price),
            h('span', null, p.source)
          ),
          h('div', { className: 'tx-detail-grid' },
            h('article', null,
              h('h2', null, 'PostHog specifications'),
              h('ul', null, (p.specs || []).map((x) => h('li', { key: x }, x)))
            ),
            h('article', null,
              h('h2', null, 'Use cases'),
              h('ul', null, (p.useCases || []).map((x) => h('li', { key: x }, x))),
              h('p', null, 'This is the product-context layer Txlemetry adapts for teams who want a calmer, more visual SaaS surface.')
            ),
            h('article', null,
              h('h2', null, 'Pairs with'),
              related.length ? related.map((r) => h('a', { key: r.slug, 'data-spa': true, href: r.slug }, r.name)) : h('p', null, 'Product Analytics, Data Stack, and Workflows'),
              h('h2', null, 'Pricing meter'),
              h('p', null, `${p.free} · ${p.price}`)
            )
          ),
          h('section', { className: 'tx-product-flow' },
            h('div', null, h('span', null, '01'), h('strong', null, 'Capture'), h('p', null, 'Instrument the event, trace, replay, response, request, row, or log.')),
            h('div', null, h('span', null, '02'), h('strong', null, 'Understand'), h('p', null, 'Connect the signal to users, cohorts, funnels, warehouse data, and product context.')),
            h('div', null, h('span', null, '03'), h('strong', null, 'Act'), h('p', null, 'Ship flags, run experiments, trigger workflows, or route the data downstream.'))
          ),
          h('a', { 'data-spa': true, href: '/products', className: 'btn btn-secondary' }, 'Back to products')
        )
      )
    );
  }

  window.HomePage = HomePage;
  window.ProductsPage = ProductsPage;
  window.ProductPage = ProductPage;
})();
