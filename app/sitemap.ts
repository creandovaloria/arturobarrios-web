import type { MetadataRoute } from 'next';
import { SITE_URL } from '@lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/routes/privacy`,
      lastModified: new Date('2026-07-21'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/routes/terms`,
      lastModified: new Date('2026-07-21'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/routes/data-deletion`,
      lastModified: new Date('2026-07-21'),
      changeFrequency: 'monthly',
      priority: 0.2,
    },
  ];
}
