<?php

/**
 * Register navigation menu.
 *
 * @return void
 */
function register_menus()
{
    register_nav_menu('header_menu', __('Header Menu', 'headless-bedrock'));
    register_nav_menu('footer_menu', __('Footer Menu', 'headless-bedrock'));
}
add_action('after_setup_theme', 'register_menus');
