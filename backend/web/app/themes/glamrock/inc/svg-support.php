<?php
/**
 * Add svg upload support
 *
 * @package Glamrock_Headless_WP
 */

// Allow SVG through WordPress Media Uploader
function cc_mime_types($mimes)
{
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');
