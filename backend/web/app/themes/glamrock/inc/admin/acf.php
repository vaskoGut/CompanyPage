<?php

/**
 * Only posts with status 'Published'
 */
//add_filter( 'acf/fields/relationship/query', 'glamrock_acf_relation_only_published', 10, 1);
//add_filter( 'acf/fields/post_object/query', 'glamrock_acf_relation_only_published', 10, 1);


function glamrock_acf_relation_only_published( $options ) {
  $options['post_status'] = array('publish');
  return $options;
}
