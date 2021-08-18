<?php

class Headless_Redirection
{

    /**
     * Constructor.
     */
    public function __construct($namespace)
    {
        $this->namespace = $namespace;
        $this->rest_base = 'redirection';

        $this->register_routes();

        /**
         * Since WordPress we use WP Headless there is no way Redirection can handle redirects on the front-end part for us
         * Therefore we update a cache in the front-end when Redirection triggers changes.
         */

        add_action( 'redirection_permalink_changed', [$this, 'set_redirects'] );
        add_action('redirection_redirect_updated', [$this, 'set_redirects']);
        add_action('redirection_redirect_deleted', [$this, 'set_redirects']);
        add_filter('redirection_save_options', function ($options) {$this->set_redirects();return $options;}, 10, 1);

        /**
         * Enabling / disabling a single, or multiple redirects does not trigger an action or filter
         * To make sure the redirects on the frontend are updated when the status changes we check using a WP REST hook
         */
        add_filter('rest_pre_echo_response', [$this, 'maybe_set_redirects'], 10, 3);

        add_action('https_ssl_verify', '__return_false');
    }

    /**
     * Register the component routes.
     */
    public function register_routes()
    {
        register_rest_route($this->namespace, '/' . $this->rest_base, array(
            array(
                'methods' => WP_REST_Server::READABLE,
                'callback' => array($this, 'get_redirects_callback'),
            ),
        ));
    }

    /**
     * Check if redirection endpoint is called and if action is needed
     * - This helps with stuff where Redirection has no WP hooks but we still need to update our data on frontend, like when the status of a redirect changes
     * @note it is allowed to extend this with more actions. But always check if Redirection has a hook for this first.
     */
    public function maybe_set_redirects($result, WP_REST_Server $server, WP_REST_Request $request)
    {
        $url_params = $request->get_url_params();

        if (isset($url_params['bulk']) && ($url_params['bulk'] == 'enable' || $url_params['bulk'] == 'disable')) {
            $this->set_redirects();
        }

        return $result;
    }

    /**
     * Send request to frontend to update redirects
     */
    public function set_redirects()
    {
        $items = $this->get_redirects();
        if (!$items) {
            return;
        }

        $url = getenv('WP_HOME') . '/wp/redirections';
        $basicAuthUser = (getenv('WP_AUTH_USER')) ? getenv('WP_AUTH_USER') : '';
        $basicAuthPass = (getenv('WP_AUTH_PASSWORD')) ? getenv('WP_AUTH_PASSWORD') : '';

        $args = array(
            'method' => 'POST',
            'headers' => array(
                'Content-Type' => 'application/json; charset=utf-8',
                'Authorization' => 'Basic ' . base64_encode($basicAuthUser . ':' . $basicAuthPass),
            ),
            'body' => json_encode(array('items' => $items, 'secret' => 'wp_redirections')),
        );

        $response = wp_remote_request($url, $args);

        if (is_wp_error($response)) {
            error_log("Failed updating Redirection on frontend. " . $response->get_error_message(), 0);
            return;
        }

        $response_code = wp_remote_retrieve_response_code($response);

        if ($response_code !== 200) {
            error_log("Failed updating Redirection on frontend. Response came back with code: " . $response_code, 0);
            return;
        }
    }

    /**
     * Redirection route callback
     */
    public function get_redirects_callback()
    {
        $items = $this->get_redirects();
        return new WP_REST_Response([
            'items' => $items,
        ]);
    }

    /**
     * Get list of all redirections
     */
    public function get_redirects()
    {
        global $wpdb;

        $filters = new Red_Item_Filters([]);
        $where = $filters->get_as_sql();

        $rows = $wpdb->get_results("SELECT * FROM {$wpdb->prefix}redirection_items $where");
        $items = array();

        foreach ($rows as $row) {
            $group = new Red_Item($row);
            $items[] = $group->to_json();
        }

        return $items;
    }

}
