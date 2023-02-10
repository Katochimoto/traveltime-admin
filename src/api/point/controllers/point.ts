/**
 * point controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::point.point', ({ strapi }) => ({
  async sync(ctx) {
    const datetime = new Date().toISOString();
    const points = await strapi.service('api::point.point').sync(ctx.query);
    ctx.send({
      changes: {
        points,
      },
      datetime,
    });
  },
}));
