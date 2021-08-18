<?php

/* hook to display mu-plugins in the current site/user language */
function change_mo_file_location($mofile, $domain) {
  if ($domain == "gravityforms") {
    return WP_CONTENT_DIR . '/mu-plugins/gravityforms/languages/gravityforms-nl_NL.mo';
  } else if ($domain == "redirection") {
    return WP_CONTENT_DIR . '/mu-plugins/redirection/locale/redirection-nl_NL.mo';
  } else {
    return $mofile;
  }
}
add_filter('load_textdomain_mofile', 'change_mo_file_location', 10, 2);
