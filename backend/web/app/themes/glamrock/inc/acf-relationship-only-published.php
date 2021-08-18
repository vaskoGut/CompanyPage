<?php

/**
 * Exclude posts that are not published from ACF field values
 * - this filters the values for usage with get_field as well as for GraphQL
 */
add_filter('acf/load_value/type=relationship', 'glamrock_acf_load_value_filter_published', 10, 3 );
add_filter('acf/load_value/type=post_object', 'glamrock_acf_load_value_filter_published', 10, 3 );


function glamrock_acf_load_value_filter_published( $value, $post_id, $field ) {
    $result = [];
    foreach($value as $key => $id){
        if( get_post_status( $id ) == 'publish' ){
            $result[] = $id;
        }
    }
    return $result;
};
