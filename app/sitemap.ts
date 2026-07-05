import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://betsconverter.com";

  const routes = [
    "",
    "/tools/booking-code-converter",
    "/tools/manual-slip-converter",
    "/tools/odds-converter",
    "/tools/implied-probability",
    "/tools/profit-calculator",
    "/tools/accumulator-calculator",
    "/tools/cashout-calculator",
    "/tools/arbitrage-calculator",
    "/ai-assistant",
    "/glossary",
    "/blog",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/responsible-gambling",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}