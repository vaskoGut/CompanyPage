<?php

/**
 * WPGraphQL Meta Query
 * 
 * Taken from this plugin: https://github.com/wp-graphql/wp-graphql-meta-query
 * 
 * Don't use the whole plugin because it might be better to hook into WPGraphQL and define specific meta queries 
 * that you know you need and are not going to take your system down instead of allowing just any meta_query via this plugin
 */

namespace WPGraphQL;

use WPGraphQL\Registry\TypeRegistry;

class MetaQuery
{

  /**
   * MetaQuery constructor.
   *
   * This hooks the plugin into the WPGraphQL Plugin
   *
   */
  public function __construct()
  {

    /**
     * Filter the query_args for the PostObjectQueryArgsType
     *
     */
    add_filter('graphql_input_fields', [$this, 'add_input_fields'], 10, 4);

    /**
     * Filter the $allowed_custom_args for the PostObjectsConnectionResolver to map the
     * metaQuery input to WP_Query terms
     *
     */
    add_filter('graphql_map_input_fields_to_wp_query', [$this, 'map_input_fields'], 10, 2);
  }


  /**
   * add_input_fields
   *
   * This adds the metaQuery input fields
   *
   * @param array        $fields
   * @param string       $type_name
   * @param array        $config
   * @param TypeRegistry $type_registry
   *
   * @return mixed
   * @throws \Exception
   */
  public function add_input_fields($fields, $type_name, $config, $type_registry)
  {
    if (isset($config['queryClass']) && 'WP_Query' === $config['queryClass']) {
      $this->register_types($type_name, $type_registry);
      $fields['metaQuery'] = [
        'type' => $type_name . 'MetaQuery',
      ];
    }

    return $fields;
  }

  /**
   * @param              $type_name
   * @param TypeRegistry $type_registry
   *
   * @throws \Exception
   */
  public function register_types($type_name, TypeRegistry $type_registry)
  {

    $type_registry->register_enum_type($type_name . 'MetaTypeEnum', [
      'values' => [
        'BINARY' => [
          'name'  => 'BINARY',
          'value' => 'BINARY',
        ],
      ]
    ]);

    $type_registry->register_enum_type($type_name . 'MetaCompareEnum', [
      'values' => [
        'EQUAL_TO'                 => [
          'name'  => 'EQUAL_TO',
          'value' => '=',
        ],
        'NOT_EXISTS'               => [
          'name'  => 'NOT_EXISTS',
          'value' => 'NOT EXISTS',
        ],
      ]
    ]);

    $type_registry->register_input_type($type_name . 'MetaArray', [
      'fields' => [
        'key'     => [
          'type'        => 'String',
          'description' => __('Custom field key', 'wp-graphql'),
        ],
        'value'   => [
          'type'        => 'String',
          'description' => __('Custom field value', 'wp-graphql'),
        ],
        'compare' => [
          'type'        => $type_name . 'MetaCompareEnum',
          'description' => __('Custom field value', 'wp-graphql'),
        ],
        'type'    => [
          'type'        => $type_name . 'MetaTypeEnum',
          'description' => __('Custom field value', 'wp-graphql'),
        ],
      ]
    ]);

    $type_registry->register_input_type($type_name . 'MetaQuery', [
      'fields' => [
        'relation'  => [
          'type' => 'RelationEnum',
        ],
        'metaArray' => [
          'type' => [
            'list_of' => $type_name . 'MetaArray',
          ],
        ],
      ]
    ]);
  }

  /**
   * map_input_fields
   *
   * This maps the metaQuery input fields to the WP_Query
   *
   * @param $query_args
   * @param $input_args
   *
   * @return mixed
   */
  public function map_input_fields($query_args, $input_args)
  {

    /**
     * check to see if the metaQuery came through with the input $args, and
     * map it properly to the $queryArgs that are returned and passed to the WP_Query
     *
     */
    $meta_query = null;
    if (!empty($input_args['metaQuery'])) {
      $meta_query = $input_args['metaQuery'];
      if (!empty($meta_query['metaArray']) && is_array($meta_query['metaArray'])) {
        if (2 < count($meta_query['metaArray'])) {
          unset($meta_query['relation']);
        }
        foreach ($meta_query['metaArray'] as $meta_query_key => $value) {
          $meta_query[] = [
            $meta_query_key => $value,
          ];
        }
      }
      unset($meta_query['metaArray']);
    }
    if (!empty($meta_query)) {
      $query_args['meta_query'] = $meta_query;
    }

    /**
     * Retrun the $query_args
     *
     */
    return $query_args;
  }
}

/**
 * Instantiate the MetaQuery class on graphql_init
 *
 * @return MetaQuery
 */
function graphql_init_meta_query()
{
  return new MetaQuery();
}

add_action('graphql_init', '\WPGraphql\graphql_init_meta_query');
