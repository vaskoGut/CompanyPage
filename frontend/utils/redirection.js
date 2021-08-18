const fetch = require('isomorphic-unfetch');
const config = require('../theme.config');

function getUnique(arr, comp) {
  const unique = arr
    .map((e) => e[comp])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter((e) => arr[e])
    .map((e) => arr[e]);

  return unique;
}

async function redirectUrls(req, res, next) {
  if (config.wordpress.redirection) {
    try {
      const redirect = await fetch(config.wordpress.redirection);

      if (!redirect.ok) {
        throw new Error(redirect.statusText);
      }

      await redirect
        .json()
        .then((resp) => {
          if (resp.items && resp.items.length > 0) {
            // Filter out any duplicate redirects
            const uniqueArray = getUnique(resp.items, 'url');
            uniqueArray.sort((a, b) => a.regex - b.regex);

            uniqueArray.some((redirect) => {
              const { url, action_code, action_data, enabled, regex } = redirect;

              // Handle regular redirects
              if (enabled && req.path === url) {
                res.writeHead(action_code, {
                  Location: action_data.url,
                });
                res.end();
                return {};
              }

              // Handle REGEX redirects
              if (regex && enabled && req.path.match(url)) {
                const match = req.path.match(url);
                const matchUrl = action_data.url.replace('$1', match[1]);

                res.writeHead(action_code, {
                  Location: matchUrl,
                });
                res.end();
                return {};
              }
            });
          }
        })
        .catch((e) => console.error(e));
    } catch (err) {
      console.error('Please activate the Redirection plug-in');
    }
  }

  next();
}

module.exports = redirectUrls;
