export default {
  routes: [
    {
      method: 'GET',
      path: '/route-legs/sync',
      handler: 'route-leg.sync',
      config: {
        auth: false,
      },
    }
  ]
}
