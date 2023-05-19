/**
 * route-leg controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::route-leg.route-leg', ({ strapi }) => ({
  async sync(ctx) {
    const datetime = new Date().toISOString();
    const routeLegs = await strapi.service('api::route-leg.route-leg').sync(ctx.query);
    ctx.send({
      changes: {
        routeLegs,
      },
      datetime,
    });
  },
}));
