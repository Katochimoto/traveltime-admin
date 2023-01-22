export default {
  routes: [
    {
      method: 'GET',
      path: '/articles/sync',
      handler: 'article.sync',
      config: {
        auth: false,
      },
    }
  ]
}
