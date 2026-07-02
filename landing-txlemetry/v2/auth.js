/* global React, TxV2 */
(function () {
  const h = React.createElement;
  const { PageShell } = TxV2;
  function AuthNotice({ eyebrow, title, lede, cta, href }) {
    return h(PageShell, null,
      h('main', { className: 'tx-auth-shell' },
        h('section', { className: 'tx-auth-form' },
          h('div', { className: 'auth-form-card' },
            h('div', { className: 'auth-form-head' },
              h('span', { className: 'eyebrow' }, eyebrow),
              h('h1', null, title),
              h('p', null, lede)
            ),
            h('a', { 'data-spa': true, href, className: 'auth-submit' }, cta)
          )
        ),
        h('aside', { className: 'auth-aside tx-auth-aside' },
          h('span', { className: 'eyebrow' }, 'Txlemetry'),
          h('h2', null, 'A product OS deserves a product-grade entry point.'),
          h('p', null, 'The auth flow keeps the Txlemetry visual system while leaving room to connect the deployed PostHog workspace login behind the same route.')
        )
      )
    );
  }
  function AuthShell({ mode }) {
    const signup = mode === 'signup';
    return h(PageShell, null,
      h('main', { className: 'tx-auth-shell' },
        h('section', { className: 'tx-auth-form' },
          h('div', { className: 'auth-form-card' },
            h('div', { className: 'auth-form-head' },
              h('span', { className: 'eyebrow' }, signup ? 'Create account' : 'Sign in'),
              h('h1', null, signup ? 'Get started with Txlemetry.' : 'Back to your product OS.'),
              h('p', null, signup ? 'Create your workspace and start with analytics, replay, flags, surveys, and data.' : 'Log in to your Txlemetry workspace. For the deployed PostHog app, use the production login endpoint.')
            ),
            h('form', { className: 'auth-fields' },
              signup && h('div', { className: 'auth-field' }, h('label', null, 'Full name'), h('input', { className: 'auth-input', placeholder: 'Jane Builder' })),
              signup && h('div', { className: 'auth-field' }, h('label', null, 'Company'), h('input', { className: 'auth-input', placeholder: 'Acme Analytics' })),
              h('div', { className: 'auth-field' }, h('label', null, 'Work email'), h('input', { className: 'auth-input', type: 'email', placeholder: 'you@company.com' })),
              h('div', { className: 'auth-field' }, h('label', null, 'Password'), h('input', { className: 'auth-input', type: 'password', placeholder: 'Min 10 characters' })),
              h('a', { 'data-spa': true, href: signup ? '/signup' : '/login', className: 'auth-submit' }, signup ? 'Create Txlemetry account' : 'Continue to app login')
            ),
            h('div', { className: 'auth-foot' }, signup ? 'Already have an account? ' : 'No account yet? ', h('a', { 'data-spa': true, href: signup ? '/signin' : '/signup' }, signup ? 'Sign in' : 'Create one free'))
          )
        ),
        h('aside', { className: 'auth-aside tx-auth-aside' },
          h('span', { className: 'eyebrow' }, 'Txlemetry'),
          h('h2', null, 'Product teams deserve one source of truth.'),
          h('p', null, 'Analytics, replay, flags, data, surveys, errors, AI traces, logs, and workflows return to the same product context.'),
          h('div', { className: 'auth-aside-stats' }, [['1M', 'events free'], ['5K', 'replays free'], ['100K', 'AI/error events free']].map((s) => h('div', { className: 'auth-aside-stat', key: s[0] }, h('div', { className: 'auth-aside-stat-num' }, s[0]), h('div', { className: 'auth-aside-stat-lab' }, s[1]))))
        )
      )
    );
  }
  window.SigninPage = () => h(AuthShell, { mode: 'signin' });
  window.SignupPage = () => h(AuthShell, { mode: 'signup' });
  window.ResetPasswordPage = () => h(AuthNotice, { eyebrow: 'Reset password', title: 'Recover access to Txlemetry.', lede: 'This keeps the password reset route in the Txlemetry structure. In production it can hand off to the deployed PostHog password reset endpoint.', cta: 'Back to login', href: '/login' });
  window.DemoPage = () => h(AuthNotice, { eyebrow: 'Book demo', title: 'Walk through analytics, replay, flags, data, and AI observability.', lede: 'This is the sales/demo route from the reference structure, adapted to Txlemetry and ready to connect to a calendar or CRM form later.', cta: 'Start free instead', href: '/signup' });
})();
