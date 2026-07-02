/* global React, TxlemetryV2 */
(function () {
  const { useState } = React;
  const { PageShell } = TxlemetryV2;

  /* ── Hero assets ── */
  const imgHeroIllustration = "/assets/txl/hero.png";
  const imgHeroImage = "/assets/txl/card-25.png";

  /* ── Productivity assets ── */
  const imgProdGroup = "/v2/assets/5c08b485-b305-47bd-b632-fc94f4071793.svg";
  const imgProdGroup1 = "/v2/assets/e1f72566-9cd2-4d5a-8ff6-a14e508939d3.svg";
  const imgProdGroup2 = "/v2/assets/7a5e1e6c-35bf-4070-bb8e-a9024a76a2b3.svg";
  const imgProdBees = "/assets/txl/card-05.png";
  const imgProdUi = "/assets/txl/card-06.png";
  const imgProdAngelo = "/assets/txl/card-07.png";

  /* ── Usability assets ── */
  const imgUsabPeople = "/assets/txl/card-08.png";
  const imgUsabInsight = "/assets/txl/card-09.png";
  const imgUsabTickets = "/assets/txl/card-10.png";
  const imgUsabIntegration = "/assets/txl/card-11.png";

  /* ── Outbound assets ── */
  const imgOutbVector = "/v2/assets/c7818938-7240-4f79-b339-95a672d656d4.svg";
  const imgOutbSatellite = "/assets/txl/card-12.png";
  const imgOutbProduct = "/assets/txl/card-13.png";

  /* ── Features assets ── */
  const imgFeatVector = "/v2/assets/dc7637c6-f557-4e38-ad82-5bf4e5ff349a.svg";
  const imgFeatVector1 = "/v2/assets/0a0c19d5-b6ae-421e-aa39-fcbb1c7b4bc9.svg";
  const imgFeatInbox = "/assets/txl/card-14.png";
  const imgFeatCopilot = "/assets/txl/card-15.png";
  const imgFeatTickets = "/assets/txl/card-16.png";
  const imgFeatOmnichannel = "/assets/txl/card-17.png";
  const imgFeatHelpCenter = "/assets/txl/card-18.png";
  const imgFeatApps = "/assets/txl/card-19.png";
  const imgFeatReporting = "/assets/txl/card-20.png";
  const imgFeatKnowledge = "/assets/txl/card-21.png";
  const imgFeatOutbound = "/assets/txl/card-22.png";

  /* ── CTA assets ── */
  const imgCtaBanner = "/assets/txl/card-23.png";

  const FEATURES = [
    { name: 'Session replay', img: imgFeatInbox, desc: 'Jump from a broken metric into the real sessions, friction points and user behavior behind it.', link: '/inbox' },
    { name: 'Txlemetry AI', img: imgFeatCopilot, desc: 'An AI workspace that helps teams query data, summarize trends and move from insight to action faster.', link: '/copilot' },
    { name: 'Feature flags', img: imgFeatTickets, desc: 'Ship safely with progressive rollouts, remote config and experiments tied to the same data model.', link: '/tickets' },
    { name: 'Data pipelines', img: imgFeatOmnichannel, desc: 'Route product signals in and out of your stack without losing context across tools and teams.', link: '/omnichannel' },
    { name: 'Data warehouse', img: imgFeatHelpCenter, desc: 'Bring product, revenue, lifecycle and business context together in one place for better decisions.', link: '/knowledge' },
    { name: 'Apps & Integrations', img: imgFeatApps, desc: 'Connect your existing tools so analytics, rollout and warehouse workflows share the same foundation.', link: '/integrations' },
    { name: 'Dashboards', img: imgFeatReporting, desc: 'Monitor trends, funnels, retention and product changes with reports designed for real product questions.', link: '/reporting' },
    { name: 'Warehouse models', img: imgFeatKnowledge, desc: 'Centralize the definitions, sources and datasets that make the rest of the platform more useful.', link: '/knowledge' },
    { name: 'Web analytics', img: imgFeatOutbound, desc: 'Understand traffic, conversion and content performance in a simpler view that still connects back to product behavior.', link: '#' },
  ];

  function FeatureArrow({ active }) {
    return (
      <div className={`relative shrink-0 size-[36px] transition-opacity${active ? '' : ' opacity-0'}`}>
        <img loading="lazy" decoding="async" alt="" className="absolute inset-0 max-w-none size-full" src={imgFeatVector} />
        <img loading="lazy" decoding="async" alt="" className="absolute inset-0 max-w-none size-full" src={imgFeatVector1} />
      </div>
    );
  }

  const HERO_FEATURES = ['Session replay','Txlemetry AI','Feature flags','Data pipelines','Data warehouse','Apps & Integrations','Dashboards','Warehouse models','Web analytics'];

  function HowItWorksPage() {
    const [activeFeature, setActiveFeature] = useState(7);

    return (
      <PageShell>
        {/* ═══════ Section 1 — Hero ═══════ */}
        <div className="relative w-full overflow-hidden" style={{ background: '#17100e' }}>
          {/* Background illustration — shown at full opacity, no color tint */}
          <div className="absolute inset-0">
            <img loading="lazy" decoding="async" alt="" className="absolute inset-0 w-full h-full object-cover" src={imgHeroIllustration} />
          </div>
          {/* Fade overlay top half — kept light, just enough for text legibility */}
          <div className="absolute top-0 left-0 right-0 bottom-1/2" style={{ background: 'linear-gradient(to bottom, rgba(23,16,14,0.55) 0%, transparent 100%)' }} />

          <div className="relative max-w-[1230px] mx-auto px-6 pt-[151px] pb-[160px]">
            {/* Heading + description + buttons */}
            <div className="flex flex-col gap-8 max-w-[760px]" style={{ opacity: 1 }}>
              <div>
                <p className="font-semibold text-white leading-[76px] tracking-[-4px] m-0" style={{ fontFamily: "'Inter', sans-serif", fontSize: '74px' }}>The product OS</p>
                <p className="font-semibold text-white leading-[76px] tracking-[-4px] m-0" style={{ fontFamily: "'Inter', sans-serif", fontSize: '74px', paddingLeft: '230px' }}>designed for product teams</p>
              </div>
              <div className="max-w-[500px]">
                <p className="text-white text-[16px] leading-[22px] m-0" style={{ fontFamily: "'Inter', sans-serif" }}>Txlemetry is a modern, AI-powered platform for product analytics, session replay, feature flags, experimentation and shared data infrastructure.</p>
              </div>
              <div className="flex gap-2 pt-1">
                <a data-spa href="/demo" className="border border-white rounded-[6px] px-[17px] py-[11px] text-white text-[15px] font-semibold tracking-[-0.4px] text-center no-underline" style={{ fontFamily: "'Inter', sans-serif" }}>View demo</a>
                <a data-spa href="/signup" className="bg-white rounded-[6px] px-[16px] py-[10px] text-[#17100e] text-[15px] font-semibold tracking-[-0.4px] text-center no-underline" style={{ fontFamily: "'Inter', sans-serif" }}>Start free trial</a>
              </div>
            </div>

            {/* Product visual */}
            <div className="mt-12 relative rounded-lg overflow-hidden" style={{ aspectRatio: '1230/792' }}>
              <img loading="lazy" decoding="async" alt="" className="absolute inset-0 w-full h-full object-cover" src={imgHeroImage} />
            </div>

            {/* Feature icon row */}
            <div className="flex flex-wrap gap-x-12 gap-y-2 mt-10 items-center">
              {HERO_FEATURES.map((label) => (
                <span key={label} className="font-normal text-[12px] text-white tracking-[1.2px] uppercase whitespace-nowrap" style={{ fontFamily: "'Inter', sans-serif" }}>{label}</span>
              ))}
            </div>

            {/* How Txlemetry drives efficiency */}
            <div className="mt-12 flex flex-col gap-12">
              <div className="text-center">
                <p className="font-semibold text-white text-[44px] leading-[55px] tracking-[-1.44px] m-0" style={{ fontFamily: "'Inter', sans-serif" }}>How Txlemetry compounds product insight</p>
              </div>
              {/* 3-column bar */}
              <div className="flex gap-8 p-8 rounded-[6px] border border-white/20" style={{ backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.01)' }}>
                {[
                  { label: 'Understand', title1: 'Analytics that sharpen', title2: 'understanding' },
                  { label: 'Ship', title1: "Workflows that help you", title2: 'ship with confidence' },
                  { label: 'Unify', title1: 'Shared data that makes', title2: 'every module stronger' },
                ].map((col, i) => (
                  <React.Fragment key={col.label}>
                    {i > 0 && <div className="w-px shrink-0 self-stretch bg-white/20" />}
                    <div className="flex-1 flex flex-col gap-4">
                      <span className="bg-white rounded-full px-4 py-[5px] text-[12px] text-[#17100e] tracking-[1.2px] uppercase self-start" style={{ fontFamily: "'Inter', sans-serif" }}>{col.label}</span>
                      <div>
                        <p className="font-semibold text-white text-[26px] leading-[32px] tracking-[-0.66px] m-0" style={{ fontFamily: "'Inter', sans-serif" }}>{col.title1}</p>
                        <p className="font-semibold text-white text-[26px] leading-[32px] tracking-[-0.66px] m-0" style={{ fontFamily: "'Inter', sans-serif" }}>{col.title2}</p>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ Section 2 — Productivity ═══════ */}
        <div className="w-full" style={{ background: '#f4f3ec' }}>
          <div className="max-w-[1160px] mx-auto px-6 py-[96px]">
            {/* Header */}
            <div className="flex flex-col gap-6 mb-8">
              <div>
                <p className="font-semibold text-black leading-[76px] tracking-[-4px] m-0" style={{ fontFamily: "'Inter', sans-serif", fontSize: '74px' }}>AI workflows that</p>
                <p className="font-semibold text-black leading-[76px] tracking-[-4px] m-0" style={{ fontFamily: "'Inter', sans-serif", fontSize: '73px', paddingLeft: '229px' }}>accelerate analysis</p>
              </div>
              <p className="max-w-[480px] text-[16.5px] leading-[24px] m-0" style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(23,16,14,0.8)' }}>Teams can answer complex product questions faster with AI summaries, reusable workflows and a shared context that spans analytics, replay and rollout decisions.</p>
            </div>

            {/* Bees illustration */}
            <div className="rounded-[6px] overflow-hidden mb-12" style={{ aspectRatio: '1160/396' }}>
              <img loading="lazy" decoding="async" alt="" className="w-full h-full object-cover" src={imgProdBees} />
            </div>

            {/* Product UI screenshot */}
            <div className="bg-[#e7e6df] rounded-[10px] overflow-hidden mb-6" style={{ aspectRatio: '1160/490' }}>
              <img loading="lazy" decoding="async" alt="" className="w-full h-full object-cover" src={imgProdUi} />
            </div>

            {/* 3-column features */}
            <div className="flex gap-0 justify-between mb-12">
              {[
                { title: 'An AI assistant for every product team', desc: 'Txlemetry AI helps query data, summarize replays, inspect changes and move from question to action without leaving the workspace.', link: '/copilot' },
                { title: 'Automate repetitive analysis', desc: 'Reusable workflows handle handoffs, repetitive checks and operational follow-up so teams can focus on decisions instead of glue work.', link: '/copilot' },
                { title: 'Give every team the same context', desc: 'Product, growth and engineering can all work from the same signals instead of stitching together separate views across tools.', link: null },
              ].map((feat) => (
                <div key={feat.title} className="flex flex-col max-w-[370px]">
                  <p className="font-semibold text-[16.5px] text-[#17100e] tracking-[-0.18px] leading-[22px] mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>{feat.title}</p>
                  <p className="text-[14.5px] leading-[22px] m-0" style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(23,16,14,0.6)' }}>{feat.desc}</p>
                  {feat.link && (
                    <span className="mt-3 font-semibold text-[15px] text-[#17100e] cursor-pointer inline-block border-b border-[#17100e] self-start" style={{ fontFamily: "'Inter', sans-serif" }} onClick={() => TxlemetryV2.navigate(feat.link)}>Learn more</span>
                  )}
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="border border-[rgba(23,16,14,0.2)] rounded-[6px] p-[49px]">
              <div className="grid grid-cols-[1fr_2fr] gap-8">
                {/* Photo */}
                <div className="row-span-2 rounded-[6px] overflow-hidden" style={{ aspectRatio: '1/1' }}>
                  <img loading="lazy" decoding="async" alt="Angelo Livanos" className="w-full h-full object-cover" src={imgProdAngelo} />
                </div>
                {/* Quote area */}
                <div className="flex flex-col gap-4">
                  {/* Company logo */}
                  <div className="h-[25px] w-[102px]" style={{ maskImage: `url('${imgProdGroup}'), url('${imgProdGroup1}')`, maskSize: '100%', maskRepeat: 'no-repeat', WebkitMaskImage: `url('${imgProdGroup}'), url('${imgProdGroup1}')`, WebkitMaskSize: '100%', WebkitMaskRepeat: 'no-repeat' }}>
                    <img loading="lazy" decoding="async" alt="" className="w-full h-full" src={imgProdGroup2} />
                  </div>
                  {/* Quote text */}
                  <div className="tracking-[-1.8px]" style={{ fontFamily: "'Inter', sans-serif", color: 'black' }}>
                    <p className="text-[36px] leading-[43px] m-0">{`“The fastest product teams are not the ones`}</p>
                    <p className="text-[35px] leading-[43px] m-0">with the most dashboards. They are the ones</p>
                    <p className="text-[35px] leading-[43px] m-0">where analytics, replay, flags and data live</p>
                    <p className="text-[35px] leading-[43px] m-0">close enough together that every insight can</p>
                    <p className="text-[35px] leading-[43px] m-0">{`turn into action immediately.”`}</p>
                  </div>
                </div>
                {/* Attribution */}
                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-bold text-[15px] text-black tracking-[-0.16px] leading-[20px] m-0" style={{ fontFamily: "'Inter', sans-serif" }}>Angelo Livanos</p>
                    <p className="text-[15px] leading-[22px] m-0" style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(0,0,0,0.6)' }}>Head of Product, Northwind</p>
                  </div>
                  <span className="font-semibold text-[15px] text-black cursor-pointer border-b border-black pb-1" style={{ fontFamily: "'Inter', sans-serif" }} onClick={() => TxlemetryV2.navigate('#')}>Read all customer stories</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ Section 3 — Usability ═══════ */}
        <div className="w-full" style={{ background: '#f4f3ec' }}>
          <div className="max-w-[1160px] mx-auto px-6 py-[96px]">
            {/* Header */}
            <div className="flex flex-col gap-6 mb-8">
              <div>
                <p className="font-semibold text-black leading-[76px] tracking-[-4px] m-0" style={{ fontFamily: "'Inter', sans-serif", fontSize: '74px' }}>{`Modern software that is`}</p>
                <p className="font-semibold text-black leading-[76px] tracking-[-4px] m-0" style={{ fontFamily: "'Inter', sans-serif", fontSize: '74px', paddingLeft: '247px' }}>fast and friction-free</p>
              </div>
              <p className="max-w-[480px] text-[16.5px] leading-[24px] m-0" style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(23,16,14,0.8)' }}>Txlemetry is fast to set up and easy to use. Pre-built reports, shared schemas and native integrations help teams move seamlessly from visibility to rollout.</p>
            </div>

            {/* People illustration */}
            <div className="rounded-[6px] overflow-hidden mb-12" style={{ aspectRatio: '1160/396' }}>
              <img loading="lazy" decoding="async" alt="" className="w-full h-full object-cover" src={imgUsabPeople} />
            </div>

            {/* Product UI — Reporting */}
            <div className="bg-[#e7e6df] rounded-[10px] overflow-hidden mb-6" style={{ aspectRatio: '1160/490' }}>
              <img loading="lazy" decoding="async" alt="" className="w-full h-full object-cover" src={imgUsabInsight} />
            </div>

            {/* Single feature text */}
            <div className="max-w-[390px] mb-12">
              <p className="font-semibold text-[16.5px] text-[#17100e] tracking-[-0.18px] leading-[22px] mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Instant insight with pre-built reporting</p>
              <p className="text-[14.5px] leading-[22px] m-0" style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(23,16,14,0.6)' }}>Monitor trends, funnels, retention and product health with reports that are useful from day one.</p>
              <span className="mt-3 font-semibold text-[15px] text-[#17100e] cursor-pointer inline-block border-b border-[#17100e]" style={{ fontFamily: "'Inter', sans-serif" }} onClick={() => TxlemetryV2.navigate('/reporting')}>Learn more</span>
            </div>

            {/* 2-column: Ticketing + Integrations */}
            <div className="flex gap-8">
              {/* Ticketing */}
              <div className="flex-1 flex flex-col gap-4">
                <div className="bg-[#e7e6df] rounded-[10px] overflow-hidden" style={{ aspectRatio: '564/388' }}>
                  <img loading="lazy" decoding="async" alt="" className="w-full h-full object-cover" src={imgUsabTickets} />
                </div>
                <div className="max-w-[390px]">
                  <p className="font-semibold text-[16.5px] text-[#17100e] tracking-[-0.18px] leading-[22px] mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Rollouts designed for teamwork</p>
                  <p className="text-[14.5px] leading-[22px] m-0" style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(23,16,14,0.6)' }}>Ship changes more safely with feature flags and experiments that keep product, engineering and growth aligned on the same outcomes.</p>
                  <span className="mt-3 font-semibold text-[15px] text-[#17100e] cursor-pointer inline-block border-b border-[#17100e]" style={{ fontFamily: "'Inter', sans-serif" }} onClick={() => TxlemetryV2.navigate('/tickets')}>Learn more</span>
                </div>
              </div>
              {/* Integrations */}
              <div className="flex-1 flex flex-col gap-4">
                <div className="bg-[#e7e6df] rounded-[10px] overflow-hidden" style={{ aspectRatio: '564/388' }}>
                  <img loading="lazy" decoding="async" alt="" className="w-full h-full object-cover" src={imgUsabIntegration} />
                </div>
                <div className="max-w-[390px]">
                  <p className="font-semibold text-[16.5px] text-[#17100e] tracking-[-0.18px] leading-[22px] mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Integrate with your existing stack</p>
                  <p className="text-[14.5px] leading-[22px] m-0" style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(23,16,14,0.6)' }}>Connect tools like Slack, Jira, your warehouse and internal systems so product context travels with the work instead of fragmenting it.</p>
                  <span className="mt-3 font-semibold text-[15px] text-[#17100e] cursor-pointer inline-block border-b border-[#17100e]" style={{ fontFamily: "'Inter', sans-serif" }} onClick={() => TxlemetryV2.navigate('/integrations')}>Learn more</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ Section 4 — Outbound ═══════ */}
        <div className="w-full" style={{ background: '#f4f3ec' }}>
          <div className="max-w-[1160px] mx-auto px-6 py-[96px]">
            {/* Header */}
            <div className="flex flex-col gap-6 mb-8">
              <div>
                <p className="font-semibold text-black leading-[76px] tracking-[-4px] m-0" style={{ fontFamily: "'Inter', sans-serif", fontSize: '73px' }}>Shared data infrastructure</p>
                <p className="font-semibold text-black leading-[76px] tracking-[-4px] m-0" style={{ fontFamily: "'Inter', sans-serif", fontSize: '73px', paddingLeft: '122px' }}>that strengthens every workflow</p>
              </div>
              <div className="max-w-[480px]">
                <p className="text-[16.5px] leading-[24px] m-0" style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(23,16,14,0.8)' }}>Bring events, warehouse sources and downstream destinations into one system so insight, rollout and automation all work from the same source of truth.</p>
                <span className="mt-4 font-semibold text-[15px] text-black cursor-pointer inline-block border-b border-black" style={{ fontFamily: "'Inter', sans-serif" }} onClick={() => TxlemetryV2.navigate('#')}>Learn more</span>
              </div>
            </div>

            {/* Satellite illustration */}
            <div className="rounded-[6px] overflow-hidden mb-12" style={{ aspectRatio: '1160/396' }}>
              <img loading="lazy" decoding="async" alt="" className="w-full h-full object-cover" src={imgOutbSatellite} />
            </div>

            {/* Product UI */}
            <div className="bg-[#e7e6df] rounded-[10px] overflow-hidden mb-6" style={{ aspectRatio: '1160/490' }}>
              <img loading="lazy" decoding="async" alt="" className="w-full h-full object-cover" src={imgOutbProduct} />
            </div>

            {/* 3-column features */}
            <div className="flex gap-0 justify-between mb-12">
              {[
                { title: 'Connect incoming sources', desc: 'Ingest product, lifecycle and business data from the systems your teams already rely on.' },
                { title: 'Transform once, use everywhere', desc: 'Shape events centrally so analytics, dashboards and rollouts all reference the same definitions.' },
                { title: 'Activate the rest of your stack', desc: 'Route the right signals outward when teams need to automate reporting, operations or growth workflows.' },
              ].map((feat) => (
                <div key={feat.title} className="flex flex-col max-w-[370px]">
                  <p className="font-semibold text-[16.5px] text-[#17100e] tracking-[-0.18px] leading-[22px] mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>{feat.title}</p>
                  <p className="text-[14.5px] leading-[22px] m-0" style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(23,16,14,0.6)' }}>{feat.desc}</p>
                </div>
              ))}
            </div>

            {/* G2 Rankings */}
            <div className="border border-[rgba(23,16,14,0.2)] rounded-[6px] p-[49px]">
              <div className="flex justify-between items-start">
                {/* Left: title + description + link */}
                <div className="w-[300px] flex flex-col justify-between self-stretch">
                  <p className="font-semibold text-[17px] text-black tracking-[-0.18px] leading-[22px] m-0" style={{ fontFamily: "'Inter', sans-serif" }}>Built to replace fragmented product stacks</p>
                  <div>
                    <p className="text-[14.5px] leading-[22px] m-0 mb-4" style={{ fontFamily: "'Inter', sans-serif", color: 'black' }}>{`The goal is not one more analytics tool. It is one coherent system for understanding behavior, shipping changes and learning faster.`}</p>
                    <a className="flex items-center gap-1.5 font-semibold text-[15px] text-black no-underline border-b border-black pb-1 self-start" href="#" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Read the report
                      <img loading="lazy" decoding="async" alt="" className="w-2 h-2" src={imgOutbVector} />
                    </a>
                  </div>
                </div>
                {/* Right: circles */}
                <div className="flex gap-5">
                  {[
                    { value: '1', label: 'Txlemetry', opacity: 1, fontSize: '73px' },
                    { value: '4', label: 'Disconnected tools', opacity: 0.4, fontSize: '84px' },
                    { value: '0', label: 'Shared context', opacity: 0.4, fontSize: '84px' },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col items-center gap-5">
                      <div className="relative flex items-center justify-center rounded-full size-[190px]">
                        <div className="absolute inset-[2px] rounded-full bg-[#f4f3ec]" />
                        <span className="relative font-light text-center tracking-[-2.88px] leading-[84px]" style={{ fontFamily: "'Inter', sans-serif", fontSize: item.fontSize, color: item.opacity === 1 ? '#17100e' : 'rgba(23,16,14,0.4)' }}>{item.value}</span>
                      </div>
                      <span className={`text-[15px] text-black text-center tracking-[-0.16px]${item.label === 'Txlemetry' ? ' font-semibold' : ''}`} style={{ fontFamily: "'Inter', sans-serif" }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ Section 5 — Features (Interactive) ═══════ */}
        <div className="w-full" style={{ background: '#f4f3ec' }}>
          <div className="max-w-[1160px] mx-auto px-6 pt-[132px] pb-[96px]">
            <div className="grid grid-cols-[2fr_3fr] gap-16">
              {/* Left panel — feature image + description */}
              <div className="sticky top-[100px] self-start flex flex-col gap-4">
                <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: '1/1' }}>
                  {FEATURES.map((feat, i) => (
                    <div key={feat.name} className={`absolute inset-0 overflow-hidden transition-opacity${i === activeFeature ? '' : ' opacity-0'}`}>
                      <img loading="lazy" decoding="async" alt="" className="w-full h-full object-cover" src={feat.img} />
                    </div>
                  ))}
                </div>
                <p className="text-[16px] leading-[24px] m-0" style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(23,16,14,0.6)' }}>{FEATURES[activeFeature].desc}</p>
                <span className="font-semibold text-[15px] text-[#17100e] cursor-pointer inline-block border-b border-[#17100e] self-start tracking-[-0.16px]" style={{ fontFamily: "'Inter', sans-serif" }} onClick={() => TxlemetryV2.navigate(FEATURES[activeFeature].link)}>Find out more</span>
              </div>

              {/* Right panel — feature buttons */}
              <div className="flex flex-col">
                {FEATURES.map((feat, i) => {
                  const isActive = i === activeFeature;
                  return (
                    <div key={feat.name} className="flex items-center justify-between py-[14px] border-b cursor-pointer" style={{ borderColor: 'rgba(0,0,0,0.2)' }} onClick={() => setActiveFeature(i)}>
                      <span className="font-semibold text-[48px] leading-[49px] tracking-[-2.56px] transition-colors" style={{ fontFamily: "'Inter', sans-serif", color: isActive ? '#17100e' : 'rgba(0,0,0,0.2)' }}>{feat.name}</span>
                      <div className="pt-3">
                        <FeatureArrow active={isActive} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ Section 6 — CTA ═══════ */}
        <div className="relative w-full overflow-hidden" style={{ minHeight: '800px' }}>
          <div className="absolute inset-0">
            <img loading="lazy" decoding="async" alt="" className="w-full h-full object-cover" src={imgCtaBanner} />
          </div>
          <div className="relative flex flex-col items-center justify-center gap-6 py-[108px]" style={{ minHeight: '800px' }}>
            <div className="text-center">
              <p className="font-semibold text-white text-center leading-[80px] tracking-[-4px] m-0" style={{ fontFamily: "'Inter', sans-serif", fontSize: '74px' }}>Experience the next-gen</p>
              <p className="font-semibold text-white text-center leading-[80px] tracking-[-4px] m-0" style={{ fontFamily: "'Inter', sans-serif", fontSize: '74px' }}>platform today</p>
            </div>
            <div className="flex gap-3">
              <a data-spa href="/demo" className="border border-white rounded-[6px] px-[17px] py-[11px] text-white text-[15px] font-semibold tracking-[-0.4px] text-center no-underline" style={{ fontFamily: "'Inter', sans-serif", backdropFilter: 'blur(6px)', background: 'rgba(255,255,255,0.2)' }}>View demo</a>
              <a data-spa href="/signup" className="bg-white rounded-[6px] px-[16px] py-[10px] text-[#17100e] text-[15px] font-semibold tracking-[-0.4px] text-center no-underline" style={{ fontFamily: "'Inter', sans-serif" }}>Start free trial</a>
            </div>
          </div>
        </div>
      </PageShell>
    );
  }

  window.HowItWorksPage = HowItWorksPage;
})();
