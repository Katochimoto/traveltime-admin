/**
 * page service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::page.page', ({ strapi }) => ({
  async sync({ lastSync, locale }) {
    const entries = await strapi.db.query('api::page.page').findMany({
      where: {
        locale: locale || 'en',
        ...(lastSync ? {
          updatedAt: { $gt: lastSync },
        } : undefined),
      },
      orderBy: { updatedAt: 'desc' },
    });

    return {
      replaced: entries.filter((item) => item.publishedAt !== null).map((item) => ({
        id: String(item.id),
        locale: item.locale,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        publishedAt: item.publishedAt,
        content: item.content,
        type: item.type,
      })),
      deleted: entries.filter((item) => item.publishedAt === null).map((item) => String(item.id)),
    };
  },
}));
