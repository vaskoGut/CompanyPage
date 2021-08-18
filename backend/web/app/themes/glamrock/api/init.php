<?php

/**
 * Include route classes
 */
require_once 'gravityforms.php';
require_once 'redirection.php';
require_once 'search.php';

/**
 * Register custom API routes
 */
add_action('rest_api_init', function () {
    $api_namespace = 'glamrock/v1';

    new Headless_GravityForms($api_namespace);
    new Headless_Redirection($api_namespace);
    new Headless_Search($api_namespace);
});
