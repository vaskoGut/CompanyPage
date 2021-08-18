<?php
/**
 * Cleanup hooks & functions to keep things clean.
 *
 * @package Glamrock_Headless_WP
 */

/**
 * Hide PHP deprecated warnings
 */
function glamrock_remove_dashboard_widgets(){
  remove_meta_box('dashboard_php_nag', 'dashboard', 'normal');
} 
add_action("wp_dashboard_setup", "glamrock_remove_dashboard_widgets");