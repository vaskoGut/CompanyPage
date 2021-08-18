const express = require('express');
const basicAuth = require('express-basic-auth');
const next = require('next');
const nextConfig = require('next/config');
const bodyParser = require('body-parser');
const compression = require('compression');
const fs = require('fs');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const { publicRuntimeConfig = {} } = nextConfig.default() || {};
const { ENV = 'master' } = publicRuntimeConfig;
const fetch = require('node-fetch');
const config = require('./theme.config');

app
  .prepare()
  .then(() => {
    const server = express();
    const redirection = require('./utils/redirection');

    // parse application/x-www-form-urlencoded
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());

    if (ENV === 'staging') {
      server.use(
        basicAuth({
          challenge: true,
          users: { gast: 'veelWebsites' },
        })
      );
    }
    server.use(redirection);
    server.use(compression());

    // Redirection route
    server.post('/wp/redirections', (req, res) => {
      const { secret, items } = req.body || {};
      if (secret !== 'wp_redirections') {
        return res.status(401).json({ message: 'Invalid key' });
      }
      fs.writeFile('redirection.json', JSON.stringify(items), (err) => {
        if (err) res.status(500).send({ err });
        res.status(200).json({ message: 'Redirection is updated' });
      });
    });

    // Handle robots.txt file
    const robotsOptions = {
      root: `${__dirname}/public/static/`,
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8',
      },
    };
    server.get('/robots.txt', (req, res) => res.status(200).sendFile('robots.txt', robotsOptions));

    // Handle sitemap url
    server.get('/sitemap*', (req, res) =>
      res.status(200).redirect(config.wordpress.backend + req.path)
    );

    // handle next files
    server.get('/_next/*', (req, res) => handle(req, res));

    // Handle admin login
    server.get(['/wp-admin', '/wp-admin/'], (req, res) =>
      res.status(200).redirect(`${config.wordpress.backend}/wp-admin`)
    );

    server.get('/_preview/:id/:type', (req, res) => {
      const queryParams = {
        id: +req.params.id,
        type: req.params.type,
        preview: true,
      };
      switch (queryParams.type) {
        case 'post':
          app.render(req, res, '/blog/[slug]', queryParams);
          break;
        default:
          app.render(req, res, '/page', queryParams);
      }
    });

    // Fallback handler
    server.get('*', (req, res) => {
      return handle(req, res);
    });

    // Listen on the default port (3000)
    server.listen(port, (err) => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.log(`> Ready on http://localhost:${port}`);
      initRedirection();
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err.stack);
    process.exit(1);
  });

/**
 * Create redirection.json file on server startup
 */
function initRedirection() {
  if (!config.wordpress.routes.redirection) return;
  fetch(config.wordpress.routes.redirection)
    .then((res) => res.json())
    .then((resp) => {
      if (resp.items && resp.items.length > 0) {
        fs.writeFile('redirection.json', JSON.stringify(resp.items), (e) => {
          if (e) console.error(e);
        });
      }
    });
}
