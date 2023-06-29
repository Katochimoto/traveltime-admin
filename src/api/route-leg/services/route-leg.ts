/**
 * route-leg service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::route-leg.route-leg', ({ strapi }) => ({
  async sync({ lastSync, locale }) {
    const entries = await strapi.db.query('api::route-leg.route-leg').findMany({
      where: {
        ...(lastSync ? {
          updatedAt: { $gt: lastSync },
        } : undefined),
      },
      orderBy: { updatedAt: 'desc' },
      populate: ['route', 'from_waypoint', 'to_waypoint'],
    });

    return {
      replaced: entries.filter((item) => item.publishedAt !== null).map((item) => ({
        id: String(item.uuid || item.id),
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        publishedAt: item.publishedAt,
        path: item.path,
        route: String(item.route?.uuid || item.route?.id),
        fromWaypoint: String(item.from_waypoint?.uuid || item.from_waypoint?.id),
        toWaypoint: String(item.to_waypoint?.uuid || item.to_waypoint?.id),
      })),
      deleted: entries.filter((item) => item.publishedAt === null).map((item) => String(item.uuid || item.id)),
    };
  },
}));
