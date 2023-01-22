/**
 * article controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::article.article', ({ strapi }) => ({
  async sync(ctx) {
    const { lastSync } = ctx.query;
    const entries = await strapi.db.query('api::article.article').findMany();

    ctx.body = entries;
  },
}));

/**
 *
 * {
      where: {
        updatedAt: { $gt: new Date(lastSync) },
      },
    }
 */
