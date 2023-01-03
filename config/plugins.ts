export default ({ env }) => ({
  // https://market.strapi.io/plugins/@strapi-plugin-sentry
  sentry: {
    enabled: false, // env('NODE_ENV') === 'production',
    config: {
      dsn: env('SENTRY_DSN'),
      sendMetadata: true,
    },
  },
  // https://market.strapi.io/plugins/strapi-prometheus
  // /api/metrics
  'strapi-prometheus': {
    enabled: false,
    config: {
      // add prefix to all the prometheus metrics names.
      prefix: '',

      // use full url instead of matched url
      // true  => path label: `/api/models/1`
      // false => path label: `/api/models/:id`
      fullURL: false,

      // include url query in the url label
      // true  => path label: `/api/models?limit=1`
      // false => path label: `/api/models`
      includeQuery: false,

      // collect default metrics of `prom-client`
      defaultMetrics: true,

      // interval at which rate metrics are collected in ms
      interval: 10_000,

      // set custom/default labels to all the prometheus metrics
      customLabels: {
        name: 'strapi-prometheus',
      },
    }
  }
});
