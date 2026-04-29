export type UniverseCategory = "BODY" | "MIND" | "SOUL";

export interface Brand {
  id: string;
  name: string;
  description: string;
  ctaText: "EXPERIENCE" | "EXPLORE" | "SHOP TO ELEV8";
  universeCategory: UniverseCategory;
  url: string;
  image: string;
  priority: number;
}

export const BRANDS: Brand[] = [

  // ── SOUL ──────────────────────────────────────────────────────────────────
  {
    id: "the-grand-designer",
    name: "THE GRAND DESIGNER",
    description: "#1 MENTALPHYSICAL WELLNESS EXPERIENCE IN THE YOUNIVERSE GUARANTEED TO REVEAL THE GREATNESS IN Y.O.U.",
    ctaText: "EXPERIENCE",
    universeCategory: "SOUL",
    url: "https://thegranddesigner.com",
    image: "/images/grand-designer.jpg",
    priority: 1, // S1
  },
  {
    id: "worlds-greatest-water",
    name: "THE WORLD'S GREATEST WATER. ELEV8 WATER",
    description: "#1 PREMIUM SELF-DEVELOPMENT AND WELLNESS ULTRA PURIFIED WATER BRAND PACKAGED IN BOTTLES.",
    ctaText: "EXPERIENCE",
    universeCategory: "SOUL",
    url: "https://theworldsgreatestwater.com",
    image: "/images/greatest-water.jpg",
    priority: 2, // S2
  },

  // ── MIND ──────────────────────────────────────────────────────────────────
  {
    id: "elev8-god-within",
    name: "ELEV8 GOD WITHIN GLOBAL MINISTRIES",
    description: "#1 SPIRITUAL AND PHYSICAL MENTAL WELLNESS MOVEMENT IN THE YOUNIVERSE.",
    ctaText: "EXPLORE",
    universeCategory: "MIND",
    url: "https://elev8godwithin.com",
    image: "/images/god-within.jpg",
    priority: 1, // M1
  },
  {
    id: "elev8-mentalversity",
    name: "ELEV8 MENTALVERSITY",
    description: "#1 SPIRITUALITY & SCIENCE EXPERIENCE CENTER IN THE YOUNIVERSE.",
    ctaText: "EXPLORE",
    universeCategory: "MIND",
    url: "https://elev8mentalversity.com",
    image: "/images/elev8-mentalversity.jpg",
    priority: 2, // M2
  },
  {
    id: "worlds-greatest-movie",
    name: "THE WORLDS GREATEST MOVIE ABOUT YOU",
    description: "#1 CINEMATIC EXPERIENCE OF MYSELF IN MY YOUNIVERSE.",
    ctaText: "EXPLORE",
    universeCategory: "MIND",
    url: "https://theworldsgreatestmovieaboutyou.com",
    image: "/images/worlds-greatest-movie.jpg",
    priority: 3, // M3
  },
  {
    id: "vybe-plus-you",
    name: "VYBE + YOU",
    description: "#1 CELEBRATION & EXPLORATION EXPERIENCE OF MYSELF IN MY YOUNIVERSE.",
    ctaText: "EXPLORE",
    universeCategory: "MIND",
    url: "https://vybeplusyou.com",
    image: "/images/vybe-plus-you.jpg",
    priority: 4, // M4
  },

  // ── BODY ──────────────────────────────────────────────────────────────────
  {
    id: "worlds-greatest-coin",
    name: "THE WORLD'S GREATEST COIN",
    description: "#1 BLOCK CHAIN & CRYPTO CURRENCY TRADING IN THE YOUNIVERSE.",
    ctaText: "SHOP TO ELEV8",
    universeCategory: "BODY",
    url: "https://theworldsgreatestcoin.com",
    image: "/images/greatest-coin.jpg",
    priority: 1, // B1
  },
  {
    id: "elev8-spiritual-alliance",
    name: "ELEV8 SPIRITUAL ALLIANCE",
    description: "GUARDIAN + FALLEN ANGEL'S",
    ctaText: "SHOP TO ELEV8",
    universeCategory: "BODY",
    url: "https://elev8spiritualalliance.com",
    image: "/images/spiritual-alliance.jpg",
    priority: 2, // B2
  },
  {
    id: "elev8-venture-capital",
    name: "ELEV8 VENTURE CAPITAL",
    description: "#1 WEALTH CREATION & PROGRESSIVE COLLABORATORS IN THE YOUNIVERSE.",
    ctaText: "SHOP TO ELEV8",
    universeCategory: "BODY",
    url: "https://elev8venturecapital.com",
    image: "/images/venture-capital.jpg",
    priority: 3, // B3
  },
  {
    id: "elev8-media",
    name: "ELEV8 MEDIA",
    description: "ENERGY IN MOTION + THE ILLUSION",
    ctaText: "SHOP TO ELEV8",
    universeCategory: "BODY",
    url: "https://elev8creations.com",
    image: "/images/elev8-creations.jpg",
    priority: 4, // B4
  },
  {
    id: "elev8-robotics",
    name: "ELEV8 ROBOTICS",
    description: "YOUBOTICS. EXPANDING THE POSSIBILITIES OF HUMAN AND TECHNOLOGY INTEGRATION.",
    ctaText: "SHOP TO ELEV8",
    universeCategory: "BODY",
    url: "https://youinrobotics.com",
    image: "/images/robotics.jpg",
    priority: 5, // B5
  },
  {
    id: "greatest-african-project",
    name: "THE GREATEST AFRICAN PROJECT. AFRICA RENEW",
    description: "#1 MENTALPHYSICAL & PROGRESSIVE MOVEMENT RESTRUCTURING THE AFRICAN CONTINENT.",
    ctaText: "SHOP TO ELEV8",
    universeCategory: "BODY",
    url: "https://thegreatestafricanproject.com",
    image: "/images/african-project.jpg",
    priority: 6, // B6
  },
  {
    id: "elev8-renewable-energy",
    name: "ELEV8 RENEWABLE ENERGY",
    description: "LIGHT OF THE YOUNIVERSE.",
    ctaText: "SHOP TO ELEV8",
    universeCategory: "BODY",
    url: "https://elev8renewenergy.com",
    image: "/images/renewable-energy.jpg",
    priority: 7, // B7
  },
  {
    id: "elev8-development",
    name: "ELEV8 DEVELOPMENT",
    description: "#1 CONSCIOUSNESS & GODLY LIFESTYLE BUILDING DEVELOPMENT PIONEER IN THE YOUNIVERSE.",
    ctaText: "SHOP TO ELEV8",
    universeCategory: "BODY",
    url: "https://elev8development.com",
    image: "/images/elev8-development.jpg",
    priority: 8, // B8
  },
  {
    id: "elev8-automotion",
    name: "ELEV8 AUTO & AVIATION",
    description: "EVERYTHING MOVING. INNOVATIONS IN TERRESTRIAL AND AERIAL TRANSIT.",
    ctaText: "SHOP TO ELEV8",
    universeCategory: "BODY",
    url: "https://elev8automotion.com",
    image: "/images/automotion.jpg",
    priority: 9, // B9
  },
  {
    id: "elev8-eat-fresh",
    name: "ELEV8 EAT FRESH",
    description: "#1 ORGANIC & LOCALLY SOURCED FOOD GALLERIA IN THE YOUNIVERSE.",
    ctaText: "SHOP TO ELEV8",
    universeCategory: "BODY",
    url: "https://elev8eatfresh.com",
    image: "/images/eat-fresh.jpg",
    priority: 10, // B10
  },
  {
    id: "elev8-godly-living",
    name: "ELEV8 LUX GODLY LIVING",
    description: "#1 PREMIUM CURATED EXPERIENCE DOYEN FOR EXCLUSIVE MANSIONS | ELITE PRIVATE ISLANDS | BESPOKE PRIVATE JETS | RARE EXOTIC CARS",
    ctaText: "SHOP TO ELEV8",
    universeCategory: "BODY",
    url: "https://elev8godlyliving.com",
    image: "/images/godly-living.jpg",
    priority: 11, // B11
  },
  {
    id: "worlds-greatest-music",
    name: "THE WORLD'S GREATEST MUSIC WORLDWIDE",
    description: "#1 SELF DEVELOPMENT & MENTAL WELLNESS SOUND & FREQUENCY CREATORS IN THE YOUNIVERSE.",
    ctaText: "SHOP TO ELEV8",
    universeCategory: "BODY",
    url: "https://theworldsgreatestmusicworldwide.com",
    image: "/images/worlds-greatest-music.jpg",
    priority: 12, // B12
  },
  {
    id: "ielev8my",
    name: "IELEV8MY LUX APPAREL",
    description: "#1 NEW MONEY FASHION CREATORS IN THE YOUNIVERSE.",
    ctaText: "SHOP TO ELEV8",
    universeCategory: "BODY",
    url: "https://ielev8my.com",
    image: "/images/ielev8my.jpg",
    priority: 13, // B13
  },
  {
    id: "plea",
    name: "PLEA",
    description: "GLOBAL RESOURCE SHARING.",
    ctaText: "SHOP TO ELEV8",
    universeCategory: "BODY",
    url: "https://ourplea.org",
    image: "/images/plea.jpg",
    priority: 14, // B14
  },
  {
    id: "thank-u-body",
    name: "THANK U BODY",
    description: "GRATITUDE TO THE HUMAN EXPERIENCE.\n#1 BODY WELLNESS BRAND IN THE YOUNIVERSE.",
    ctaText: "SHOP TO ELEV8",
    universeCategory: "BODY",
    url: "https://thankubody.com",
    image: "/images/thank-u-body.jpg",
    priority: 15, // B15
  },
];
