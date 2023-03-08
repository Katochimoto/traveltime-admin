/**
 * event controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::event.event', ({ strapi }) => ({
  async sync(ctx) {
    const datetime = new Date().toISOString();
    const events = await strapi.service('api::event.event').sync(ctx.query);
    ctx.send({
      changes: {
        events,
      },
      datetime,
    });
  },
}));
