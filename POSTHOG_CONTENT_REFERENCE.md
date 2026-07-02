# PostHog Content Reference for Landing Pages

Purpose: extract as much useful public-facing content context as possible from `posthog.com` to use as reference when writing our own landing pages.

Important note: this document is a synthesis and paraphrase of publicly available PostHog website content. It is meant for strategy, structure, messaging, and section planning. It is not intended as copy-paste source material.

Research date: 2026-07-01

Primary sources:
- https://posthog.com/
- https://posthog.com/products
- https://posthog.com/pricing
- https://posthog.com/faq
- https://posthog.com/product-analytics
- https://posthog.com/web-analytics
- https://posthog.com/session-replay
- https://posthog.com/feature-flags
- https://posthog.com/error-tracking
- https://posthog.com/docs/product-analytics
- https://posthog.com/docs/web-analytics
- https://posthog.com/docs/session-replay
- https://posthog.com/docs/feature-flags
- https://posthog.com/docs/experiments
- https://posthog.com/docs/surveys
- https://posthog.com/docs/error-tracking
- https://posthog.com/docs/logs
- https://posthog.com/docs/ai-observability
- https://posthog.com/docs/data-warehouse
- https://posthog.com/docs/cdp
- https://posthog.com/docs/workflows
- https://posthog.com/docs/endpoints
- https://posthog.com/docs/posthog-ai

## 1. Core positioning

### High-level company idea

PostHog presents itself less like a single SaaS feature and more like a full operating system for product teams with a strong engineering bias.

The repeated business idea is:
- collect product data
- understand user behavior
- debug issues
- ship new features safely
- automate follow-up actions
- keep all of it inside one connected stack

Their strongest category claim is not "best analytics" or "best flags" in isolation.
It is:
- one stack
- shared context
- product data infrastructure
- tools for product engineers
- lower tool sprawl

### Who they speak to

Their messaging consistently targets:
- product engineers
- full-stack teams
- developer-led startups
- technical product teams
- builders who want to self-serve

They do not primarily sound like a marketing SaaS.
They sound like:
- technical
- direct
- anti-bloat
- anti-sales-friction
- fast-moving

### Repeated macro-promises

These promises appear over and over in different forms:
- understand what users are doing
- move from insight to action without changing tools
- debug faster because all context is connected
- ship faster with less risk
- reduce the number of tools you need
- avoid manual setup when possible
- stay in control with transparent usage pricing

## 2. Homepage extraction

### Homepage role

The homepage is not trying to teach each product in depth. It is trying to sell the system.

It does this with four big arguments:
- real customers use it
- the data stack is complete
- pricing is low-friction and transparent
- the company itself is unusually transparent and technical

### Homepage narrative blocks

#### Block: proof and credibility

Main intent:
- show real paying customers
- signal category legitimacy
- keep the tone informal and confident

What they emphasize:
- paying customers, not vanity logos
- product engineers like the platform
- investor-backed companies use it

Reusable landing lesson:
- if we have customer proof, make it specific and believable
- avoid generic "trusted by" if we can say who uses what and why

#### Block: "data stack" section

Main message:
- analytics is only useful if it can access the full set of customer and product data
- product decisions improve when payments, errors, support, and usage data live together

Concrete capability themes they mention:
- data warehouse
- many sources and destinations
- SQL editor / BI / visualization
- user activity feed
- APIs and webhooks

Reusable landing lesson:
- one strong section should explain why isolated feature data is not enough
- this is especially relevant if our SaaS also has multiple surfaces or modules

#### Block: pricing philosophy

Main message:
- users should not worry about pricing
- generous free tier
- usage-based pricing
- pricing decreases with scale
- no forced sales calls

Emotional effect:
- low-friction adoption
- low commitment
- buyer feels safe trying

Reusable landing lesson:
- even before showing exact pricing, the landing should remove fear of being trapped

#### Block: "Why us?"

The company sells more than product:
- transparency
- speed of shipping
- technical support by technical people

Reusable landing lesson:
- include a "how we work" trust block, not only product claims

### Tone patterns on the homepage

They use:
- humor
- irreverence
- short declarative claims
- anti-corporate phrasing
- a feeling of "builders talking to builders"

This matters because the voice supports the product thesis:
- simple
- direct
- self-serve
- technical

## 3. Product OS page extraction

Source: `https://posthog.com/products`

### Product OS page role

This page explains the overall platform model.

Core message:
- everything needed to collect, analyze, and act on product data lives in one place
- humans and AI agents can both build with it

### Main concepts used on this page

#### Concept: devtools + product data infrastructure

They frame the platform as both:
- data infrastructure
- shipping/debugging toolkit

This is important because it broadens the category:
- not just analytics
- not just deployment
- not just data
- a full lifecycle platform

#### Concept: one data layer powering many workflows

They split the platform into several capability groups:
- data platform
- automatic tooling
- data exploration
- product usage understanding
- debugging
- shipping and feedback

This grouping is useful as a model for our information architecture.

### Capability clusters they surface

#### Data platform cluster

Themes:
- data sources and imports
- reverse ETL and export
- data modeling
- warehouse
- CDP
- SQL and BI

What this means for copy:
- they never describe the warehouse as a back-office add-on
- they position it as the base that makes all other tools more powerful

#### Automatic tooling cluster

Themes:
- product instrumentation and configuration can be driven by AI
- agents can work without leaving the coding environment

What this means for copy:
- automation is not sold as convenience only
- it is sold as speed and leverage for technical teams

#### Product understanding cluster

Themes:
- web analytics
- product analytics
- graphs and trends
- funnels
- paths
- lifecycle
- heatmaps
- AI observability
- user activity

What this means for copy:
- discovery tools are bundled into a single "understand behavior" story

#### Debug and fix cluster

Themes:
- error tracking
- logs
- session replay
- activity timeline

What this means for copy:
- they link debugging to user context, not just stack traces

#### Ship and feedback cluster

Themes:
- feature flags
- experiments
- no-code A/B testing
- early access features
- endpoints
- webhooks
- workflows
- surveys
- support
- user interviews

What this means for copy:
- they frame deployment, experimentation, and feedback as one loop

### Product OS page messaging takeaways

Best reusable ideas:
- "one system, many jobs"
- "shared data layer"
- "analyze, debug, ship, automate"
- "built for both humans and AI-enabled workflows"

## 4. FAQ extraction

Source: `https://posthog.com/faq`

### FAQ role

The FAQ is one of the densest pages for extracting actual value propositions.

### Key statements condensed

PostHog says it provides:
- product analytics
- web analytics
- session replay
- error tracking
- feature flags
- experiments
- surveys
- AI / LLM observability
- data warehouse
- CDP
- workflows
- logs
- an AI product assistant

And the platform exists to help teams:
- debug code
- ship features faster
- keep usage and customer data in one stack

### Feature-level bullets surfaced in the FAQ

Useful factual feature descriptors:
- anonymous and identified event capture
- autocapture and custom events
- frontend, backend, and mobile SDKs
- APIs for capture, flags, metadata, and data querying
- product analytics with trends, funnels, retention, and SQL
- simplified web analytics with session metrics, bounce rate, web vitals, and channels
- session replay with event timeline, console capture, performance capture, and mobile recording
- heatmaps, clickmaps, scrollmaps
- feature flags with multivariate options, percentage rollouts, targeted rollouts, local evaluation
- experiments with multivariate testing
- surveys with no-code and API options
- error tracking with stack traces and session context
- logs next to product data
- workflows triggered by events
- AI observability with trace inspection and cost tracking
- warehouse for external data
- batch exports to popular destinations

### Objection handling themes

The FAQ also resolves common concerns:
- works with many stacks
- works with mobile apps
- has enterprise/security options
- unlimited team members
- usage-based instead of seat-based pricing

Reusable landing lesson:
- our landing should not wait until the bottom to answer compatibility, pricing, and team-fit objections

## 5. Pricing extraction

Source: `https://posthog.com/pricing`

### Pricing page role

The pricing page is a major part of the product narrative, not just billing.

It reinforces:
- scale with the customer
- pay only when value grows
- generous free entry point
- many products under one account

### Emotional job of pricing

The page is designed to make prospects feel:
- safe to try
- safe to expand
- safe to consolidate tools

### Pricing principles they communicate

- free first
- no card required to start
- monthly free tier on all plans
- usage-based after free tier
- billing limits available
- unlimited team members
- more projects and longer retention when paid

### Free-tier examples they push

At the time of research, prominent free-tier allowances include:
- analytics: 1M events
- session replay: 5K recordings
- feature flags: 1M requests
- error tracking: 100K exceptions
- surveys: 1,500 responses
- data warehouse: 1M rows plus historical sync for new sources
- data pipelines: 10K events plus 1M rows
- AI observability: 100K events
- PostHog AI: 500 credits
- workflows: 10K messages per channel
- logs: 50GB ingested

### Pricing narrative lessons for our landing

If our SaaS has multiple modules, we should strongly consider saying:
- start free or start small
- scale per usage, not per seat
- set limits and stay in control
- you keep the same product while growing

## 6. Product-by-product extraction

This section translates each product page + docs page into reusable content ingredients.

### 6.1 Product Analytics

Sources:
- `https://posthog.com/product-analytics`
- `https://posthog.com/docs/product-analytics`

#### Product role

This is their primary "understand what is happening in your product" layer.

#### Main promise

Understand what users do inside the product and why product metrics move.

#### Key differentiators they stress

- graphs connect natively to session replay
- autocapture reduces manual instrumentation burden
- events can be defined retroactively as actions
- raw and high-level analysis coexist

#### Main ideas expressed

- tells you what is happening in the product
- lets you visually inspect why something happened
- tracks every click and pageview automatically
- removes regret from forgetting to instrument an event

#### Feature themes from docs and FAQ

- event capture
- anonymous and identified users
- autocapture
- trends
- funnels
- retention
- SQL access
- dashboard templates
- cohorts
- active users
- traffic sources
- realtime dashboards

#### Use-case angles they highlight

- set up event tracking foundations
- optimize marketing performance
- reduce churn
- compare new and returning users
- identify power users
- calculate engagement metrics like DAU/MAU

#### Copy ingredients we can borrow conceptually

Possible section angles:
- Know what users are doing without building a tracking project first
- See what changed, then inspect why
- Analyze usage, retention, activation, and growth from one event layer
- Turn raw events into product decisions quickly

### 6.2 Web Analytics

Sources:
- `https://posthog.com/web-analytics`
- `https://posthog.com/docs/web-analytics`

#### Product role

This is the lighter, marketer-friendly analytics layer for websites.

#### Main promise

Track the most important website metrics in a simpler, more focused interface.

#### Key differentiators they stress

- simpler than product analytics
- more privacy-oriented than Google Analytics style tools
- no sampling
- cookieless option
- can jump from traffic changes to session recordings

#### Main ideas expressed

- a better evolution of classic web analytics
- works out of the box
- focuses on essential website metrics
- ideal for marketers, content teams, and anyone who wants simpler reporting

#### Feature themes from docs and FAQ

- visitors
- views
- sessions
- session duration
- bounce rate
- conversions
- paths
- referrers
- channel analysis
- web vitals
- cross-domain tracking
- cookieless tracking

#### Use-case angles they highlight

- calculate session metrics
- track users across domains
- privacy-conscious analytics without cookies

#### Copy ingredients we can borrow conceptually

Possible section angles:
- Website analytics without the usual complexity
- Get traffic, conversion, and channel clarity in one place
- See the sessions behind the spike, not just the spike itself
- Privacy-friendly analytics that still helps you act

### 6.3 Session Replay

Sources:
- `https://posthog.com/session-replay`
- `https://posthog.com/docs/session-replay`

#### Product role

This is the visual understanding and debugging layer.

#### Main promise

Play back real user sessions to diagnose issues, improve support, and understand nuanced behavior.

#### Key differentiators they stress

- real sessions with real clicks and friction
- useful for both debugging and empathy
- automatic capture without manual tagging
- connected to funnels, errors, and analytics

#### Main ideas expressed

- watch what users clicked
- see where they got stuck
- understand what broke
- identify friction analytics alone will not reveal
- build empathy for the real product experience

#### Feature and use-case themes from docs and FAQ

- event timeline
- console capture
- performance capture
- mobile recording
- rageclicks
- replay sharing
- watch users in a funnel
- power-user session reviews
- control replay volume for cost
- app performance debugging
- support workflows with recordings
- heatmaps, clickmaps, scrollmaps

#### Copy ingredients we can borrow conceptually

Possible section angles:
- See the experience behind the metric
- Watch where users hesitate, retry, or abandon
- Debug visual friction without guessing
- Pair quantitative analytics with qualitative evidence

### 6.4 Feature Flags

Sources:
- `https://posthog.com/feature-flags`
- `https://posthog.com/docs/feature-flags`

#### Product role

This is the safe shipping and controlled rollout layer.

#### Main promise

Control who sees what, test impact, and roll out safely without redeploying.

#### Key differentiators they stress

- lower latency via local evaluation
- eliminate page-load flicker with bootstrapping
- connected to analytics for impact measurement
- good for experiments and remote config, not just on/off toggles

#### Main ideas expressed

- target specific users, groups, or percentages
- ship progressively
- kill a feature instantly
- configure behavior remotely
- support beta programs and early access

#### Feature themes from docs

- boolean flags
- multivariate flags
- percentage rollouts
- user and group targeting
- local evaluation
- client-side bootstrapping
- payloads / remote config
- scheduled changes
- flag dependencies
- early access management
- multi-project flags
- property overrides
- evaluation contexts
- A/B testing integration

#### Use-case angles they highlight

- phased rollouts
- instant rollback
- targeted availability
- experimentation
- remote configuration
- beta access programs

#### Copy ingredients we can borrow conceptually

Possible section angles:
- Ship progressively instead of all at once
- Turn releases into controlled experiments
- Roll back instantly when something feels off
- Control access, configuration, and rollout from one layer

### 6.5 Experiments

Sources:
- `https://posthog.com/docs/experiments`
- related references from feature flags and FAQ

#### Product role

This is the product testing and impact measurement layer.

#### Main promise

Test different versions of the product and measure which one performs better.

#### Positioning within the stack

Experiments are not sold as a separate universe.
They sit naturally on top of:
- feature flags
- analytics
- shared user/event context

#### Main idea

Experimentation is part of shipping, not a separate analytics ritual.

#### Feature themes surfaced

- multivariate testing
- A/B testing through flags
- impact measurement
- direct connection to rollout controls

#### Copy ingredients we can borrow conceptually

Possible section angles:
- Test changes where they actually ship
- Measure product impact, not just click-through
- Move from rollout to proof in one workflow

### 6.6 Surveys

Sources:
- `https://posthog.com/docs/surveys`
- FAQ references

#### Product role

This is the structured user feedback layer.

#### Main promise

Collect feedback from users directly inside the product and use it to learn or trigger next steps.

#### Key differentiators they imply

- no-code and API options
- can help recruit user interviews
- can be customized
- naturally pairs with cohorts, events, and behavior context

#### Use-case angles they highlight

- get product feedback
- find the right users to interview
- automate interview booking
- customize survey appearance

#### Copy ingredients we can borrow conceptually

Possible section angles:
- Ask the right users at the right moment
- Combine behavior data with direct feedback
- Turn qualitative feedback into a repeatable workflow

### 6.7 Error Tracking

Sources:
- `https://posthog.com/error-tracking`
- `https://posthog.com/docs/error-tracking`

#### Product role

This is the engineering reliability and debugging layer.

#### Main promise

Capture, monitor, investigate, and resolve exceptions faster, with user and product context included.

#### Key differentiators they stress

- not isolated from the rest of the stack
- connected to replays
- connected to analytics
- connected to feature flags for rollback
- supports full-stack product teams that want fewer tools

#### Main ideas expressed

- move fast while still shipping confidently
- understand not only the stack trace but also the product impact
- see what happened before and after the error

#### Feature themes from docs

- capture exceptions
- autocapture
- stack traces
- code variable capture
- custom error grouping
- issue management
- team assignments
- alerts
- integrations with GitHub, GitLab, Linear
- release and deploy tracking
- mobile support
- MCP integration
- AI-assisted fixing

#### Use-case framing they use

Especially useful for engineers who:
- ship frequently
- work full-stack
- want fewer disconnected tools
- need to know business or flow impact of bugs

#### Copy ingredients we can borrow conceptually

Possible section angles:
- Fix issues with full customer context
- Connect exceptions to flows, users, and releases
- Go from error to replay to rollback in one workflow
- Ship quickly without flying blind

### 6.8 Logs

Sources:
- `https://posthog.com/docs/logs`

#### Product role

This is the backend/system observability layer connected to product context.

#### Main promise

Search and analyze application logs using standard OpenTelemetry instead of a proprietary logging setup.

#### Key differentiators they stress

- works with OTLP
- no vendor-specific SDK needed
- easy migration from existing OpenTelemetry clients
- logs live next to product data

#### Main ideas expressed

- standard protocol
- easy ingestion
- searchable logs
- analyze operational data inside the same environment as product signals

#### Copy ingredients we can borrow conceptually

Possible section angles:
- Bring operational context into the same workspace as user context
- Keep your telemetry standard, not locked in
- Search logs where product decisions already happen

### 6.9 AI Observability

Sources:
- `https://posthog.com/docs/ai-observability`

#### Product role

This is the monitoring and analysis layer for AI features and LLM-powered product behavior.

#### Main promise

Capture traces, spans, generations, latency, and cost for AI products.

#### Key differentiators they stress

- provider-specific setup guidance
- cost and latency visibility
- model-level usage understanding
- part of the same product data stack

#### Main ideas expressed

- observe AI behavior like product behavior
- inspect traces
- monitor cost
- monitor latency
- compare behavior across models and users

#### Copy ingredients we can borrow conceptually

Possible section angles:
- Make AI features measurable, not mysterious
- Track prompts, outputs, cost, and latency together
- Debug AI experiences with the same rigor as the rest of the product

### 6.10 Data Warehouse

Sources:
- `https://posthog.com/docs/data-warehouse`
- homepage and Product OS references

#### Product role

This is the single-source-of-truth layer.

#### Main promise

Centralize important business and product data in one place.

#### Main ideas expressed

- one source for important data
- link external sources
- query outside data alongside product events
- support better decisions with a fuller customer view

#### Copy ingredients we can borrow conceptually

Possible section angles:
- One place for product, revenue, support, and operational data
- Enrich product understanding with data from outside the app
- Stop making roadmap decisions from partial context

### 6.11 CDP / Data Pipelines

Sources:
- `https://posthog.com/docs/cdp`
- homepage and Product OS references

#### Product role

This is the movement and transformation layer for customer/product data.

#### Main promise

Ingest, transform, and send data to the systems that need it.

#### Main ideas expressed

- full-featured CDP
- transformations on analytics data
- ingest from external sources
- join source data to person and event data
- send data onward to destinations

#### Copy ingredients we can borrow conceptually

Possible section angles:
- Connect incoming and outgoing customer data flows
- Transform once, activate everywhere
- Make product data useful beyond analytics

### 6.12 Workflows

Sources:
- `https://posthog.com/docs/workflows`

#### Product role

This is the automation and messaging layer.

#### Main promise

Build logic that reacts to behavior and sends the right actions or messages at the right time.

#### Key differentiators they stress

- no-code drag-and-drop
- uses PostHog events as triggers
- can dispatch to realtime destinations
- avoids brittle hardcoded integrations

#### Main ideas expressed

- define triggers
- add delays, splits, and actions
- automate processes from product events
- send messages through channels like email, Slack, and Twilio

#### Copy ingredients we can borrow conceptually

Possible section angles:
- Turn user behavior into automated action
- Build journeys from real product events, not guesses
- Replace brittle one-off automation with reusable workflow logic

### 6.13 Endpoints

Sources:
- `https://posthog.com/docs/endpoints`

#### Product role

This is the productized query exposure layer.

#### Main promise

Turn insights or SQL into stable, optimized API endpoints.

#### Main ideas expressed

- embed analytics in your own product
- expose live metrics on a landing page
- pull aggregated data into your app
- bring user behavior into internal tools
- define once, retrieve through a simple API

#### Copy ingredients we can borrow conceptually

Possible section angles:
- Put live product data anywhere you need it
- Turn internal analysis into reusable endpoints
- Power dashboards, feeds, and customer-facing analytics without rebuilding queries

### 6.14 PostHog AI

Sources:
- `https://posthog.com/docs/posthog-ai`
- Product OS references

#### Product role

This is the in-product AI assistant layer.

#### Main promise

An AI assistant that is connected to real product data and can act inside the platform.

#### Key differentiators they stress

- lives inside the app
- deeply connected to event schema and product data
- can query, summarize, explain, and act
- can navigate UI and create assets

#### Main ideas expressed

- answer product and customer questions
- build dashboards and insights
- create flags, SQL, surveys, and more
- summarize replays and experiments
- explain documentation and features

#### Copy ingredients we can borrow conceptually

Possible section angles:
- Ask for answers in natural language, then act on them
- Give your team an assistant that knows the product, not just the docs
- Turn product data into action without switching context

## 7. Cross-product messaging patterns

This is one of the most important parts for our landing work.

PostHog repeatedly connects products to each other instead of selling them independently.

### Most repeated connection patterns

- analytics -> replay
- replay -> error tracking
- error tracking -> feature flags
- flags -> experiments
- analytics -> workflows
- data warehouse -> every product
- AI assistant -> every product

### Their strongest structural copy trick

For almost every product, the hidden message is:
- this tool is useful by itself
- but it is much more useful because it is connected to the rest of the platform

That is the single most transferable idea for a multi-feature SaaS landing.

## 8. Content ingredients we should extract for our own pages

This section converts the research into reusable writing material.

### 8.1 Hero ingredients

PostHog-style hero ingredients usually contain:
- a broad outcome
- a technical audience cue
- a speed or simplicity cue
- one or two proof points
- one low-friction CTA

Reference pattern:
- who it is for
- what it helps them do
- why it is better because it is connected

### 8.2 Problem statements

Problems they repeatedly imply:
- you have data, but not enough context
- your tools are fragmented
- it takes too long to move from signal to action
- engineers are manually wiring too much
- you cannot see user behavior clearly enough
- you can ship features, but not safely enough
- you can see issues, but not their business impact

### 8.3 Benefits language

Types of benefits they prefer:
- speed
- clarity
- confidence
- fewer tools
- lower setup burden
- safer shipping
- better debugging
- better prioritization

### 8.4 Feature-section pattern

A good PostHog-inspired feature section usually says:
- what this capability does
- what friction it removes
- what decision it helps you make
- what other product/module it connects to

### 8.5 CTA language pattern

Their CTAs consistently remove commitment:
- get started free
- no card required
- install quickly
- talk to a human
- try it before you buy it

### 8.6 Trust language pattern

They build trust by emphasizing:
- transparency
- public docs
- public pricing
- technical support
- security/compliance
- broad SDK coverage
- no seat-based restrictions

## 9. Suggested landing architecture inspired by this research

This is not their exact structure.
It is the structure their content suggests for a SaaS with similar breadth.

### Section 1: Hero

Need to establish:
- who we are for
- the main outcome
- why our system is more useful because it connects multiple workflows

### Section 2: Social proof

Need to prove:
- real teams use us
- relevant team types benefit
- ideally specific usage contexts

### Section 3: Why fragmented tools fail

Need to explain:
- isolated analytics / isolated operations / isolated support / isolated rollout data create blind spots

### Section 4: Platform overview

Need to show major capability clusters, for example:
- understand behavior
- debug issues
- ship safely
- collect feedback
- automate follow-up
- unify data

### Section 5: Deep-dive feature blocks

Each block should contain:
- promise
- why it matters
- key capabilities
- a "works with" or "connected to" sub-angle

### Section 6: Data layer / infrastructure block

Need to explain:
- what shared data unlocks
- what external sources enrich the system
- why the platform becomes stronger as more signals connect

### Section 7: Pricing / low-friction adoption

Need to reduce fear:
- easy to start
- transparent to scale
- no unnecessary commitment

### Section 8: Trust / implementation / stack compatibility

Need to answer:
- does this work with our stack?
- how hard is setup?
- can our whole team use it?
- can we trust the vendor?

### Section 9: Final CTA

Need to close with:
- clear action
- low friction
- one final reason to start now

## 10. High-value phrases and ideas to reinterpret, not copy

These are not direct quotes to reuse. They are strategic ideas worth rewriting into our own language.

- one place for product usage and customer context
- move from insight to action without switching tools
- see what changed and why it changed
- ship faster with more confidence
- understand users with both numbers and real behavior
- connect product events, support issues, and release decisions
- use a shared data foundation across the entire lifecycle
- replace disconnected tools with one coherent workflow
- give engineers self-serve control
- keep pricing understandable and adoption easy

## 11. Most important lessons for our actual landing work

If we want to borrow the strongest parts of the PostHog approach, we should do these things:

- sell the system, not isolated features
- keep every feature tied to a workflow outcome
- explain how modules strengthen each other
- write for technical trust, not generic hype
- reduce commitment anxiety with pricing/setup language
- include both operational and strategic value
- mix quantitative visibility with qualitative context

## 12. Recommended next step for us

Use this document as the reference layer, then build the actual landing section by section in this order:

1. hero
2. platform overview
3. feature cluster 1: understand behavior
4. feature cluster 2: debug and resolve
5. feature cluster 3: ship and experiment
6. feature cluster 4: feedback and automation
7. data/integrations section
8. trust + stack compatibility
9. pricing/CTA

When we write each section, we should always answer:
- what is the promise?
- what specific pain does it remove?
- what does the user gain immediately?
- what other module makes it more powerful?
