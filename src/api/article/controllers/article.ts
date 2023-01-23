/**
 * article controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::article.article', ({ strapi }) => ({
  async sync(ctx) {
    const datetime = new Date().toISOString();
    const articles = await strapi.service('api::article.article').sync(ctx.query);
    ctx.send({
      changes: {
        articles,
      },
      datetime,
    });
  },
}));
