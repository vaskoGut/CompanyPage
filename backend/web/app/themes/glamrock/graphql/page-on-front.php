<?php

function register_pageonfront_connection()
{
    $config = [
        'fromType' => 'RootQuery',
        'toType' => 'Page',
        'fromFieldName' => 'PageOnFront',
        'connectionTypeName' => 'PageOnFrontConnection',
        'resolve' => function ($post, $args, $context, $info) {
            $resolver = new \WPGraphQL\Data\Connection\PostObjectConnectionResolver([], $args, $context, $info, 'page');
            $resolver->setQueryArg('page_id', (int) get_option('page_on_front'));
            $connection = $resolver->get_connection();
            return $connection;
        },
        'resolveNode' => function ($post, $args, $context, $info) {
            return \WPGraphQL\Data\DataSource::resolve_post_object($post->ID, $context);
        }
    ];
    register_graphql_connection($config);
}
add_action('graphql_register_types', 'register_pageonfront_connection', 99);
