# Glamrock WordPress back-end :guitar:

Glamrock is Hike's starter pack for Headless React WordPress websites using GraphQL and the Rest API.
The WordPress setup is inspired by [Roots.io Bedrock](https://github.com/roots/bedrock).

**Uses:**

- GraphQL
- Rest API
- Gravity Forms with Rest endpoints
- Relevanssi with Rest endpoints
- Redirection with Rest endpoints

## Configuration

There are a couple different places configuration happens:
**1. `.env.default`**
This file should reflect production values. The urls in it should be production urls and no database credentials should be set here.
**2. `.env`**
This file is generated when running `composer install`. It is the current environments configuration.
You use this for local development and you can set database credentials here. Dont commit this file to the repository.
**3. the `config/environments/` directory**
In this directory you can find environment specific setup. For example: you could turn on debugging options in `development.php`. If you want to use the an environmental file (e.g. `development.php`), add the following line to your `.env`: `WP_ENV=development`. This will load the file: `config/environments/development.php`).

## Installation (for development)

1. Run Composer `$ composer install --prefer-dist`
2. Update the `.env`.

- Add `WP_ENV` variable set to `development` to the `.env` file. Make sure not to do this for the `.env.default` file as this will affect production and staging environments also.
  Preferably set the `WP_ENV` variable in your environment configuration.
- `AUTH_KEY`, `SECURE_AUTH_KEY`, `LOGGED_IN_KEY`, `NONCE_KEY`, `AUTH_SALT`, `SECURE_AUTH_SALT`, `LOGGED_IN_SALT`, `NONCE_SALT`
- Generate with [wp-cli-dotenv-command](https://github.com/aaemnnosttv/wp-cli-dotenv-command)
- Generate with [our WordPress salts generator](https://roots.io/salts.html)

3. Update the config file at `config/development.php` (you can also set these in your .env file)

- Database variables
  - `DB_NAME` - Database name
  - `DB_USER` - Database user
  - `DB_PASSWORD` - Database password
  - `DB_HOST` - Database host

3. The theme can be found in: `web/app/themes/glamrock`
4. Set the document root on your webserver to the `web` folder. For example, with Valet: `cd web/ && valet link glamrock` (dont forget to: `valet secure glamrock` to use HTTPS)
5. Start with a clean database? You can now run the installer via: `https://glamrock.test/wp/wp-admin/install.php`.
6. You can now find the Rest API here: `https://glamrock.test/wp/wp-json` and WordPress admin here: `https://glamrock.test/wp/wp-admin`

## Deploying on Forest (everyone's favorite host)

1. Create an environment with the blueprint `Bedrock on PHP 7.2 + Node 12`
2. Set the deplot path for PHP to `backend/`
3. Set `composer install --prefer-dist --no-interaction --no-dev` as build command with path `backend`
4. Give the volume for uploads the path `/web/app/uploads`
5. Add `WP_ENV` as environment variable and set it to the desirded value (`staging` or `production`)
6. Launch!! :rocket:

## Development

### Functions

The main power of the WordPress theme can be found inside the functions/ directory of the theme. Here you can add filters and stuff.

### ACF

Inside the theme is an acf/ directory. Here you can and should register all your ACF fields. This is where the main content will live!

### GraphQL

#### Pagination

Be default WPGraphQL doesn't support pagination. To make it work you need to include `graphql/pagination.php` file. (it's not included by default because it slows down the graphgql queries)
With this file included, you can use the following:

```
query GET_POSTS($page: Int!, $per_page: Int!) {
  posts(where: {offsetPagination: {page: $page, per_page: $per_page}}) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      previousPage
      nextPage
      totalPages
    }
    edges {
      cursor
      node {
        id
        title
        uri
      }
    }
  }
}
```

#### Meta query filtering

By default meta query doesn't work. There is a [plugin](https://github.com/wp-graphql/wp-graphql-meta-query) which makes it work but it's not recommended to install that because it slows down the graphql work, what we have to do it's just to "steal" a code from that plugin and adjust the code to use only that types and comparisons which we expect we'll use in a theme. See example in `graphql/meta-query.php`

## Known issues

### Redirection setup not completing

Redirection requires a setup before it works. If the setup does not go away or keeps hanging on 0% then try:

- Re-save permalinks
- Check your console for errors
- Check if the correct wp-json endpoint is called by the browser

### Too many redirects

If you get stuck in an infinite redirect loop when trying to go to `/wp/wp-admin` try:

- Re-save permalinks (either using WP CLI or by manually configuration)
- Make sure you are setting the WP_HOME and WP_SITE variables properly in the configuration files
