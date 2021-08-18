<?php

/**
 * Move YOAST metabox to bottom of page
 */
add_filter( 'wpseo_metabox_prio', function() {
  return 'low';
} );
