/**
 * article controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::article.article', ({ strapi }) => ({
  async sync(ctx) {
    const { lastSync, locale } = ctx.query;
    const entries = await strapi.db.query('api::article.article').findMany({
      where: {
        locale: locale || 'en',
        updatedAt: { $gt: lastSync },
      },
      orderBy: { updatedAt: 'desc' },
      populate: ['logo'],
    });

    const sanitizedEntries = await this.sanitizeOutput(entries, ctx);
    return this.transformResponse(sanitizedEntries);
  },
}));
