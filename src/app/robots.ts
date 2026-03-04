import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/login', '/registro'],
    },
    sitemap: 'https://onlyxhouse.com/sitemap.xml', // Replace with actual domain later
  };
}