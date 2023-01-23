export default {
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
}
