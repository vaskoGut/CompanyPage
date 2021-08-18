<?php

/**
 * Configuration overrides for WP_ENV === 'development'.
 * .env credentials are loaded first, change below to overwrite.
 */

use Roots\WPConfig\Config;

// Config::define('WP_HOME', 'https://localhost');
// Config::define('WP_BASEURL', 'https://glamrock.test');
// Config::define('WP_SITEURL', 'https://glamrock.test/wp');

// Config::define('DB_NAME', 'glamrock');
// Config::define('DB_USER', 'glamrock');
// Config::define('DB_PASSWORD', 'glamrock');
// Config::define('DB_HOST', 'localhost');

Config::define('SAVEQUERIES', true);
Config::define('WP_DEBUG', true);
Config::define('WP_DEBUG_DISPLAY', true);
Config::define('WP_DISABLE_FATAL_ERROR_HANDLER', true);
Config::define('SCRIPT_DEBUG', true);
Config::define('GRAPHQL_DEBUG', true);

ini_set('display_errors', '1');
