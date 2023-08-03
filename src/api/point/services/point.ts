/**
 * point service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::point.point', ({ strapi }) => ({
  async sync({ lastSync, locale }) {
    const entries = await strapi.db.query('api::point.point').findMany({
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
      replaced: entries.filter((item) => item.publishedAt !== null).map((item) => ({
        id: String(item.uuid || item.id),
        locale: item.locale,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        publishedAt: item.publishedAt,
        title: item.title,
        intro: item.intro,
        description: item.description,
        category: item.category,
        lat: item.lat,
        lng: item.lng,
        address: item.address,
        web: item.web,
        logoImg: item.logo?.formats?.small?.url ?? null,
        coverImg: item.logo?.formats?.large?.url ?? null,
      })),
      deleted: entries.filter((item) => item.publishedAt === null).map((item) => String(item.uuid || item.id)),
    };
  },
}));
