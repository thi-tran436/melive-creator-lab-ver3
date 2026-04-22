/**
 * Site content configuration — edit here, not in components
 * All text content, URLs, dates, and copy live in this file.
 */

export const siteConfig = {
  name: "Melive Creator Lab NYC",
  tagline: "Get Signed. Get Funded. Scale to $100K GMV/mo.",
  description:
    "Apply to Melive Creator Lab NYC. A 6-month live commerce incubator for serious TikTok Shop creators. We invest $8–15K per creator in equipment, ad budget, and a dedicated growth team. Class of 2026 — applications close May 31.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://creatorlab.melive.co",
  email: {
    creator: "creators@melive.co",
    brands: "brands@melive.co",
  },
  social: {
    tiktok: "https://www.tiktok.com/@melive.co",
    instagram: "https://www.instagram.com/melive.co",
  },
  deadline: process.env.NEXT_PUBLIC_APPLICATION_DEADLINE ?? "2026-05-31T23:59:59-05:00",
  programDates: {
    deadline: "May 31, 2026",
    shortlistStart: "June 1",
    shortlistEnd: "June 10",
    announce: "June 15",
    start: "July 1",
  },
  cohort: {
    year: 2026,
    totalSelected: 20,
    targetHits100K: 10,
  },
};

export const heroContent = {
  eyebrow: "Class of 2026 — Applications Open",
  headline: {
    line1: "Get ",
    accent1: "signed.",
    line2: "Get funded.",
    line3: "Scale to ",
    accent2: "$100K GMV/mo",
    end: ".",
  },
  lede: "Melive Creator Lab NYC is a 6-month live commerce incubator for serious TikTok Shop creators. We invest equipment, samples, ad dollars, brand deals, and a dedicated growth team into 20 creators per cohort — so 10 of you scale past $100K/month. You bring the talent. We build the channel with you.",
  cta: {
    primary: "Apply for Class of 2026",
    secondary: "See what's included →",
  },
  socialProof: "Only 20 creators selected · Application closes May 31, 2026 · No cost to join",
};

export const marqueeItems = [
  "TIKTOK SHOP IS HERE",
  "●",
  "$100K/MO IS THE NEW NORMAL",
  "●",
  "WE BUILD CHANNELS, NOT POSTS",
  "●",
  "20 SIGNED · 10 SCALED",
  "●",
];

export const whyCards = [
  {
    num: "01",
    title: "We've done this at scale",
    body: "Melive is the US arm of The Metub Company — Vietnam's largest MCN with 300+ creators and $40M+ in group revenue (2024). Live commerce is what we do every day. You're not the experiment.",
  },
  {
    num: "02",
    title: "You keep your voice",
    body: "We don't rebrand you. We don't script you. We hand you the playbook, the gear, the samples, the ads, and a growth manager — then we get out of your way.",
  },
  {
    num: "03",
    title: "We put money in. Period.",
    body: "$8–15K of equipment, sample logistics, ad budget, and hands-on support per creator. No fees. No subscriptions. We earn only when you earn.",
  },
];

export const benefitCards = [
  {
    icon: "🎥",
    iconBgColor: "#FF2E63",
    iconTextColor: "#fff",
    title: "Studio-grade home setup",
    body: "Pro lighting kit, 4K camera, lav mic, ring & key lights, backdrop, teleprompter. Shipped to your door in week 1, plus a 1:1 install call so it actually looks broadcast-ready.",
    value: "$3,500–5,000 value · yours to keep",
  },
  {
    icon: "📦",
    iconBgColor: "#08D9D6",
    iconTextColor: "#0F0F12",
    title: "Sample sourcing & logistics",
    body: "Samples from our anchor brand partners arrive 5–7 days before each live. Unboxing, testing, reviewing — we handle the procurement, returns, and tracking. You make the content.",
    value: "$2,000+/month sample flow",
  },
  {
    icon: "👤",
    iconBgColor: "#FFD369",
    iconTextColor: "#0F0F12",
    title: "Dedicated growth manager",
    body: "One person. Your person. Reviews your weekly metrics, fixes your funnel, books your brand deals, and is reachable when you need them. They've run live commerce channels before.",
    value: "Full-time resource per creator",
  },
  {
    icon: "📈",
    iconBgColor: "#7B2FF7",
    iconTextColor: "#fff",
    title: "Channel optimization",
    body: "Bio + link-tree audit, content calendar lock, thumbnail A/B testing, hook formula library, cadence planning, algorithm signal tuning. We treat your channel like a product.",
    value: "Weekly 1:1 + dashboard",
  },
  {
    icon: "💰",
    iconBgColor: "#FF2E63",
    iconTextColor: "#fff",
    title: "Ad sponsorship",
    body: "TikTok Ads Manager + GMV Max budget on us. Our performance team scales your top videos & lives. Paid amplification without paying — you only see the results in your GMV.",
    value: "$1,500+/month/creator",
  },
  {
    icon: "🤝",
    iconBgColor: "#08D9D6",
    iconTextColor: "#0F0F12",
    title: "Brand deal pipeline",
    body: "Direct access to our anchor brand roster — beauty, personal care, home appliances. Paid partnerships, commission deals, exclusive product launches reserved for the cohort.",
    value: "3–5 deals/mo by month 4",
  },
  {
    icon: "🎓",
    iconBgColor: "#FFD369",
    iconTextColor: "#0F0F12",
    title: "Live & ecom training",
    body: "2-day virtual bootcamp + weekly live workshops. Hook scripts, conversion frameworks, objection handling, mega-live planning, order-pulling content. Plus a private resource library.",
    value: "Curriculum + on-demand library",
  },
  {
    icon: "📡",
    iconBgColor: "#7B2FF7",
    iconTextColor: "#fff",
    title: "Tech stack & analytics",
    body: "Streaming software, multi-cam switching plugin, comment overlays, real-time GMV dashboard, repeat-buyer tracking. The same stack our top performers use — preconfigured for you.",
    value: "Software + setup included",
  },
  {
    icon: "⭐",
    iconBgColor: "#fff",
    iconTextColor: "#FF2E63",
    title: "Aligned partnership",
    body: "Melive earns 20% of your TikTok Shop affiliate commissions for 24 months. You keep 80%. Zero upfront cost. We win only when you win.",
    value: "Aligned, not extractive",
    highlight: true,
  },
];

export const roadmapMonths = [
  {
    tag: "MONTH 1 · ACTIVATE",
    title: "Home studio install + channel reset",
    actions: [
      "Equipment ships day 3; live 1:1 install call (lighting, audio, camera angle)",
      "2-day virtual bootcamp: TikTok Shop algorithm, live commerce 101, conversion frameworks",
      "Channel audit: bio rewrite, link-tree, pinned video swap, niche positioning lock",
      "Baseline GMV + view-through-rate captured for benchmark",
      "First 4 short-form videos shipped under new format",
    ],
    metric: [{ label: "Goal: 1 test live" }, { label: "Baseline GMV captured" }],
    milestone: false,
  },
  {
    tag: "MONTH 2 · DISCOVER",
    title: "Format sprint — find your winning hook",
    actions: [
      "Test 4 live formats (try-on / Get Ready With Me / demo+Q&A / mini-haul) — 1 per week, 60 min each",
      "Ship 12 short-form videos; identify top 2 hook formulas via watch-time data",
      "Sample-of-the-week starts: 1 anchor product reviewed live + 3 short-form supports",
      "First weekly metrics dashboard delivered (CTR, AVT, AOV, conversion)",
    ],
    metric: [{ label: "Cadence: 4 lives/mo" }, { label: "$10K GMV target" }],
    milestone: false,
  },
  {
    tag: "MONTH 3 · LOCK CADENCE",
    title: "3 lives/week + first co-hosted brand live",
    actions: [
      "Lock weekly schedule: 3 lives × 75 min each (2 solo + 1 co-hosted with anchor brand)",
      "Conversion script library complete: 8 hook scripts, 12 objection-handling responses",
      "SOPs locked: pre-live checklist, run-of-show template, post-live recap to growth manager",
      "Funnel built: live → bio → product collection → repeat-buyer SMS via TikTok Shop CRM",
    ],
    metric: [{ label: "Cadence: 12 lives/mo" }, { label: "$30K GMV target" }],
    milestone: false,
  },
  {
    tag: "MONTH 4 · AMPLIFY",
    title: "Paid media turn-on + thumbnail engine",
    actions: [
      "Top 5 organic videos boosted via TikTok Ads ($300–500 each, ROAS-tracked)",
      "GMV Max enabled on top 3 product SKUs; daily ad-spend pacing review",
      "Live retargeting setup: viewers who watched 30s+ get a 24-hour ad reminder",
      "Weekly thumbnail A/B test (2 variants per live), daily caption A/B test",
    ],
    metric: [{ label: "3 active ad sets" }, { label: "$55K GMV target" }],
    milestone: false,
  },
  {
    tag: "MONTH 5 · SCALE",
    title: "Multi-brand portfolio + monthly mega live",
    actions: [
      "Add 2 secondary brand partnerships (3 active brand SKUs in rotation)",
      "One mega live per month (3+ hours, 8+ products, multi-creator collab option)",
      "Repeat-buyer flow live: SMS + email re-engagement post-purchase",
      "Cross-creator collab live with 1 cohort peer (audience exchange)",
    ],
    metric: [{ label: "5+ active SKUs" }, { label: "$80K GMV target" }],
    milestone: false,
  },
  {
    tag: "MONTH 6 · GRADUATE",
    title: "$100K/mo locked + cohort mentor track",
    actions: [
      "Sustained 4+ lives/week; one mega live every 3 weeks",
      "5+ active brand deals at any moment; 30%+ repeat-buyer rate",
      "Ad spend self-funding via commissions (positive ROAS at scale)",
      "Eligible to mentor next cohort creators + earn additional rev share",
    ],
    metric: [{ label: "4+ lives/wk locked" }, { label: "$100K+ GMV achieved" }],
    milestone: true,
  },
];

export const requirementItems = [
  "<strong>50K+ followers</strong> on TikTok, Instagram, or YouTube (TikTok primary preferred)",
  "<strong>Based in the US</strong> with a stable home setup (room + power + good Wi-Fi). Any city.",
  "<strong>Authentic voice</strong> in beauty, skincare, personal care, home appliances, wellness, or lifestyle",
  "<strong>Full-time or transitioning full-time</strong> — minimum 20 hrs/week commitment to the program",
  "<strong>Coachable & data-curious</strong> — you want to learn the playbook, not just freestyle",
  "<strong>Open to a 24-month live commerce partnership</strong> with Melive (you keep ownership of channel + content)",
];

export const faqItems = [
  {
    q: "Is this really free? What's the catch?",
    a: "Yes, free. Zero upfront cost, zero monthly fee. Melive earns 20% of your TikTok Shop affiliate commissions for 24 months. You keep 80%. We only earn if you earn. If your commissions are $0, our cut is $0.",
  },
  {
    q: "Why 20 creators if you say only 10 will hit $100K?",
    a: "Live commerce is part talent, part product-fit, part timing. Even with great support, not every creator-format combination clicks in 6 months. By signing 20, we over-invest in the cohort so the top 10 reliably scale past $100K — and the bottom 10 still graduate with a working channel, real revenue, and the playbook.",
  },
  {
    q: "Do I need a studio? Will I have to come to NYC every week?",
    a: "No studio needed. We help you build a studio-grade setup at home — equipment ships to you, our producer does a 1:1 install call to dial in lighting, sound, and camera angles. The whole program runs remote: weekly 1:1s, virtual bootcamp, online workshops. Optional NYC meetups for the cohort 2x during the program (travel reimbursed for shortlisted participants).",
  },
  {
    q: "Do I give up ownership of my channel or content?",
    a: "Never. Your channel is yours. Your content is yours. Your followers are yours. We don't touch ownership. We're a partner, not an acquirer.",
  },
  {
    q: "Can I still do brand deals outside Melive?",
    a: "For non-TikTok Shop content (Instagram posts, YouTube videos, sponsored brand content outside live commerce) — yes, 100% your call. For TikTok Shop live commerce specifically, you partner with us exclusively during the 24 months. We'll bring you deals you couldn't source independently.",
  },
  {
    q: "What if I don't hit $100K GMV by month 6?",
    a: "$100K is the goal — and based on our programs across Southeast Asia cohorts, about half hit it inside 6 months. If you're tracking well at month 6 but not yet there, we extend support 3 months at no cost. If it's clearly not working, we part ways with no financial hooks — you keep all the equipment, the playbook, and any earned commissions.",
  },
  {
    q: "Who's behind Melive?",
    a: "Melive is the US live commerce arm of The Metub Company — Vietnam's largest MCN with 300+ creators and $40M+ in group revenue. We've been running creator-led live commerce in Southeast Asia since 2021 and are bringing that operating playbook to US TikTok Shop creators first.",
  },
  {
    q: "When do applications close?",
    a: "May 31, 2026. Shortlist interviews: June 1–10. Final 20 announced: June 15. Class of 2026 starts July 1. We review applications on a rolling basis — earlier is better.",
  },
];

export const mosaicCategories = [
  { icon: "💄", label: "Beauty & Makeup" },
  { icon: "🏠", label: "Home & Living" },
  { icon: "💪", label: "Wellness" },
  { icon: "👗", label: "Fashion" },
];

export const footerLinks = {
  program: [
    { label: "What You Get", href: "#benefits" },
    { label: "Roadmap", href: "#roadmap" },
    { label: "Requirements", href: "#requirements" },
    { label: "Apply", href: "#apply" },
  ],
  company: [
    { label: "About Metub", href: "https://metub.net", external: true },
    { label: "For Brands", href: "/brands" },
    { label: "Press", href: "/press" },
    { label: "Careers", href: "/careers" },
  ],
  contact: [
    { label: "creators@melive.co", href: "mailto:creators@melive.co" },
    { label: "brands@melive.co", href: "mailto:brands@melive.co" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};
