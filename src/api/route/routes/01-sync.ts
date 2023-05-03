export default {
  routes: [
    {
      method: 'GET',
      path: '/routes/sync',
      handler: 'route.sync',
      config: {
        auth: false,
      },
    }
  ]
}
