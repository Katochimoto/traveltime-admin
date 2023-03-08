export default {
  routes: [
    {
      method: 'GET',
      path: '/events/sync',
      handler: 'event.sync',
      config: {
        auth: false,
      },
    }
  ]
}
