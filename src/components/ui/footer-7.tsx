import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

interface Footer7Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSections = [
  {
    title: "Studio",
    links: [
      { name: "Portfolio", href: "/portfolio" },
      { name: "Services", href: "/services" },
      { name: "Partners", href: "/partners" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Projects",
    links: [
      { name: "Residential", href: "/portfolio" },
      { name: "Commercial", href: "/portfolio" },
      { name: "Cultural", href: "/portfolio" },
      { name: "Hospitality", href: "/portfolio" },
    ],
  },
  {
    title: "Info",
    links: [
      { name: "Istanbul", href: "/contact" },
      { name: "Milan", href: "/contact" },
      { name: "Est. 2009", href: "/contact" },
    ],
  },
];

const defaultSocialLinks = [
  { icon: <FaInstagram className="size-5" />, href: "#", label: "Instagram" },
  { icon: <FaLinkedin className="size-5" />, href: "#", label: "LinkedIn" },
  { icon: <FaFacebook className="size-5" />, href: "#", label: "Facebook" },
  { icon: <FaTwitter className="size-5" />, href: "#", label: "Twitter" },
];

const defaultLegalLinks = [
  { name: "Privacy Policy", href: "#" },
  { name: "Terms of Use", href: "#" },
];

export const Footer7 = ({
  logo = {
    url: "/",
    src: "/nav-logo.png",
    alt: "Metropolitan",
    title: "Metropolitan",
  },
  sections = defaultSections,
  description = "An editorial architecture studio in Istanbul and Milan. Material honesty, quiet permanence, site as protagonist.",
  socialLinks = defaultSocialLinks,
  copyright = "© 2024 Metropolitan Architects. All rights reserved.",
  legalLinks = defaultLegalLinks,
}: Footer7Props) => {
  return (
    <section className="py-32 bg-white border-t border-ink/10">
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            <div className="flex items-center gap-3 lg:justify-start">
              <a href={logo.url}>
                <img src={logo.src} alt={logo.alt} title={logo.title} className="h-8 w-auto" />
              </a>
            </div>
            <p className="max-w-[70%] text-sm text-ink/50 font-body leading-relaxed">
              {description}
            </p>
            <ul className="flex items-center space-x-6 text-ink/40">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="hover:text-ink transition-colors">
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-mono-label text-ink">{section.title}</h3>
                <ul className="space-y-3 text-sm text-ink/50">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="hover:text-ink transition-colors">
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-ink/10 py-8 text-xs font-mono-label text-ink/40 md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-ink transition-colors">
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
