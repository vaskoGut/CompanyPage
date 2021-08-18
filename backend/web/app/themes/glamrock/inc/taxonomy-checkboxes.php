<?php
/**
 * @package Glamrock_Headless_WP
 */

/**
 * By default, in Add/Edit Post, WordPress moves checked categories to the top of the list and unchecked to the bottom.
 * When you have subcategories that you want to keep below their parents at all times, this makes no sense.
 * This function removes automatic reordering so the categories widget retains its order regardless of checked state.
 * Thanks to https://stackoverflow.com/a/12586404
 *
 * @param arr $args Array of arguments.
 * @return arr
 */
function taxonomy_checklist_checked_ontop_filter($args)
{
    $args['checked_ontop'] = false;
    return $args;
}

add_filter('wp_terms_checklist_args', 'taxonomy_checklist_checked_ontop_filter');
