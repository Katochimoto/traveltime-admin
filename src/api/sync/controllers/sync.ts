export default {
  async sync(ctx) {
    const datetime = new Date().toISOString();
    const [articles, points, events] = await Promise.all([
      strapi.service('api::article.article').sync(ctx.query),
      strapi.service('api::point.point').sync(ctx.query),
      strapi.service('api::event.event').sync(ctx.query),
    ]);

    ctx.send({
      changes: {
        articles,
        points,
        events,
      },
      datetime,
    });
  },
}
