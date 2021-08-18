const { createSecureHeaders } = require('next-secure-headers');
const withOptimizedImages = require('next-optimized-images');

module.exports = withOptimizedImages({
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: createSecureHeaders([
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=10886400; includeSubDomains; preload',
          },
          {
            key: 'Referrer-Policy',
            value: 'same-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'off',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains;',
          },
          {
            key: 'Feature-Policy',
            value:
              "accelerometer 'none'; camera 'self'; geolocation 'none'; gyroscope 'none'; magnetometer 'none'; microphone 'self'; payment 'none'; usb 'none'",
          },
        ]),
      },
    ];
  },

  webpack(config) {
    // Fixes npm packages that depend on `fs` module
    // eslint-disable-next-line
    config.node = {
      fs: 'empty',
      tls: 'empty',
      net: 'empty',
    };

    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();
      // Fix webpackHotUpdate console error thanks to:
      // https://github.com/zeit/next.js/issues/6842
      if (entries['main.js'] && !entries['main.js'].includes('./polyfill.js')) {
        entries['main.js'].unshift('./polyfill.js'); // <- polyfill here
      }
      return entries;
    };

    return config;
  },
  publicRuntimeConfig: {
    ENV: process.env.ENV,
  },
});
