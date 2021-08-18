<?php

if (class_exists('Shortcode_UI')) {
  /*
     * Shortcode UI plug-in page
     * https://wordpress.org/plugins/shortcode-ui/
     */

  /*
     * Init shortcodes
     */
  add_action('init', 'bedrock_register_shortcodes');

  /*
     * Register shortcodes
     */
  function bedrock_register_shortcodes()
  {
    add_shortcode('button', 'bedrock_button_function');
  }

  /*
     * Button shortcode
     */
  function bedrock_button_function($atts, $content = '')
  {
    $html = '';
    $external = '';
    $color = '';

    $options = shortcode_atts(array(
      'link'     => '',
      'external' => '',
      'button_type' => '',
    ), $atts);

    if ($options['external'] == 'true') {
      $external = 'target="_blank"';
    }

    $link = $options['link'];

    $html .= '<a class="button ' . $options['button_type'] . '" href="' . $link . '"' . $external . '>' . $content . '</a>';
    return $html;
  }

  function bedrock_button_ui()
  {
    return  array(
      'label' => 'Button',
      'listItemImage' => 'dashicons-admin-links',
      'attrs' => array(
        array(
          'label' => 'Link',
          'attr'  => 'link',
          'type'  => 'url',
        ),
        array(
          'label' => 'External Link',
          'attr'  => 'external',
          'type'  => 'checkbox',
        ),
        array(
          'label' => 'Button type',
          'attr' => 'button_type',
          'type' => 'select',
          'options' => array(
            'primary' => 'Gray',
            'secondary' => 'Blue',
            'light' => 'White',
          ),
        ),
      ),
      'inner_content' => array(
        'label' => 'Titel',
      )
    );
  }

  if (function_exists("shortcode_ui_register_for_shortcode") && current_user_can('manage_options')) {
    shortcode_ui_register_for_shortcode('button', bedrock_button_ui());
  }
}

add_filter('do_shortcode_tag', 'parse_shortcode_output', 10, 4);
function parse_shortcode_output($output, $tag, $attrs, $m)
{
  // don't render gravityform in rest api
  if ('gravityform' == $tag) {
    $attr = $m[3];
    $output = "<gravityform {$attr}></gravityform>";
  }
  if ('button' == $tag) {
    $attr = $m[3];
    $postid = url_to_postid($attrs['link']);
    $slug = '';
    $type = '';
    if ($postid) {
      $post = get_post($postid);
      if ($post) {
        $slug = "slug='{$post->post_name}'";
        $type = "type='{$post->post_type}'";
      }
    }
    $output = "<button {$slug} {$type} {$attr}>{$m[5]}</button>";
  }
  return $output;
}
