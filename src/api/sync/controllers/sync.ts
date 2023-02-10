export default {
  async sync(ctx) {
    const datetime = new Date().toISOString();
    const [articles, points] = await Promise.all([
      strapi.service('api::article.article').sync(ctx.query),
      strapi.service('api::point.point').sync(ctx.query),
    ]);

    ctx.send({
      changes: {
        articles,
        points,
      },
      datetime,
    });
  },
}
