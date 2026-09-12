import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

const homeImages = [
  "/brand/hero-art.jpg",
  "/brand/carousel/welcome.jpg",
  "/brand/carousel/watch-earn.jpg",
  "/brand/carousel/play-earn.jpg",
  "/brand/carousel/friday-bonus.jpg",
  "/brand/carousel/why-choose-us.jpg",
  "/og-image.jpg",
];

// lastModified is a real date, not build time: this route is statically
// generated, so `new Date()` here would freeze at whatever moment the last
// build happened and silently go stale on the next unrelated deploy —
// Google treats a lastmod that never reflects genuine content changes as
// untrustworthy and starts ignoring it. Bump a route's date only when its
// actual page content changes.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    lastModified: string;
    images?: string[];
  }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly", lastModified: "2026-09-12", images: homeImages },
    { path: "/jovia-platform", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-09-12" },
    { path: "/jovia-app", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-09-12" },
    { path: "/how-to-register", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-09-12" },
    { path: "/signup", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-09-12" },
    { path: "/login", priority: 0.4, changeFrequency: "yearly", lastModified: "2026-09-12" },
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    ...(route.images
      ? { images: route.images.map((image) => `${siteConfig.url}${image}`) }
      : {}),
  }));
}
