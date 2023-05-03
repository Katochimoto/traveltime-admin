/**
 * route service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::route.route', ({ strapi }) => ({
  async sync({ lastSync, locale }) {
    const entries = await strapi.db.query('api::route.route').findMany({
      where: {
        locale: locale || 'en',
        publishedAt: { $notNull: true },
        ...(lastSync ? {
          updatedAt: { $gt: lastSync },
        } : undefined),
      },
      orderBy: { updatedAt: 'desc' },
      populate: ['logo'],
    });

    return {
      replaced: entries.filter((item) => !item.deleted).map((item) => ({
        id: String(item.uuid || item.id),
        locale: item.locale,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        publishedAt: item.publishedAt,
        title: item.title,
        intro: item.intro,
        description: item.description,
        data: item.data,
        logoImg: item.logo?.formats?.small?.url,
        coverImg: item.logo?.formats?.large?.url,
      })),
      deleted: entries.filter((item) => item.deleted).map((item) => String(item.uuid || item.id)),
    };
  },
}));
