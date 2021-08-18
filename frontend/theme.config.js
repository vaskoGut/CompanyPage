/**
 * Based on the current environment variable, we need to make sure
 * to exclude any DevTools-related code from the production builds.
 * The code is envify'd - using 'DefinePlugin' in Webpack.
 */
const nextConfig = require('next/config');
const { publicRuntimeConfig = {} } = nextConfig.default() || {};

// Load config based on ENV (instead of NODE_ENV)
const { ENV = 'development' } = publicRuntimeConfig;
const environment = ENV || 'development';
const config = require(`./config/${environment}`);

// WP theme name
const theme = 'glamrock';

module.exports = {
  wordpress: {
    ...config,
    slugs: {
      post: 'blog',
      page: 'page',
    },
    routes: {
      redirection: `${config.backend}/wp-json/${theme}/v1/redirection`,
      menus: `${config.backend}/wp-json/${theme}/v1/menus`,
      options: `${config.backend}/wp-json/acf/v3/options/options`,
      frontPage: `${config.backend}/wp-json/${theme}/v1/front-page`,
      search: `${config.backend}/wp-json/${theme}/v1/search`,
    },
  },
};
