<?php

if (function_exists('acf_add_local_field_group')) :
  acf_add_local_field_group(array(
      'key' => 'group_5e4bbc272ac08',
      'title' => 'Flex content',
      'fields' => array(
          array(
              'key' => 'page_flexible_content',
              'label' => 'Flexible Content',
              'name' => 'flexibleContent',
              'type' => 'flexible_content',
              'show_in_graphql' => 1,
              'layouts' => array(
               'latest_layout' => array(
                  'key' => 'latestLayout',
                  'name' => 'latestLayout',
                  'label' => 'Latest',
                  'display' => 'block',
                  'sub_fields' => array(
                      array(
                        'key' => 'latestTitle',
                        'label' => 'Title',
                        'name' => 'latestTitle',
                        'type' => 'text',
                      ),
                 ),
               ),
               'test_layout' => array(
                 'key'=> 'testLayout',
                 'name'=> 'testLayout',
                 'label' => 'test',
                 'display'=> 'block',
                 'sub_fields'=> array(
                   array(
                     'key'=>'testTitle',
                     'label'=> 'test',
                     'name'=>'testTitle',
                     'type'=> 'text'
                   )
                 )
               )
              ),
              'button_label' => 'Add Row',
          ),
      ),

      'location' => array(
        array(
          array(
            'param' => 'post_type',
            'operator' => '==',
            'value' => 'post',
          ),
        ),
        array(
          array(
            'param' => 'post_type',
            'operator' => '==',
            'value' => 'page',
          ),
        ),
      ),
      'show_in_graphql' => 1,
      'graphql_field_name' => 'flexContent',
  ));
endif;
