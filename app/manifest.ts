import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `Jovia — ${siteConfig.tagline}`,
    short_name: "Jovia",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#05040a",
    theme_color: "#05040a",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
