import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

const homeImages = ["/brand/hero-art.jpg", "/og-image.jpg"];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    images?: string[];
  }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly", images: homeImages },
    { path: "/jovia-platform", priority: 0.9, changeFrequency: "monthly" },
    { path: "/jovia-app", priority: 0.8, changeFrequency: "monthly" },
    { path: "/how-to-register", priority: 0.9, changeFrequency: "monthly" },
    { path: "/signup", priority: 0.8, changeFrequency: "monthly" },
    { path: "/login", priority: 0.4, changeFrequency: "yearly" },
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    ...(route.images
      ? { images: route.images.map((image) => `${siteConfig.url}${image}`) }
      : {}),
  }));
}
