/**
 * route-waypoint controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::route-waypoint.route-waypoint', ({ strapi }) => ({
  async sync(ctx) {
    const datetime = new Date().toISOString();
    const routeWaypoints = await strapi.service('api::route-waypoint.route-waypoint').sync(ctx.query);
    ctx.send({
      changes: {
        routeWaypoints,
      },
      datetime,
    });
  },
}));
