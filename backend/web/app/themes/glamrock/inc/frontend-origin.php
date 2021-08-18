<?php
/**
 * Frontend origin helper functions.
 *
 * @package Glamrock_Headless_WP
 */

/**
 * Placeholder function for determining the frontend origin.
 * @TODO Determine the headless client's URL based on the current environment. (dotenv)
 * @return str Frontend origin URL, i.e., http://localhost:3000.
 */
function get_frontend_origin()
{
  return (getenv('WP_HOME')) ? getenv('WP_HOME') : 'http://localhost:3000';
}

/**
 * Replace frontend urls
 */
add_filter('rest_url', function ($url) {
  $url = str_replace(home_url(), site_url(), $url);
  return $url;
});

/**
 * Prevent redirect to home page
 * (fix for the GF api)
 * only set for real people, not for wp-cli
 */
if (isset($_SERVER['SERVER_ADDR']) && ($_SERVER["SERVER_ADDR"] == '127.0.0.1')) { 
  remove_filter('template_redirect', 'redirect_canonical');
}
