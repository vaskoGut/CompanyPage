<?php
/**
 * Generate JWT token once user logs in into wordpress
 * save it in COOKIES to handle private posts in frontend
 */
if (!class_exists('\WPGraphQL\JWT_Authentication\Auth')) {
  return;
}

/**
 * Set jwt cookie when user is logged in
 */
add_action('init', function () {

  $user_id = get_current_user_id();
  if (!$user_id || isset($_COOKIE['wp_jwt_token'])) {
    return;
  }

  $user = wp_get_current_user();
  if (!$user instanceof \WP_User && !empty($user_id)) {
    $user = get_user_by('id', $user_id);
  }

  // continue if user is administrator only
  if (!array_intersect(array('administrator'), $user->roles)) {
    return;
  }

  // Get the token for the user.
  $token = \WPGraphQL\JWT_Authentication\Auth::get_token($user);
  if ($token) {
    setcookie('wp_jwt_token', $token, 0, COOKIEPATH, COOKIE_DOMAIN);
  }

});

// clear JWT cookie on user log out
add_action('wp_logout', 'wp_remove_jwt_cookie');
function wp_remove_jwt_cookie()
{
  setcookie('wp_jwt_token', ' ', time() - YEAR_IN_SECONDS, COOKIEPATH, COOKIE_DOMAIN);
}

/**
 * Change jwt expire time
 */
function wp_jwt_expiration($expiration)
{
  return 60 * 30; // 30mins
}
add_filter('graphql_jwt_auth_expire', 'wp_jwt_expiration', 10);
