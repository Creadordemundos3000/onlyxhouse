import { MetadataRoute } from 'next';
import { modelService, Model } from '@/services/modelService';

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // TODO: Replace with actual domain from environment variable
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://onlyxhouse.com';

  // Static routes
  const staticRoutes = [
    '',
    '/login',
    '/registro',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }));

  // Dynamic routes (Models)
  let models: Model[] = [];
  try {
    models = await modelService.getAll();
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }

  const modelRoutes = models.map((model) => {
    let lastModified = new Date();
    
    // Handle Firestore Timestamp
    if (model.updatedAt && typeof model.updatedAt.toDate === 'function') {
      lastModified = model.updatedAt.toDate();
    } else if (model.createdAt && typeof model.createdAt.toDate === 'function') {
      lastModified = model.createdAt.toDate();
    }

    return {
      url: `${baseUrl}/modelos/${model.id}`,
      lastModified,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    };
  });

  return [...staticRoutes, ...modelRoutes];
}
