<?php

/**
 * @package Glamrock_Headless_WP
 */

/**
 * Register URI field for the MenuItem type
 */
add_action('graphql_register_types', 'register_menu_item_uri_field');
function register_menu_item_uri_field()
{
  register_graphql_field('MenuItem', 'uri', [
    'description' => __('Post URI', 'glamrock'),
    'type' => 'String',
    'resolve' => function (object $post) {
      return wp_make_link_relative($post->url);
    }
  ]);
}
