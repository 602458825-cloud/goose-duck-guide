import type { MetadataRoute } from 'next';
import { guides, maps, roles } from '@/lib/data';

const baseUrl = 'https://goose-duck-guide.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const roleRoutes = roles.map((role) => ({
    url: `${baseUrl}/roles/${role.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const guideRoutes = guides.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const mapRoutes = maps.map((map) => ({
    url: `${baseUrl}/maps/${map.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      changeFrequency: 'daily',
      priority: 1,
    },
    ...roleRoutes,
    ...guideRoutes,
    ...mapRoutes,
  ];
}
