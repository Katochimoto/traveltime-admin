/**
 * article service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::article.article', ({ strapi }) => ({
  async sync({ lastSync, locale }) {
    const entries = await strapi.db.query('api::article.article').findMany({
      where: {
        locale: locale || 'en',
        updatedAt: { $gt: lastSync },
      },
      orderBy: { updatedAt: 'desc' },
      populate: ['logo'],
    });

    return {
      replaced: entries.filter((item) => !item.deleted).map((item) => ({
        id: item.id,
        country: item.country,
        locale: item.locale,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        publishedAt: item.publishedAt,
        title: item.title,
        description: item.description,
        logo: item.logo?.formats?.large?.url,
      })),
      deleted: entries.filter((item) => item.deleted).map((item) => item.id),
    };
  },
}));
