export default {
  routes: [
    {
      method: 'GET',
      path: '/pages/sync',
      handler: 'page.sync',
      config: {
        auth: false,
      },
    }
  ]
}
