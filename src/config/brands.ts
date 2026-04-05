export type CreationCategory = 
  | "Spiritual & Experience"
  | "Commerce"
  | "Creative & Media"
  | "Innovation & Development";

export interface Brand {
  id: string;
  name: string;
  description: string;
  ctaText: "Explore" | "Shop";
  category: CreationCategory;
  url: string;
  image: string;
  featured: boolean;
}

export const BRANDS: Brand[] = [
  {
    id: "the-grand-designer",
    name: "THE GRAND DESIGNER",
    description: "Experience the ultimate spiritual journey of design and elevation.",
    ctaText: "Explore",
    category: "Spiritual & Experience",
    url: "https://thegranddesigner.com",
    image: "/images/grand-designer.jpg",
    featured: true,
  },
  {
    id: "elev8-spiritual-alliance",
    name: "ELEV8 SPIRITUAL ALLIANCE",
    description: "Uniting minds and spirits for a higher state of consciousness.",
    ctaText: "Explore",
    category: "Spiritual & Experience",
    url: "https://elev8spiritualalliance.com",
    image: "/images/spiritual-alliance.jpg",
    featured: true,
  },
  {
    id: "worlds-greatest-water",
    name: "THE WORLD’S GREATEST WATER",
    description: "Premium hydration designed to cleanse and elevate your body.",
    ctaText: "Shop",
    category: "Commerce",
    url: "https://worldsgreatestwater.com",
    image: "/images/greatest-water.jpg",
    featured: true,
  },
  {
    id: "ielev8my",
    name: "iELEV8MY",
    description: "Innovative tools and resources for personal and professional growth.",
    ctaText: "Explore",
    category: "Innovation & Development",
    url: "https://ielev8my.com",
    image: "/images/ielev8my.jpg",
    featured: true,
  },
  // Secondary Brands
  {
    id: "elev8-apparel",
    name: "ELEV8 Apparel",
    description: "High-end minimal clothing for everyday awareness.",
    ctaText: "Shop",
    category: "Commerce",
    url: "#",
    image: "/images/apparel.jpg",
    featured: false,
  },
  {
    id: "elev8-media",
    name: "ELEV8 Media Hub",
    description: "A centralized platform for transformative digital content.",
    ctaText: "Explore",
    category: "Creative & Media",
    url: "#",
    image: "/images/media.jpg",
    featured: false,
  },
  {
    id: "elev8-labs",
    name: "ELEV8 Innovation Labs",
    description: "Research and development for next-generation technology.",
    ctaText: "Explore",
    category: "Innovation & Development",
    url: "#",
    image: "/images/labs.jpg",
    featured: false,
  }
];
