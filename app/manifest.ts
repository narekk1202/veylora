import { SITE_DESCRIPTION, SITE_NAME } from "@/shared/constants/seo.consts";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#171717",
    theme_color: "#171717",
  };
}
