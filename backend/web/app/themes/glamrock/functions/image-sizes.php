<?php
/**
 * @package Glamrock_Headless_WP
 */

// add post thumbnails support
add_theme_support('post-thumbnails');

//Image sizes
if (function_exists('add_image_size')) {
  add_image_size('logo', 120, 120, false);
  add_image_size('product', 160, 180, false);
  add_image_size('mediumSquare', 640, 640, true);
  add_image_size('mediumPortrait', 380, 215, true);
  add_image_size('featImgSocial', 1200, 630, true);
}
