export default {
  routes: [
    {
      method: 'GET',
      path: '/points/sync',
      handler: 'point.sync',
      config: {
        auth: false,
      },
    }
  ]
}
