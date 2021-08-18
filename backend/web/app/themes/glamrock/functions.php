<?php

/**
 * @package Glamrock_Headless_WP
 */

/**
 * Theme support
 * These contain default options and alterations for WordPress we use in every project
 */
require_once 'inc/wp-rest-api.php';
require_once 'inc/frontend-origin.php';
require_once 'inc/cors.php';
require_once 'inc/cleanup.php';
require_once 'inc/post-preview-link.php';
require_once 'inc/taxonomy-checkboxes.php';
require_once 'inc/svg-support.php';
require_once 'inc/security.php';
require_once 'inc/wysiwyg-links-support.php';
require_once 'inc/acf-relationship-only-published.php';
require_once 'inc/admin/yoast.php';
require_once 'inc/admin/acf.php';
require_once 'inc/admin/translations.php';
require_once 'inc/admin/jwt-auth.php';
require_once 'inc/admin/gf.php';

/**
 * Content
 */
require_once 'functions/image-sizes.php';
require_once 'functions/acf.php';
require_once 'functions/post-types.php';
require_once 'functions/taxonomies.php';
require_once 'functions/page-templates.php';
require_once 'functions/menus.php';
require_once 'functions/acf-options.php';
require_once 'functions/shortcodes.php';

/**
 * Rest API endpoints
 * Define new endpoints in api/routes.php
 */
require_once 'api/init.php';

/**
 * GraphQL
 */
require_once 'graphql/init.php';
