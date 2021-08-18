<?php
/**
 * Include all stated ACF fields in /acf
 *
 * @package Glamrock_Headless_WP
 */
$acf_files = glob(get_template_directory().'/acf/*.php');
foreach ($acf_files as $file) {
    require_once($file);
}
