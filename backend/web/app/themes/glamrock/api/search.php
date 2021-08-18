<?php

class Headless_Search extends WP_REST_Controller
{
  /**
   * Constructor.
   */
  public function __construct($namespace)
  {
    $this->namespace = $namespace;
    $this->rest_base = 'search';

    // register routes
    $this->register_routes();
  }

  /**
   * Register the component routes.
   */
  public function register_routes()
  {
    register_rest_route($this->namespace, '/' . $this->rest_base, [
      'methods'  => WP_REST_Server::READABLE,
      'callback' => array($this, 'search_route_callback'),
    ]);
  }

  /**
   * Generate results for the search route.
   *
   * @param WP_REST_Request $request Full details about the request.
   *
   * @return WP_REST_Response|WP_Error The response for the request.
   */
  function search_route_callback(WP_REST_Request $request)
  {
    $parameters = $request->get_query_params();
    // return results
    if (!isset($parameters['s'])) {
      return new WP_REST_Response(false, 200);
    }

    $posts_per_page = isset($parameters['per_page']) ? intval($parameters['per_page']) : get_option('posts_per_page');
    // default search args
    $args = array(
      's'                 =>  $parameters['s'],
      'paged'             =>  isset($parameters['paged']) ? (int) $parameters['paged'] : 1,
      'posts_per_page'    =>  $posts_per_page,
    );
    if (isset($parameters['type'])) {
      $args['post_type'] = $parameters['type'];
    }

    // run query
    $search_query = new WP_Query($args);
    if (function_exists('relevanssi_do_query')) {
      relevanssi_do_query($search_query);
    }
    $controller = new WP_REST_Posts_Controller('post');
    $posts = array();
    while ($search_query->have_posts()) :
      $search_query->the_post();
      $data    = $controller->prepare_item_for_response($search_query->post, $request);
      // needed for the proper work of the links
      $data->data['uri'] = wp_make_link_relative($data->data['link']);
      $posts[] = $controller->prepare_response_for_collection($data);
    endwhile;

    $results = [
      'items'         => $posts,
      'total_pages'   => $search_query->max_num_pages,
      'found_posts'   => $search_query->found_posts,
    ];
    // return results
    if (!empty($posts)) {
      return new WP_REST_Response($results, 200);
    } else {
      return new WP_REST_Response(false, 200);
    }
  }
}
