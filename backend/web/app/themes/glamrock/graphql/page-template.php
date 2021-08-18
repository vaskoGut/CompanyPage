<?php

function graphql_register_page_template()
{
    register_graphql_field(
        'Page',
        'pageTemplate',
        array(
            'type'        => 'String',
            'description' => 'Page template of page',
            'resolve'     => function (object $page) {
              $template = get_page_template_slug($page->ID);

                return $template;
            },
        )
    );
}

add_action('graphql_register_types', 'graphql_register_page_template');
