export default {
  routes: [
    {
      method: 'GET',
      path: '/sync',
      handler: 'sync.sync',
      config: {
        auth: false,
      },
    }
  ]
}
