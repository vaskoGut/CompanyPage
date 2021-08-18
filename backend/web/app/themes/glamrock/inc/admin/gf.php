<?php
// Hide the GF fields in wp-admin that are not supported in our GF package
add_action('admin_head', 'hide_gf_not_supported_fields');
function hide_gf_not_supported_fields()
{
  echo '<style>
    #add_advanced_fields input[data-type="name"] {
      pointer-events: none;
      opacity: 0.3;
    }
    #add_advanced_fields input[data-type="time"] {
      pointer-events: none;
      opacity: 0.3;
    }
    #add_advanced_fields input[data-type="address"] {
      pointer-events: none;
      opacity: 0.3;
    }
    #add_advanced_fields input[data-type="list"] {
      pointer-events: none;
      opacity: 0.3;
    }
    #sidebarmenu1>.add_field_button_container:nth-last-child(-n+2){
      pointer-events: none;
      opacity: 0.3;
    }
  </style>';
}
