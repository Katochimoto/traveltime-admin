/**
 * article service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::article.article', ({ strapi }) => ({
  async sync({ lastSync, locale }) {
    const entries = await strapi.db.query('api::article.article').findMany({
      where: {
        locale: locale || 'en',
        ...(lastSync ? {
          updatedAt: { $gt: lastSync },
        } : undefined),
      },
      orderBy: { updatedAt: 'desc' },
      populate: ['logo'],
    });

    return {
      replaced: entries.filter((item) => !item.deleted).map((item) => ({
        id: item.uuid || item.id,
        country: item.country,
        locale: item.locale,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        publishedAt: item.publishedAt,
        title: item.title,
        intro: item.intro,
        description: item.description,
        logoImg: item.logo?.formats?.small?.url,
        coverImg: item.logo?.formats?.large?.url,
      })),
      deleted: entries.filter((item) => item.deleted).map((item) => item.uuid || item.id),
    };
  },
}));
