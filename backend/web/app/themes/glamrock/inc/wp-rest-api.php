<?php
/**
 * Setup the basic url structure for the WP Rest API
 *
 * @package Glamrock_Headless_WP
 */

/**
 * Modify wp-json prefix
 * We want to use the Rest API as /wp/wp-json
 */
add_filter('rest_url_prefix', function() {
  return 'wp/wp-json';
});

/**
 * Make sure the returned rest url is the full url
 */
add_filter('rest_url', function( $url, $path = "" ) {
  $path = ltrim( $path, "/" );
  return get_site_url() . '/wp-json/' . $path;
}, 99, 2 );

/**
 * Fix for redirection not properly setting the Rest url
 * Redirection asks for the home_url instead of the site_url
 */
add_filter('home_url', function( $url, $path ) {
  if( strpos($url, 'rest_route') !== false ) {
    return get_site_url() . $path;
  }
  return $url;
}, 99, 2 );
