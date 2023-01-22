/**
 * article controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::article.article', ({ strapi }) => ({
  async sync(ctx) {
    const { lastSync } = ctx.query;
    const entries = await strapi.db.query('api::article.article').findMany({
      where: {
        updatedAt: { $gt: new Date(lastSync) },
      },
    });

    ctx.body = entries;
  },
}));
