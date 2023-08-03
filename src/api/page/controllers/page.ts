/**
 * page controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::page.page', ({ strapi }) => ({
  async sync(ctx) {
    const datetime = new Date().toISOString();
    const pages = await strapi.service('api::page.page').sync(ctx.query);
    ctx.send({
      changes: {
        pages,
      },
      datetime,
    });
  },
}));
