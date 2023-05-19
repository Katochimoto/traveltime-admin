export default {
  routes: [
    {
      method: 'GET',
      path: '/route-waypoints/sync',
      handler: 'route-waypoint.sync',
      config: {
        auth: false,
      },
    }
  ]
}
