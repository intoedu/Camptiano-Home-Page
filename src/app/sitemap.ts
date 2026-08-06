import type { MetadataRoute } from "next";
import { locales } from "@/i18n";
import { navigation, site } from "@/lib/site";
import { newsPosts } from "@/content/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...navigation.map((item) => item.href), "/support"];

  const pages = locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${site.url}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
  );

  const posts = locales.flatMap((locale) =>
    newsPosts.map((post) => ({
      url: `${site.url}/${locale}/news/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  );

  return [...pages, ...posts];
}
