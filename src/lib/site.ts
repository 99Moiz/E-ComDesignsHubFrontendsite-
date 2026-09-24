import {
  Globe,
  Palette,
  PenTool,
  Film,
  Search,
  Megaphone,
  Code,
  Zap,
  Shield,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

export const SITE = {
  name: "E-ComDesignsHub",
  email: "support@ecomdesignshub.com",
  // Inbox that actually receives mail from the site's mailto links
  inbox: "ecommercedesignshub@gmail.com",
  address: "98 E Branch RD, Allentown, New Jersey 08501, USA",
  instagram: "https://www.instagram.com/ecom_design_hub?igsh=MXI0Y3NwbnM0NzFzbw==",
  facebook: "https://www.facebook.com/share/1DVHQF1u71/",
  // WhatsApp needs the international format: country code + number, no + or leading 0
  whatsapp: "923020230467",
};

export const FURSONA = {
  name: "Fursona Designs Hub",
  short: "Fursona",
  url: "http://fursonadesignshub.com",
};

export interface Service {
  slug: string;
  icon: LucideIcon;
  title: string;
  summary: string;
  description: string;
  features: string[];
}

export const services: Service[] = [
  {
    slug: "web-development",
    icon: Globe,
    title: "Web Development",
    summary: "Fast, responsive websites and web apps.",
    description:
      "Custom-built responsive websites and web applications using modern frameworks. From corporate sites to complex platforms, we deliver scalable, performant solutions.",
    features: ["React & Next.js", "Custom CMS", "E-Commerce", "Progressive Web Apps"],
  },
  {
    slug: "ui-ux-design",
    icon: Palette,
    title: "UI/UX Design",
    summary: "Interfaces that are clear and easy to use.",
    description:
      "Human-centered design that balances beauty with usability. We craft intuitive interfaces that delight users and drive conversions.",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
  },
  {
    slug: "graphic-design",
    icon: PenTool,
    title: "Graphic Design",
    summary: "Logos, brand identity and marketing visuals.",
    description:
      "Creative visual solutions that strengthen brand identity and communication. From logos to full-scale marketing materials, we craft designs that are strategic, consistent, and visually impactful.",
    features: ["Logo Design", "Brand Identity", "Banners & Social Creatives", "Print & Marketing"],
  },
  {
    slug: "animation",
    icon: Film,
    title: "2D & 3D Animation",
    summary: "Explainers, product renders and motion graphics.",
    description:
      "High-quality motion visuals that bring ideas to life. We create engaging 2D and 3D animations for marketing, explainer videos, product showcases, and digital campaigns.",
    features: ["2D Explainer Videos", "3D Modeling & Rendering", "Product Animation", "Motion Graphics"],
  },
  {
    slug: "seo",
    icon: Search,
    title: "SEO Optimization",
    summary: "Better rankings and qualified organic traffic.",
    description:
      "Data-driven SEO strategies that improve your search rankings and drive qualified organic traffic to grow your business.",
    features: ["Technical SEO", "Content Strategy", "Link Building", "Analytics"],
  },
  {
    slug: "digital-marketing",
    icon: Megaphone,
    title: "Digital Marketing",
    summary: "Campaigns across social, search and email.",
    description:
      "Comprehensive digital marketing campaigns across multiple channels to increase brand awareness and generate leads.",
    features: ["Social Media", "PPC Campaigns", "Email Marketing", "Content Marketing"],
  },
  {
    slug: "custom-software",
    icon: Code,
    title: "Custom Software",
    summary: "Software built around your workflows.",
    description:
      "Bespoke software solutions tailored to your unique workflows, integrations, and business requirements.",
    features: ["API Development", "Automation", "Integrations", "Cloud Solutions"],
  },
  {
    slug: "performance",
    icon: Zap,
    title: "Performance",
    summary: "Speed, reliability and scalability tuning.",
    description:
      "Optimize your digital assets for speed, reliability, and scalability to deliver the best possible user experience.",
    features: ["Speed Optimization", "CDN Setup", "Caching", "Monitoring"],
  },
  {
    slug: "cyber-security",
    icon: Shield,
    title: "Cyber Security",
    summary: "Audits, hardening and compliance.",
    description:
      "Protect your digital assets with robust security measures, audits, and best practices implementation.",
    features: ["Security Audits", "SSL/TLS", "Penetration Testing", "Compliance"],
  },
  {
    slug: "analytics",
    icon: BarChart3,
    title: "Analytics & Insights",
    summary: "Dashboards and reporting you can act on.",
    description:
      "Turn data into actionable insights with comprehensive analytics setup, dashboards, and reporting.",
    features: ["Google Analytics", "Custom Dashboards", "A/B Testing", "ROI Tracking"],
  },
];

/** Services grouped into four practice areas, used by the mega menu and the home page. */
export const serviceGroups = [
  {
    key: "build",
    title: "Web & E-commerce",
    blurb: "Fast, secure websites and online stores that are easy to manage and built to convert.",
    slugs: ["web-development", "performance"],
  },
  {
    key: "design",
    title: "Design & Branding",
    blurb: "Interfaces, identities and motion that make your brand clear and memorable.",
    slugs: ["ui-ux-design", "graphic-design", "animation"],
  },
  {
    key: "grow",
    title: "Growth Marketing",
    blurb: "Search, social and analytics working together to bring in qualified customers.",
    slugs: ["seo", "digital-marketing", "analytics"],
  },
  {
    key: "software",
    title: "Software & Security",
    blurb: "Custom platforms, integrations and security reviews for the systems your business runs on.",
    slugs: ["custom-software", "cyber-security"],
  },
].map((g) => ({ ...g, items: g.slugs.map((slug) => services.find((s) => s.slug === slug)!) }));

export const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Blog", path: "/blog" },
  { name: "Careers", path: "/careers" },
  { name: "Contact", path: "/contact" },
];
