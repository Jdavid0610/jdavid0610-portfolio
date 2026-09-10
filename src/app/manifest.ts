import type { MetadataRoute } from "next";
import { siteConfig } from "@/shared/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.fullName} — Senior FullStack Developer`,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1b3a5c",
    icons: [{ src: "/avatar.jpg", sizes: "any", type: "image/jpg" }],
  };
}
