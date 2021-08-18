<?php
/**
 * Various security measures
 *
 * @package Glamrock_Headless_WP
 */

/**
 * Remove the Google Login cookie when not on login page
 */
add_filter('gal_set_login_cookie', function ($dosetcookie) {
  // Only set cookie on wp-login.php page
  return $GLOBALS['pagenow'] == 'wp-login.php';
});


/**
 * Add support widget to dashboard #manysafety #muchsecure
 */
function hike_support_widget()
{
  if (get_locale() != 'nl_NL') {
    echo "<p>For questions about the website you can reach us at:<br><br>Email: <a href='mailto:support@gohike.nl'>support@gohike.nl</a><br>Tel: 030-7371303</p>";
  } else {
    echo "<p>Voor vragen over de website kunt u ons bereiken op:<br><br>Email: <a href='mailto:support@gohike.nl'>support@gohike.nl</a><br>Tel: 030-7371303</p>";
  }
}
add_action('wp_dashboard_setup', function () {
  wp_add_dashboard_widget('hike_support_widget', 'Support & contact info', 'hike_support_widget');
});

/**
 * Turn off editing of theme and plugin from WP admin
 */
if (!defined('DISALLOW_FILE_EDIT')) {
  define('DISALLOW_FILE_EDIT', true);
}

/**
 * Hide WordPress update notifications
 */
function hike_hide_update_notifications()
{
  global $wp_version;
  return(object) array('last_checked'=> time(),'version_checked'=> $wp_version,);
}
add_filter('pre_site_transient_update_core', 'hike_hide_update_notifications'); //hide updates for WordPress itself
add_filter('pre_site_transient_update_plugins', 'hike_hide_update_notifications'); //hide updates for all plugins
add_filter('pre_site_transient_update_themes', 'hike_hide_update_notifications'); //hide updates for all themes

/**
 * Helper function: returns user
 * @return object/boolean WP_User/false
 */
function hike_get_current_user()
{
  $current_user = wp_get_current_user();

  if (! ( $current_user instanceof WP_User )) {
    return false;
  }

  return $current_user;
};

/**
 * Remove admin items (for clients)
 */
function hike_remove_admin_menu_items()
{
  global $menu;
  $remove_menu_items = array(__('Plugins'), __('Comments'));
  remove_submenu_page('themes.php', 'themes.php');
  remove_submenu_page('index.php', 'update-core.php');
  if (!empty($menu)) {
    end($menu);
    while (prev($menu)) {
      $item = explode(' ', $menu[key($menu)][0]);
      if (in_array($item[0] != null ? $item[0] : "", $remove_menu_items)) {
        unset($menu[key($menu)]);
      }
    }
  }
}

/**
 * Rules for @gohike.nl and @client.ext users
 */
add_action('wp_loaded', function () {
  /**
   * Hide 'allow weak password' checkbox
   */
  add_action('admin_head', function () {
    echo '<style>
      .pw-weak {
      display: none !important;
  }
  </style>';
  });


  // Domains in this array will be able to make changes and install plugins and such
  $allowed = array('gohike.nl');

  if ($user = hike_get_current_user()) {
    $email = $user->user_email;
    $explodedEmail = explode('@', $email);
    $domain = array_pop($explodedEmail);

    if (! in_array($domain, $allowed)) {
      // Remove admin menu items
      add_action('admin_init', function () {
        add_action('admin_menu', hike_remove_admin_menu_items());
      });

      // Remove ACF settings menu
      add_filter('acf/settings/show_admin', '__return_false');

      // Redirect users that attempt to go to plugins or themes
      if ($_SERVER['PHP_SELF'] == '/wp-admin/plugins.php' || $_SERVER['PHP_SELF'] == '/wp-admin/themes.php' || $_SERVER['PHP_SELF'] == '/wp-admin/plugin-install.php') {
        wp_redirect(admin_url());
        exit;
      }
    }
  }
});

/**
 * Unset WP REST /users endpoints
 */
add_filter( 'rest_endpoints', function( $endpoints ){
    if ( isset( $endpoints['/wp/v2/users'] ) ) {
        unset( $endpoints['/wp/v2/users'] );
    }
    if ( isset( $endpoints['/wp/v2/users/(?P<id>[\d]+)'] ) ) {
        unset( $endpoints['/wp/v2/users/(?P<id>[\d]+)'] );
    }
    return $endpoints;
});
