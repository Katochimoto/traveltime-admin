/**
 * article controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::article.article', ({ strapi }) => ({
  async sync(ctx) {
    const { lastSync, locale } = ctx.query;
    const articles = await strapi.service('api::article.article').sync({ lastSync, locale });
    ctx.send({
      changes: {
        articles,
      },
      datetime: new Date().toISOString(),
    });
  },
}));
