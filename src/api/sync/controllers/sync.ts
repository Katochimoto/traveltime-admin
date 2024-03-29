export default {
  async sync(ctx) {
    const datetime = new Date().toISOString();
    const [pages, articles, points, events, routes, routeLegs, routeWaypoints] = await Promise.all([
      strapi.service('api::page.page').sync(ctx.query),
      strapi.service('api::article.article').sync(ctx.query),
      strapi.service('api::point.point').sync(ctx.query),
      strapi.service('api::event.event').sync(ctx.query),
      strapi.service('api::route.route').sync(ctx.query),
      strapi.service('api::route-leg.route-leg').sync(ctx.query),
      strapi.service('api::route-waypoint.route-waypoint').sync(ctx.query),
    ]);

    ctx.send({
      changes: {
        pages,
        articles,
        points,
        events,
        routes,
        routeLegs,
        routeWaypoints,
      },
      datetime,
    });
  },
}
