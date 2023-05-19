/**
 * route-waypoint service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::route-waypoint.route-waypoint', ({ strapi }) => ({
  async sync({ lastSync, locale }) {
    const entries = await strapi.db.query('api::route-waypoint.route-waypoint').findMany({
      where: {
        locale: locale || 'en',
        publishedAt: { $notNull: true },
        ...(lastSync ? {
          updatedAt: { $gt: lastSync },
        } : undefined),
      },
      orderBy: { updatedAt: 'desc' },
      populate: ['route', 'point'],
    });

    return {
      replaced: entries.filter((item) => !item.deleted).map((item) => ({
        id: String(item.uuid || item.id),
        locale: item.locale,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        publishedAt: item.publishedAt,
        title: item.title,
        lat: item.lat,
        lng: item.lng,
        route: String(item.route?.uuid || item.route?.id),
        point: String(item.point?.uuid || item.point?.id || '') || null,
      })),
      deleted: entries.filter((item) => item.deleted).map((item) => String(item.uuid || item.id)),
    };
  },
}));
