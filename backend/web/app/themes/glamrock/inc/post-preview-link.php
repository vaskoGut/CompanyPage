<?php
/**
 * Alter preview links so they match with our frontend APP
 *
 * @package Glamrock_Headless_WP
 */

/**
 * Customize the preview button in the WordPress admin to point to the headless client.
 * @return string The headless WordPress preview link.
 */
function filter_preview_post_link($preview_link, $post)
{
  $id = get_the_ID();
  return get_frontend_origin() . '/api/'
  . 'preview/?id='
  . $id . '&type=' . $post->post_type;
};

add_filter('preview_post_link', 'filter_preview_post_link', 10, 2);
