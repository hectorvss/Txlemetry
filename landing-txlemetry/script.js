const products = [
    {
        id: "product-analytics",
        name: "Product Analytics",
        family: "Analyze",
        tag: "Understand behavior",
        summary:
            "Understand what is happening in your product with funnels, trends, retention, user paths, and retroactive event definitions.",
        details:
            "PostHog describes product analytics as the foundation for seeing what is happening, then jumping directly from a graph into session replay to understand why. Autocapture tracks clicks and pageviews automatically so teams can define important actions later.",
        bullets: ["Funnels, trends, retention, and paths", "Autocapture with retroactive actions", "Connect graphs to recordings and warehouse data"],
        free: "1M events/mo",
        rate: "$0.00005/event",
        source: "posthog.com/product-analytics",
    },
    {
        id: "web-analytics",
        name: "Web Analytics",
        family: "Analyze",
        tag: "Traffic without the bloat",
        summary:
            "Measure traffic, acquisition, pages, and sessions with a simple privacy-friendly analytics surface.",
        details:
            "PostHog positions web analytics as simple, privacy-focused, unsampled, and integrated with the whole platform so a traffic spike can lead straight into replay and product analysis.",
        bullets: ["Traffic and page performance", "No-cookie option", "Billed with product analytics"],
        free: "Included in analytics",
        rate: "Billed with events",
        source: "posthog.com/web-analytics",
    },
    {
        id: "session-replay",
        name: "Session Replay",
        family: "Observe",
        tag: "See the real session",
        summary:
            "Watch how users experienced your product, where they clicked, where they got stuck, and what broke.",
        details:
            "PostHog explains replay as a debugging and empathy tool: see real interactions, uncover confusing UX, and capture context automatically without manually tagging every moment.",
        bullets: ["Watch sessions tied to events", "Debug broken journeys", "Automatic capture for rich context"],
        free: "5K recordings/mo",
        rate: "$0.005/recording",
        source: "posthog.com/session-replay",
    },
    {
        id: "feature-flags",
        name: "Feature Flags",
        family: "Ship",
        tag: "Ship safely",
        summary:
            "Control who sees what, roll out gradually, and roll back fast when a release needs a safety switch.",
        details:
            "PostHog highlights low-latency local evaluation, bootstrapping to avoid flicker, and direct analytics impact measurement as the reason flags belong inside the product OS.",
        bullets: ["Target cohorts and teams", "Local evaluation and instant bootstrapping", "Rollback and measure impact"],
        free: "1M requests/mo",
        rate: "$0.0001/request",
        source: "posthog.com/feature-flags",
    },
    {
        id: "experiments",
        name: "Experiments",
        family: "Ship",
        tag: "Validate ideas",
        summary:
            "Run A/B tests on funnels, events, revenue, ratios, and guardrail metrics before betting the roadmap.",
        details:
            "PostHog describes experiments as a way to test product changes with Bayesian and frequentist engines, unlimited metrics, and measurements across the wider user journey.",
        bullets: ["Funnels, events, revenue, and ratios", "Bayesian and frequentist engines", "Guardrail metrics across the journey"],
        free: "Billed with flags",
        rate: "Feature flag usage",
        source: "posthog.com/experiments",
    },
    {
        id: "surveys",
        name: "Surveys",
        family: "Listen",
        tag: "Ask inside the product",
        summary:
            "Collect feedback directly inside your product, then connect responses to recordings and analytics.",
        details:
            "PostHog emphasizes no-code surveys, API-powered custom UI, and the ability to drill from an answer into the surrounding product behavior.",
        bullets: ["In-product prompts", "No-code or API controlled UI", "Connect answers to users, events, and replay"],
        free: "1.5K responses/mo",
        rate: "$0.10/response",
        source: "posthog.com/surveys",
    },
    {
        id: "error-tracking",
        name: "Error Tracking",
        family: "Observe",
        tag: "Catch and fix faster",
        summary:
            "Monitor exceptions, understand user impact, watch the broken session, and roll back with flags.",
        details:
            "PostHog frames error tracking as connected debugging: monitor issues, use replay to see what happened, analyze impact in funnels or retention, and target affected users.",
        bullets: ["Exceptions with user impact", "Replay the moment of failure", "Analyze and roll back from one place"],
        free: "100K exceptions/mo",
        rate: "$0.00037/exception",
        source: "posthog.com/error-tracking",
    },
    {
        id: "data-stack",
        name: "Data Stack",
        family: "Data",
        tag: "Warehouse plus AI",
        summary:
            "A connected data warehouse, SQL, BI, modeling, imports, exports, and AI over your product data.",
        details:
            "PostHog's data stack is built around an integrated warehouse with DuckDB, PostHog AI, sources, CDP, modeling, SQL editor, BI, and reverse ETL so product and data teams work from the same truth.",
        bullets: ["Managed warehouse and SQL editor", "Sources, CDP, modeling, BI, and exports", "AI over modeled product and business data"],
        free: "1M rows/mo",
        rate: "$0.000015/row",
        source: "posthog.com/data-stack",
    },
    {
        id: "data-pipelines",
        name: "Data Pipelines",
        family: "Data",
        tag: "Move signals",
        summary:
            "Send live events and batch data to the systems that run the rest of the business.",
        details:
            "PostHog pricing separates realtime destinations and batch exports, with free monthly allowances and scaled per-trigger or per-row pricing.",
        bullets: ["Realtime destinations", "Batch exports", "CDP-style data movement"],
        free: "10K triggers + 1M rows/mo",
        rate: "From $0.0005/trigger",
        source: "posthog.com/pricing",
    },
    {
        id: "posthog-ai",
        name: "PostHog AI",
        family: "AI",
        tag: "Ask the system",
        summary:
            "Generate SQL, model data, ask product questions, and make data useful to non-specialists.",
        details:
            "PostHog describes AI as connected to the full data stack so everyone can ask questions and get insight without waiting on a data team for every request.",
        bullets: ["SQL generation", "Data modeling assistance", "Business and product Q&A"],
        free: "500 credits/mo",
        rate: "$0.01/credit",
        source: "posthog.com/data-stack",
    },
    {
        id: "ai-observability",
        name: "AI Observability",
        family: "AI",
        tag: "Watch AI products",
        summary:
            "Track conversations, traces, spans, model performance, latency, cost, and AI product behavior.",
        details:
            "PostHog positions AI observability as regular PostHog events for LLM applications, covering conversations, costs, latency, traces, and model performance.",
        bullets: ["Traces and spans", "Cost and latency analysis", "Conversation and model performance analytics"],
        free: "100K events/mo",
        rate: "$0.00006/event",
        source: "posthog.com/ai-observability",
    },
    {
        id: "logs",
        name: "Logs",
        family: "Observe",
        tag: "Infrastructure context",
        summary:
            "Bring logs into the same surface as product data so incidents and user impact meet.",
        details:
            "PostHog lists Logs in docs and pricing with a 50GB free tier, designed to keep operational signals connected to the customer journey.",
        bullets: ["Log ingestion", "User-impact context", "50GB free allowance"],
        free: "50GB/mo",
        rate: "$0.25/GB",
        source: "posthog.com/pricing",
    },
    {
        id: "workflows",
        name: "Workflows",
        family: "Act",
        tag: "Automate follow-up",
        summary:
            "Create message and destination workflows that react to product and customer signals.",
        details:
            "PostHog pricing lists workflow meters for emails and destinations with a monthly free allowance, making automation part of the usage-based product OS.",
        bullets: ["Email workflows", "Destination dispatches", "Automations tied to behavior"],
        free: "10K messages/channel",
        rate: "From $0.003/email",
        source: "posthog.com/pricing",
    },
    {
        id: "inbox",
        name: "Inbox",
        family: "Listen",
        tag: "Product feedback loop",
        summary:
            "Keep product requests and pull-request style work connected to the team workflow.",
        details:
            "PostHog lists Inbox in the docs and pricing with a free allowance, pointing toward a broader builder workspace beyond analytics alone.",
        bullets: ["Feedback and work intake", "PR-style allowance", "Connected to product context"],
        free: "3 PRs/mo",
        rate: "$15/PR",
        source: "posthog.com/pricing",
    },
    {
        id: "endpoints",
        name: "Endpoints",
        family: "Data",
        tag: "Capture and connect",
        summary:
            "The routing layer for collecting product signals and pushing them into the right surfaces.",
        details:
            "PostHog docs list Endpoints alongside the wider product toolkit, completing the capture side of the system.",
        bullets: ["Event capture surface", "Routing for data products", "Foundation for instrumentation"],
        free: "Included by setup",
        rate: "Usage varies",
        source: "posthog.com/docs",
    },
];

const productResearch = {
    "product-analytics": {
        useCases: ["Find drop-offs in onboarding funnels", "Track activation, retention, and feature adoption", "Turn autocaptured clicks into reusable actions"],
        signals: ["Events", "Funnels", "Retention", "Paths", "Cohorts"],
        pairs: ["Session Replay", "Feature Flags", "Experiments", "Data Stack"],
        workflow: "Start with a question, build the graph, inspect the users behind the curve, then ship a change and measure the result.",
    },
    "web-analytics": {
        useCases: ["Replace bloated web analytics dashboards", "Understand landing page traffic without losing privacy posture", "Jump from page spikes to the sessions behind them"],
        signals: ["Pageviews", "Referrers", "UTMs", "Sessions", "Traffic sources"],
        pairs: ["Product Analytics", "Session Replay", "Surveys"],
        workflow: "Read acquisition and content performance, then connect the visitor journey to deeper product behavior.",
    },
    "session-replay": {
        useCases: ["Watch where a conversion gets stuck", "Debug frontend bugs with real user context", "Build empathy for confusing product moments"],
        signals: ["Recordings", "Clicks", "Console errors", "Network context", "User journey"],
        pairs: ["Product Analytics", "Error Tracking", "Surveys"],
        workflow: "Move from metric to moment: open the exact session, watch the struggle, and turn it into a product fix.",
    },
    "feature-flags": {
        useCases: ["Roll out risky features gradually", "Target beta users and internal teams", "Roll back a release without redeploying"],
        signals: ["Flag evaluations", "Cohorts", "Rollout percentage", "Exposure", "Impact metrics"],
        pairs: ["Experiments", "Product Analytics", "Error Tracking"],
        workflow: "Define the audience, release progressively, monitor impact, and kill-switch instantly if the signal turns bad.",
    },
    experiments: {
        useCases: ["Validate onboarding variants", "Measure revenue or activation impact", "Track guardrails while testing"],
        signals: ["Exposure", "Conversion", "Funnels", "Revenue", "Ratios"],
        pairs: ["Feature Flags", "Product Analytics", "Data Stack"],
        workflow: "Create the hypothesis, assign traffic, monitor primary and secondary metrics, then decide with statistical confidence.",
    },
    surveys: {
        useCases: ["Ask why users did not convert", "Collect NPS or product-market-fit feedback", "Trigger research questions in context"],
        signals: ["Responses", "Cohorts", "User identity", "Session context", "Sentiment"],
        pairs: ["Session Replay", "Product Analytics", "Data Stack"],
        workflow: "Ask inside the product, segment answers by behavior, and watch the surrounding session for richer context.",
    },
    "error-tracking": {
        useCases: ["Prioritize bugs by user impact", "Understand whether errors hurt conversion", "Rollback affected releases with flags"],
        signals: ["Exceptions", "Stack traces", "Impacted users", "Replays", "Release context"],
        pairs: ["Session Replay", "Feature Flags", "Product Analytics"],
        workflow: "Detect the issue, replay the failure, quantify impact, and decide whether to patch, roll back, or message affected users.",
    },
    "data-stack": {
        useCases: ["Create a single customer data source", "Model business and product data together", "Run SQL and BI without exporting everything"],
        signals: ["Warehouse rows", "Sources", "Models", "SQL", "BI dashboards"],
        pairs: ["PostHog AI", "Product Analytics", "Data Pipelines", "Experiments"],
        workflow: "Bring product and business data into one warehouse, model it, and make it usable across analytics and activation.",
    },
    "data-pipelines": {
        useCases: ["Send behavioral events to business tools", "Export modeled datasets", "Power CDP-style routing without another vendor"],
        signals: ["Trigger events", "Batch exports", "Destinations", "Rows", "Sync status"],
        pairs: ["Data Stack", "Workflows", "Product Analytics"],
        workflow: "Capture once, route intentionally, and keep downstream systems synchronized with the product truth.",
    },
    "posthog-ai": {
        useCases: ["Generate SQL faster", "Ask natural-language product questions", "Help non-analysts explore modeled data"],
        signals: ["Credits", "Queries", "Models", "Insights", "Data context"],
        pairs: ["Data Stack", "Product Analytics", "Docs"],
        workflow: "Use AI as the analyst beside the team: ask, inspect, refine, and turn answers into dashboards or product action.",
    },
    "ai-observability": {
        useCases: ["Track LLM cost by feature", "Debug slow or failing model calls", "Measure conversation quality and latency"],
        signals: ["Traces", "Spans", "Tokens", "Latency", "Cost"],
        pairs: ["Product Analytics", "Logs", "Data Stack"],
        workflow: "Treat AI interactions as product events, then analyze model behavior next to the user journey it powers.",
    },
    logs: {
        useCases: ["Connect operational issues to customer impact", "Investigate incidents with product context", "Keep engineering and product signals together"],
        signals: ["GB ingested", "Log lines", "Services", "Severity", "User context"],
        pairs: ["Error Tracking", "AI Observability", "Product Analytics"],
        workflow: "Follow the incident from infrastructure symptoms to the users and journeys that were actually affected.",
    },
    workflows: {
        useCases: ["Automate lifecycle messages", "Trigger destinations from behavior", "Close loops after product signals"],
        signals: ["Messages", "Dispatches", "Conditions", "Cohorts", "Delivery state"],
        pairs: ["Data Pipelines", "Surveys", "Product Analytics"],
        workflow: "Turn insight into action by triggering the right message, destination, or follow-up when behavior crosses a threshold.",
    },
    inbox: {
        useCases: ["Collect product requests", "Connect feedback to shipped work", "Keep builder workflow close to customer signal"],
        signals: ["Requests", "PRs", "Feedback", "Status", "Ownership"],
        pairs: ["Community", "Surveys", "Workflows"],
        workflow: "Capture the request, attach the signal, move it through product work, and keep the feedback loop visible.",
    },
    endpoints: {
        useCases: ["Collect events reliably", "Standardize instrumentation surfaces", "Route product signals into the right tools"],
        signals: ["Requests", "Payloads", "SDKs", "Identity", "Ingestion"],
        pairs: ["Product Analytics", "Data Pipelines", "Data Stack"],
        workflow: "Instrument the product once, then let every downstream screen use the same clean stream of customer behavior.",
    },
};

products.forEach((product) => Object.assign(product, productResearch[product.id] ?? {}));

const meters = [
    {
        id: "events",
        name: "Product analytics events",
        free: 1_000_000,
        max: 300_000_000,
        step: 250_000,
        unit: "events",
        unitSingular: "event",
        tiers: [
            { upTo: 2_000_000, rate: 0.00005 },
            { upTo: 15_000_000, rate: 0.0000343 },
            { upTo: 50_000_000, rate: 0.0000295 },
            { upTo: 100_000_000, rate: 0.0000218 },
            { upTo: 250_000_000, rate: 0.000015 },
            { upTo: Infinity, rate: 0.000009 },
        ],
    },
    {
        id: "recordings",
        name: "Session recordings",
        free: 5_000,
        max: 750_000,
        step: 2_500,
        unit: "recordings",
        unitSingular: "recording",
        tiers: [
            { upTo: 15_000, rate: 0.005 },
            { upTo: 50_000, rate: 0.0035 },
            { upTo: 150_000, rate: 0.002 },
            { upTo: 500_000, rate: 0.0017 },
            { upTo: Infinity, rate: 0.0015 },
        ],
    },
    {
        id: "flags",
        name: "Feature flag requests",
        free: 1_000_000,
        max: 100_000_000,
        step: 250_000,
        unit: "requests",
        unitSingular: "request",
        tiers: [
            { upTo: 2_000_000, rate: 0.0001 },
            { upTo: 10_000_000, rate: 0.000045 },
            { upTo: 50_000_000, rate: 0.000025 },
            { upTo: Infinity, rate: 0.00001 },
        ],
    },
    {
        id: "surveys",
        name: "Survey responses",
        free: 1_500,
        max: 75_000,
        step: 250,
        unit: "responses",
        unitSingular: "response",
        tiers: [
            { upTo: 2_000, rate: 0.1 },
            { upTo: 10_000, rate: 0.035 },
            { upTo: 20_000, rate: 0.015 },
            { upTo: Infinity, rate: 0.01 },
        ],
    },
    {
        id: "warehouse",
        name: "Warehouse rows",
        free: 1_000_000,
        max: 1_200_000_000,
        step: 2_000_000,
        unit: "rows",
        unitSingular: "row",
        tiers: [
            { upTo: 10_000_000, rate: 0.000015 },
            { upTo: 25_000_000, rate: 0.00001 },
            { upTo: 50_000_000, rate: 0.000008 },
            { upTo: 100_000_000, rate: 0.000005 },
            { upTo: 1_000_000_000, rate: 0.000002 },
            { upTo: Infinity, rate: 0.000001 },
        ],
    },
    {
        id: "exceptions",
        name: "Tracked exceptions",
        free: 100_000,
        max: 20_000_000,
        step: 50_000,
        unit: "exceptions",
        unitSingular: "exception",
        tiers: [
            { upTo: 325_000, rate: 0.00037 },
            { upTo: 10_000_000, rate: 0.00014 },
            { upTo: Infinity, rate: 0.000115 },
        ],
    },
    {
        id: "aiEvents",
        name: "AI observability events",
        free: 100_000,
        max: 20_000_000,
        step: 50_000,
        unit: "events",
        unitSingular: "event",
        tiers: [{ upTo: Infinity, rate: 0.00006 }],
    },
    {
        id: "logs",
        name: "Logs ingested",
        free: 50,
        max: 2_000,
        step: 10,
        unit: "GB",
        unitSingular: "GB",
        tiers: [
            { upTo: 300, rate: 0.25 },
            { upTo: Infinity, rate: 0.15 },
        ],
    },
];

const state = Object.fromEntries(meters.map((meter) => [meter.id, meter.free]));
state.planName = "Explore";
state.planPrice = 0;

const presets = {
    startup: {
        planName: "Growth",
        events: 3_000_000,
        recordings: 25_000,
        flags: 2_500_000,
        surveys: 4_000,
        warehouse: 8_000_000,
        exceptions: 250_000,
        aiEvents: 300_000,
        logs: 120,
    },
    scaleup: {
        planName: "Growth",
        events: 55_000_000,
        recordings: 160_000,
        flags: 30_000_000,
        surveys: 18_000,
        warehouse: 120_000_000,
        exceptions: 2_000_000,
        aiEvents: 3_000_000,
        logs: 450,
    },
    ai: {
        planName: "Scale",
        events: 25_000_000,
        recordings: 80_000,
        flags: 18_000_000,
        surveys: 9_000,
        warehouse: 240_000_000,
        exceptions: 1_000_000,
        aiEvents: 12_000_000,
        logs: 900,
    },
};

const productFamilies = ["All", "Analyze", "Observe", "Ship", "Listen", "Data", "AI", "Act"];
let activeProductFamily = "All";
let spotlightProductId = "product-analytics";

const formatNumber = (value) => new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);
const formatMoney = (value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
const formatRate = (value) =>
    value >= 0.01 ? `$${value.toFixed(2)}` : `$${value.toFixed(6).replace(/0+$/, "").replace(/\.$/, "")}`;

function calculateTieredCost(meter, value) {
    let cost = 0;
    let previousLimit = meter.free;
    const activeTiers = [];

    for (const tier of meter.tiers) {
        const tierLimit = tier.upTo;
        const unitsInTier = Math.max(0, Math.min(value, tierLimit) - previousLimit);

        if (unitsInTier > 0) {
            const tierCost = unitsInTier * tier.rate;
            cost += tierCost;
            activeTiers.push({
                units: unitsInTier,
                rate: tier.rate,
                cost: tierCost,
                label: `${formatNumber(previousLimit)}-${tierLimit === Infinity ? "unlimited" : formatNumber(tierLimit)} ${meter.unit}`,
            });
        }

        previousLimit = tierLimit;
        if (value <= tierLimit) break;
    }

    return {
        billable: Math.max(0, value - meter.free),
        cost,
        activeTiers,
    };
}

function setScreen(id) {
    const target = document.querySelector(`[data-screen="${id}"]`) ? id : "home";
    document.querySelectorAll("[data-screen]").forEach((screen) => {
        screen.classList.toggle("is-active", screen.dataset.screen === target);
    });
    document.querySelectorAll("[data-screen-link]").forEach((link) => {
        link.classList.toggle("is-active", link.dataset.screenLink === target);
    });
    document.querySelector("[data-topbar]")?.classList.toggle("is-open", false);
    window.scrollTo({ top: 0, behavior: "auto" });
}

function routeFromHash() {
    setScreen((window.location.hash || "#home").slice(1));
}

function renderProducts() {
    const board = document.querySelector("[data-product-board]");
    if (!board) return;
    const filters = document.querySelector("[data-product-filters]");
    const visibleProducts =
        activeProductFamily === "All" ? products : products.filter((product) => product.family === activeProductFamily);

    if (filters) {
        filters.innerHTML = productFamilies
            .map((family) => {
                const count = family === "All" ? products.length : products.filter((product) => product.family === family).length;
                return `<button type="button" class="${family === activeProductFamily ? "is-active" : ""}" data-product-family="${family}">${family}<span>${count}</span></button>`;
            })
            .join("");
    }

    if (!visibleProducts.some((product) => product.id === spotlightProductId)) {
        spotlightProductId = visibleProducts[0]?.id ?? products[0].id;
    }

    renderProductSpotlight();

    board.innerHTML = products
        .filter((product) => activeProductFamily === "All" || product.family === activeProductFamily)
        .map(
            (product, index) => `
                <a class="product-card ${product.id === spotlightProductId ? "is-spotlighted" : ""}" href="#${product.id}" data-screen-link="${product.id}" data-product-preview="${product.id}" style="animation-delay:${index * 34}ms">
                    <span>${product.family} / ${product.tag}</span>
                    <div>
                        <h2>${product.name}</h2>
                        <p>${product.summary}</p>
                    </div>
                    <strong>${product.free} - ${product.rate}</strong>
                </a>
            `
        )
        .join("");

    const app = document.querySelector("#app");
    products.forEach((product) => {
        if (document.querySelector(`[data-screen="${product.id}"]`)) return;
        const screen = document.createElement("section");
        screen.className = "screen";
        screen.dataset.screen = product.id;
        const related = products.filter((candidate) => product.pairs?.includes(candidate.name)).slice(0, 4);
        screen.innerHTML = `
            <article class="product-detail" style="--accent-index:${products.indexOf(product) % 5}">
                <p class="eyebrow">${product.tag}</p>
                <h1>${product.name}</h1>
                <p class="product-detail__lede">${product.summary}</p>
                <div class="product-detail__grid">
                    <div class="product-detail__panel">
                        <h2>What it does</h2>
                        <p>${product.details}</p>
                        <p><strong>Source:</strong> ${product.source}</p>
                    </div>
                    <div class="product-detail__panel">
                        <h2>Useful when you need</h2>
                        <ul>${product.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}</ul>
                        <p><strong>Free tier:</strong> ${product.free}</p>
                        <p><strong>Pay-as-you-go:</strong> ${product.rate}</p>
                    </div>
                </div>
                <div class="product-lab">
                    <section class="product-lab__main">
                        <p class="kicker">Workflow</p>
                        <h2>How teams use it</h2>
                        <p>${product.workflow}</p>
                    </section>
                    <section>
                        <p class="kicker">Use cases</p>
                        <ul class="pill-list">${(product.useCases ?? []).map((item) => `<li>${item}</li>`).join("")}</ul>
                    </section>
                    <section>
                        <p class="kicker">Signals</p>
                        <ul class="signal-list">${(product.signals ?? []).map((item) => `<li>${item}</li>`).join("")}</ul>
                    </section>
                    <section>
                        <p class="kicker">Pairs with</p>
                        <div class="related-links">
                            ${related
                                .map((item) => `<a href="#${item.id}" data-screen-link="${item.id}">${item.name}</a>`)
                                .join("")}
                        </div>
                    </section>
                </div>
                <a class="back-link" href="#products" data-screen-link="products">Back to Product OS</a>
            </article>
        `;
        app.appendChild(screen);
    });
}

function renderProductSpotlight() {
    const spotlight = document.querySelector("[data-product-spotlight]");
    if (!spotlight) return;
    const product = products.find((item) => item.id === spotlightProductId) ?? products[0];
    spotlight.innerHTML = `
        <div>
            <p class="kicker">${product.family} system</p>
            <h2>${product.name}</h2>
            <p>${product.details}</p>
            <div class="spotlight-meta">
                <span>${product.free}</span>
                <span>${product.rate}</span>
                <span>${product.source}</span>
            </div>
        </div>
        <div class="spotlight-orbit" aria-hidden="true">
            ${(product.signals ?? []).map((signal, index) => `<span style="--i:${index}">${signal}</span>`).join("")}
        </div>
        <a class="button button--light" href="#${product.id}" data-screen-link="${product.id}">Open ${product.name}</a>
    `;
}

function renderMeters() {
    const list = document.querySelector("[data-meter-list]");
    if (list) {
        list.innerHTML = meters
            .map(
                (meter) => `
                    <div class="meter">
                        <strong>${meter.name}</strong>
                        <span>${formatNumber(meter.free)} ${meter.unit} free, then from ${formatRate(meter.tiers[0].rate)}/${meter.unitSingular}</span>
                    </div>
                `
            )
            .join("");
    }

    const calculator = document.querySelector("[data-calculator]");
    if (!calculator) return;

    calculator.innerHTML = meters
        .map(
            (meter) => `
                <div class="range-card">
                    <label for="${meter.id}">
                        <span>${meter.name}</span>
                        <output data-output="${meter.id}">${formatNumber(meter.free)} ${meter.unit}</output>
                    </label>
                    <input id="${meter.id}" type="range" min="0" max="${meter.max}" step="${meter.step}" value="${meter.free}" data-meter="${meter.id}" />
                    <div class="range-card__bar"><span data-bar="${meter.id}"></span></div>
                    <div class="range-card__math">
                        <span data-billable="${meter.id}">0 billable ${meter.unit}</span>
                        <strong data-subtotal="${meter.id}">$0</strong>
                    </div>
                    <div class="tier-breakdown" data-breakdown="${meter.id}"></div>
                    <small>${formatNumber(meter.free)} ${meter.unit} included monthly</small>
                </div>
            `
        )
        .join("");

    calculator.addEventListener("input", (event) => {
        const input = event.target.closest("[data-meter]");
        if (!input) return;
        state[input.dataset.meter] = Number(input.value);
        updateCalculator();
    });

    updateCalculator();
}

function updateCalculator() {
    let total = 0;
    meters.forEach((meter) => {
        const value = state[meter.id] ?? 0;
        const { billable, cost: subtotal, activeTiers } = calculateTieredCost(meter, value);
        const output = document.querySelector(`[data-output="${meter.id}"]`);
        if (output) output.textContent = `${formatNumber(value)} ${meter.unit}`;
        const bar = document.querySelector(`[data-bar="${meter.id}"]`);
        if (bar) bar.style.width = `${Math.max(2, Math.min(100, (value / meter.max) * 100))}%`;
        const billableNode = document.querySelector(`[data-billable="${meter.id}"]`);
        if (billableNode) billableNode.textContent = `${formatNumber(billable)} billable ${meter.unit}`;
        const subtotalNode = document.querySelector(`[data-subtotal="${meter.id}"]`);
        if (subtotalNode) subtotalNode.textContent = formatMoney(subtotal);
        const breakdown = document.querySelector(`[data-breakdown="${meter.id}"]`);
        if (breakdown) {
            breakdown.innerHTML =
                activeTiers.length === 0
                    ? `<span>Inside free tier</span>`
                    : activeTiers
                          .slice(0, 3)
                          .map((tier) => `<span>${formatNumber(tier.units)} at ${formatRate(tier.rate)} = ${formatMoney(tier.cost)}</span>`)
                          .join("");
        }
        total += subtotal;
    });
    const totalNode = document.querySelector("[data-total]");
    if (totalNode) totalNode.textContent = formatMoney(total);
    const planLabel = document.querySelector("[data-plan-label]");
    if (planLabel) planLabel.textContent = `${state.planName} plan base: ${formatMoney(state.planPrice)}/mo`;
    const grandTotal = document.querySelector("[data-grand-total]");
    if (grandTotal) grandTotal.textContent = `${formatMoney(total + state.planPrice)}/mo`;
}

function applyPreset(name) {
    const preset = presets[name];
    if (!preset) return;

    meters.forEach((meter) => {
        const value = Math.min(meter.max, preset[meter.id] ?? meter.free);
        state[meter.id] = value;
        const input = document.querySelector(`[data-meter="${meter.id}"]`);
        if (input) input.value = String(value);
    });

    const matchingPlan = [...document.querySelectorAll("[data-plan-card]")].find(
        (card) => card.dataset.planName === preset.planName
    );
    if (matchingPlan) {
        document.querySelectorAll("[data-plan-card]").forEach((item) => item.classList.toggle("is-selected", item === matchingPlan));
        state.planName = matchingPlan.dataset.planName ?? "Explore";
        state.planPrice = Number(matchingPlan.dataset.planPrice ?? 0);
    }

    document.querySelectorAll("[data-preset]").forEach((button) => {
        button.classList.toggle("is-active", button.dataset.preset === name);
    });

    updateCalculator();
}

function bindPlanCards() {
    const cards = document.querySelectorAll("[data-plan-card]");
    const selectPlan = (card) => {
        cards.forEach((item) => item.classList.toggle("is-selected", item === card));
        state.planName = card.dataset.planName ?? "Explore";
        state.planPrice = Number(card.dataset.planPrice ?? 0);
        updateCalculator();
    };

    cards.forEach((card) => {
        card.addEventListener("click", () => selectPlan(card));
        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                selectPlan(card);
            }
        });
    });
}

function bindPresets() {
    document.querySelectorAll("[data-preset]").forEach((button) => {
        button.addEventListener("click", () => applyPreset(button.dataset.preset));
    });
}

function bindNavigation() {
    document.addEventListener("click", (event) => {
        const link = event.target.closest("[data-screen-link]");
        if (!link) return;
        const screen = link.dataset.screenLink;
        if (!screen) return;
        event.preventDefault();
        history.pushState(null, "", `#${screen}`);
        setScreen(screen);
    });

    window.addEventListener("hashchange", routeFromHash);

    document.querySelector("[data-menu-button]")?.addEventListener("click", () => {
        document.querySelector("[data-topbar]")?.classList.toggle("is-open");
    });

    window.addEventListener("scroll", () => {
        document.querySelector("[data-topbar]")?.classList.toggle("is-solid", window.scrollY > 40);
    });
}

function bindProductAtlas() {
    document.addEventListener("click", (event) => {
        const familyButton = event.target.closest("[data-product-family]");
        if (familyButton) {
            activeProductFamily = familyButton.dataset.productFamily ?? "All";
            const firstInFamily =
                activeProductFamily === "All"
                    ? products[0]
                    : products.find((product) => product.family === activeProductFamily) ?? products[0];
            spotlightProductId = firstInFamily.id;
            renderProducts();
            return;
        }

        const preview = event.target.closest("[data-product-preview]");
        if (preview && event.type === "click" && event.altKey) {
            event.preventDefault();
            spotlightProductId = preview.dataset.productPreview;
            renderProducts();
        }
    });

    document.addEventListener("pointerover", (event) => {
        const preview = event.target.closest("[data-product-preview]");
        if (!preview || preview.dataset.productPreview === spotlightProductId) return;
        spotlightProductId = preview.dataset.productPreview;
        renderProductSpotlight();
        document.querySelectorAll("[data-product-preview]").forEach((card) => {
            card.classList.toggle("is-spotlighted", card.dataset.productPreview === spotlightProductId);
        });
    });
}

function bindFluidHero() {
    const hero = document.querySelector("[data-fluid-hero]");
    if (!hero) return;
    const update = (clientX, clientY) => {
        const rect = hero.getBoundingClientRect();
        const x = ((clientX - rect.left) / rect.width) * 100;
        const y = ((clientY - rect.top) / rect.height) * 100;
        hero.style.setProperty("--mx", `${Math.max(0, Math.min(100, x))}%`);
        hero.style.setProperty("--my", `${Math.max(0, Math.min(100, y))}%`);
    };

    hero.addEventListener("pointermove", (event) => update(event.clientX, event.clientY));
    hero.addEventListener("pointerleave", () => {
        hero.style.setProperty("--mx", "50%");
        hero.style.setProperty("--my", "50%");
    });
}

renderProducts();
renderMeters();
bindNavigation();
bindFluidHero();
bindPlanCards();
bindPresets();
bindProductAtlas();
routeFromHash();
