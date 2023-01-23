export default {
  async sync(ctx) {
    const articles = await strapi.service('api::article.article').sync(ctx.query);
    ctx.send({
      changes: {
        articles,
      },
      datetime: new Date().toISOString(),
    });
  },
}