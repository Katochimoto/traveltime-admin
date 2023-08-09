/**
 * event service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::event.event', ({ strapi }) => ({
  async sync({ lastSync, locale }) {
    const entries = await strapi.db.query('api::event.event').findMany({
      where: {
        locale: locale || 'en',
        ...(lastSync ? {
          updatedAt: { $gt: lastSync },
        } : undefined),
      },
      orderBy: { updatedAt: 'desc' },
      populate: ['logo', 'points'],
    });

    return {
      replaced: entries.filter((item) => item.publishedAt !== null).map((item) => ({
        id: String(item.uuid || item.id),
        country: item.country,
        locale: item.locale,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        publishedAt: item.publishedAt,
        title: item.title,
        intro: item.intro,
        description: item.description,
        rrule: item.rrule,
        duration: item.duration,
        category: item.category,
        dtstart: item.dtstart,
        dtend: item.dtend,
        web: item.web,
        moveMondayIfWeekend: !!item.moveMondayIfWeekend,
        points: item.points.map((point) => String(point.uuid || point.id)),
        logoImg: item.logo?.formats?.small?.url ?? null,
        coverImg: item.logo?.formats?.large?.url ?? null,
      })),
      deleted: entries.filter((item) => item.publishedAt === null).map((item) => String(item.uuid || item.id)),
    };
  },
}));
