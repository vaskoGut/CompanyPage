<?php

/**
 * Add data attributes to the links in wp content to make them work in frontend
 * attrs: URI, TYPE
 */
add_action('init', 'uaf_wysihtml_filters');

function uaf_wysihtml_filters()
{
  add_filter('acf_the_content', 'add_link_data');
  add_filter('the_content', 'add_link_data');
}

function add_link_data($content)
{

  if (!$content || $content == '') {
    return $content;
  }

  $content = wp_kses_post($content);

  $content = mb_convert_encoding($content, 'HTML-ENTITIES', "UTF-8");
  $dom = new DOMDocument;
  // set show errors to false to not show wrong html markup warnings
  libxml_use_internal_errors(true);
  $dom->loadHTML("<div>" . utf8_decode($content) . "</div>", LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
  $container = $dom->getElementsByTagName('div')->item(0);
  $container = $container->parentNode->removeChild($container);
  while ($dom->firstChild) {
    $dom->removeChild($dom->firstChild);
  }
  while ($container->firstChild) {
    $dom->appendChild($container->firstChild);
  }

  $links = $dom->getElementsByTagName('a');

  foreach ($links as $link) {
    $href = $link->getAttribute('href');
    $post_id = url_to_postid($href);

    if ($post_id) {
      $link->setAttribute('data-type', get_post_type($post_id));
      $link->setAttribute('data-uri', wp_make_link_relative($href));
    }
  }

  return $dom->saveHTML();
}


/**
 * Add iFrame to allowed wp_kses_post tags
 *
 * @param array  $tags Allowed tags, attributes, and/or entities.
 * @param string $context Context to judge allowed tags by. Allowed values are 'post'.
 *
 * @return array
 */
function custom_wpkses_post_tags($tags, $context)
{

  if ('post' === $context) {
    $tags['iframe'] = array(
      'src'             => true,
      'height'          => true,
      'width'           => true,
      'frameborder'     => true,
      'allowfullscreen' => true,
    );
  }

  return $tags;
}

add_filter('wp_kses_allowed_html', 'custom_wpkses_post_tags', 10, 2);
