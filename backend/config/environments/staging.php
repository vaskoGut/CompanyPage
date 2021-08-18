<?php
/**
 * Configuration overrides for WP_ENV === 'staging'
 * Set up for Forest usage
 */

use function Env\env;
use Roots\WPConfig\Config;

Config::define('WP_HOME', 'https://frontend.sgglamrock.dev.gohike.nl');
Config::define('WP_BASEURL', 'https://backend.sgglamrock.dev.gohike.nl');
Config::define('WP_SITEURL', 'https://backend.sgglamrock.dev.gohike.nl/wp');

Config::define('WP_CONTENT_URL', 'https://backend.sgglamrock.dev.gohike.nl' . Config::get('CONTENT_DIR'));

/**
 * Forest sets DB credentials for us, better use 'em
 */
Config::define('DB_NAME', env('DATABASE_WORDPRESS_NAME'));
Config::define('DB_USER', env('DATABASE_WORDPRESS_USER'));
Config::define('DB_PASSWORD', env('DATABASE_WORDPRESS_PASSWORD'));
Config::define('DB_HOST', env('DATABASE_WORDPRESS_HOST'));
