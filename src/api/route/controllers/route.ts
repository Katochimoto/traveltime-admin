/**
 * route controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::route.route', ({ strapi }) => ({
  async sync(ctx) {
    const datetime = new Date().toISOString();
    const routes = await strapi.service('api::route.route').sync(ctx.query);
    ctx.send({
      changes: {
        routes,
      },
      datetime,
    });
  },
}));
