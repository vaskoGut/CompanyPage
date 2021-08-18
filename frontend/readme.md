# Glamrock frontend :guitar:

The Glamrock frontend consists of NextJS, React and Apollo.
We query the WordPress backend using GraphQL with Apollo and the REST API for things like GravityForms and custom actions.

## Installation

1. Optional: set the following environment variables (you might not need to do this, in most development environments):

- **NODE_ENV** This variable is used by Next.js to start in development or production mode.
- **ENV** This variable is used in the _theme.config.js_ file to get the correct baseUrl.
- **PORT** This variable is used in the _server.js_ file to set the port. _Default: 80_

2. Change the backend and frontend URLs in _baseUrl.[ENV].js_. For development, copy _baseUrl.development.sample.js_ to _baseUrl.development.js_ and change the URls there.
3. Run `npm install`
4. Run `npm run start` to serve a development version

## Frontend Development

Within the frontend/ directory are a few subdirectories, we'll explain more about these and everything else.

### JavaScript

Our entire frontend is built in React, which is a JavaScript UI Framework. It allows you to write in JSX, which is a JavaScript syntax very similar to HTML but enhanced with the lovely features of JavaScript. JSX should preferrably only ever be written inside .jsx files, not .js files. This way, you can look at the name and extension of a file and have a suggestion about it's contents.

### Styled Components

We'll be using styled components to style our components. It's a CSS-in-JS solution that's very popular right now. Everything related to general styling should be added to theme.js.

### Next.js

We'll be using Next.js to get our React code to be able to render server-side. This way we'll have the first render on the server. Which is good for Accessibility, SEO and Performance.

### Wordpress preview mode

Next.js has built in [preview](https://nextjs.org/docs/advanced-features/preview-mode) mode functionality which we use in our theme. We support default wp post types previews by default. To add a new cpt you need to do following:

1. Add a new route to the `pages/api/previews.js` file (like for the 'blog' )
2. Include revisions query (see `postQueries.js` as an example)

### Dynamic Routers

We use a dynamic routers feature to handle posts/pages page. See [docs](https://nextjs.org/docs/routing/dynamic-routes) to know more

### Polyfills

We dropped support for IE11 by default but in case a client needs support for IE11 check if any of the following modules are present in the code:

- `Promise` (for async / await support)
- `window.fetch` (a Promise-based way to make web requests in the browser)
- `Object.assign` (a helper required for Object Spread, i.e. { ...a, ...b })
- `Symbol` (a built-in object used by for...of syntax and friends)
- `Array.from` (a built-in static method used by array spread, i.e. [...arr])
  If so, you might want to add the required core-js features to _polyfill.js_. Here's a [features list](https://github.com/zloirock/core-js#features).

## Deploying on Forest (everyone's favorite host)

1. Create an environment (if you do not already have one) with the blueprint `Beckrock on PHP 7.2 + Node 12`
2. Make sure you have correct configuration files in the repo
3. Set the following environment variables:

- **NODE_ENV** This variable is used by Next.js to start in development or production mode.
- **ENV** This variable is used in the _theme.config.js_ file to get the correct baseUrl.
- **PORT** This variable is used in the _server.js_ file to set the port. _Default: 80_

4. Set the deployment path to `frontend/` and index file to _server.js_
5. Add build commands:

- `frontend` - `npm install`
- `frontend` - `npm run build:production` (or you can build staging)

### How to setup frontend proxy on valet

Running a proxy basically means that NGINX will proxy the request to your local running instance of Glamrock (at localhost:3000).
The easiest way to do this is by running both the backend and the frontend over SSL, that way Valet creates the NGINX config files for you and you just have to edit them.
There are a lot of other ways to do this. You can also just create an NXING config file in the Valet config directory.

The easy way:

1. Run valet link & valet secure for the frontend (doesn't really matter in which folder you do this)
2. Open the newly generated config (in ~/.valet/Nginx or ~/.config/valet)
3. Remove any `location` block in the `server` blocks
4. Add the following code to each server block (except the first, this block is only to redirect non-https)

```nginx
  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
```

4. Restart Valet (or only NGINX)
5. Start up your local Glamrock frontend
6. Make awesome websites
