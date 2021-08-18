<?php

add_action('graphql_register_types', 'register_acf_link_fields');

function register_acf_link_fields()
{
  register_graphql_field('ACF_Link', 'uri', [
    'description' => __('Post URI', 'glamrock'),
    'type' => 'String',
  ]);
  register_graphql_field('ACF_Link', 'type', [
    'description' => __('Post URI', 'glamrock'),
    'type' => 'String',
  ]);
}

add_filter('graphql_acf_field_value', 'add_acf_link_uri', 10, 2);

function add_acf_link_uri($value, $acf_field)
{
  if ('link' === $acf_field['type'] && !empty($value)) {
    if (isset($value['url'])) {
      $post_id = url_to_postid($value['url']);
      if (!$post_id) {
        return $value;
      }
        $post = get_post($post_id);
      if ($post) {
        $value['type'] = $post->post_type;
        $value['uri'] = wp_make_link_relative($value['url']);
      }
    }
  }
  return $value;
}
