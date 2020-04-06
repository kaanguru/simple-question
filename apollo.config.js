module.exports = {
    client: {
      service: {
        name: 'app',
        // URL to the GraphQL API
        url: 'http://sebapi.com/graphql',
      },
      // Files processed by the extension
      includes: [
        'src/**/*.vue',
        'src/**/*.js',
        'src/**/*.ts',
      ],
    },
  }