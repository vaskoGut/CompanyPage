<?php

if (function_exists('acf_add_local_field_group')) {
  acf_add_local_field_group(array(
    'key' => 'google_analytics',
    'title' => 'Google Analytics',
    'fields' => array(
      array(
        'key' => 'google_analytics_id',
        'label' => 'Google Analytics ID',
        'name' => 'analytics_id',
        'type' => 'text',
        'placeholder' => 'UA-4788155-1',
      ),
    ),
    'location' => array(
      array(
        array(
          'param' => 'options_page',
          'operator' => '==',
          'value' => 'site-options',
        ),
      ),
    ),
  ));

  acf_add_local_field_group(array(
    'key' => 'scripts_pixels',
    'title' => 'Scripts & pixels',
    'fields' => array(
      array(
        'key' => 'scripts_pixels_message',
        'label' => 'Toelichting',
        'type' => 'message',
        'message' => 'Deze velden zijn speciaal gemaakt voor het plaatsen van scripts op verschillende locaties binnen je website. De velden zijn beschikbaar binnen elke pagina, en op de Algemeen opties pagina. De scripts per pagina zullen enkel op de pagina\'s waar ze zijn geplaatst worden geïnitieerd, terwijl scripts geplaatst binnen Algemeen over alle pagina\'s van de website zullen worden gebruikt.',
      ),
      array(
        'key' => 'scripts_pixels_cookies_message',
        'label' => 'Cookies',
        'type' => 'message',
        'message' => 'Vanwege de europese cookiewet mogen websites niet zomaar cookies plaatsen die data van de gebruiker verzamelen. Dit mag wel gedaan worden met functionele cookies (cookies die nodig zijn voor het gebruik van de website). Scripts die je in de website laadt, kunnen soms tracking cookies plaatsen. Hiervoor is het van belang dat je de gebruiker op de hoogte stelt en hier toestemming voor vraagt. <br /><br /><b>Scripts plaatsen in het juiste veld:</b> zorg dat je scripts in het juiste veld plaatst om de cookiewet in acht te nemen. Voor meer informatie: <a href="https://www.rijksoverheid.nl/onderwerpen/telecommunicatie/vraag-en-antwoord/mag-een-website-ongevraagd-cookies-plaatsen">https://www.rijksoverheid.nl/onderwerpen/telecommunicatie/vraag-en-antwoord/mag-een-website-ongevraagd-cookies-plaatsen</a><br /><br /><i>Let op: Google Analytics kan in het veld hierboven geplaatst worden.</i>',
      ),
      array(
        'key' => 'scripts_pixels_header',
        'label' => 'Header',
        'type' => 'tab',
        'placement' => 'left',
      ),
      array(
        'key' => 'scripts_pixels_script_head_functional',
        'label' => '<code>&lt;head&gt;</code> scripts (functioneel)',
        'name' => 'script_head_functional',
        'type' => 'textarea',
        'instructions' => 'De <b>functionele</b> scripts die je hier plaatst zullen worden geïnitieerd tussen de head tag.',
      ),
      array(
        'key' => 'scripts_pixels_script_head_analytical',
        'label' => '<code>&lt;head&gt;</code> scripts (analytisch)',
        'name' => 'script_head_analytical',
        'type' => 'textarea',
        'instructions' => 'De <b>analytische</b> scripts die je hier plaatst zullen worden geïnitieerd tussen de head tag.',
      ),
      array(
        'key' => 'scripts_pixels_script_head_tracking',
        'label' => '<code>&lt;head&gt;</code> scripts (tracking)',
        'name' => 'script_head_tracking',
        'type' => 'textarea',
        'instructions' => 'De <b>tracking</b> scripts die je hier plaatst zullen worden geïnitieerd tussen de head tag.',
      ),
      array(
        'key' => 'scripts_pixels_body',
        'label' => 'Body',
        'type' => 'tab',
        'placement' => 'left',
      ),
      array(
        'key' => 'scripts_pixels_script_body_functional',
        'label' => '<code>&lt;body&gt;</code> scripts (functioneel)',
        'name' => 'script_body_functional',
        'type' => 'textarea',
        'instructions' => 'De <b>functionele</b> scripts die je hier plaatst zullen worden geïnitieerd tussen de body tag.',
      ),
      array(
        'key' => 'scripts_pixels_script_body_analytical',
        'label' => '<code>&lt;body&gt;</code> scripts (analytisch)',
        'name' => 'script_body_analytical',
        'type' => 'textarea',
        'instructions' => 'De <b>analytische</b> scripts die je hier plaatst zullen worden geïnitieerd tussen de body tag.',
      ),
      array(
        'key' => 'scripts_pixels_script_body_tracking',
        'label' => '<code>&lt;body&gt;</code> scripts (tracking)',
        'name' => 'script_body_tracking',
        'type' => 'textarea',
        'instructions' => 'De <b>tracking</b> scripts die je hier plaatst zullen worden geïnitieerd tussen de body tag.',
      ),
      array(
        'key' => 'scripts_pixels_footer',
        'label' => 'Footer',
        'type' => 'tab',
        'placement' => 'left',
      ),
      array(
        'key' => 'scripts_pixels_script_footer_functional',
        'label' => '<code>&lt;/body&gt;</code> scripts (functioneel)',
        'name' => 'script_footer_functional',
        'type' => 'textarea',
        'instructions' => 'De <b>functionele</b> scripts die je hier plaatst zullen worden geïnitieerd direct voor het sluiten van de body tag.',
      ),
      array(
        'key' => 'scripts_pixels_script_footer_analytical',
        'label' => '<code>&lt;/body&gt;</code> scripts (analytisch)',
        'name' => 'script_footer_analytical',
        'type' => 'textarea',
        'instructions' => 'De <b>analytische</b> scripts die je hier plaatst zullen worden geïnitieerd direct voor het sluiten van de body tag.',
      ),
      array(
        'key' => 'scripts_pixels_script_footer_tracking',
        'label' => '<code>&lt;/body&gt;</code> scripts (tracking)',
        'name' => 'script_footer_tracking',
        'type' => 'textarea',
        'instructions' => 'De <b>tracking</b> scripts die je hier plaatst zullen worden geïnitieerd direct voor het sluiten van de body tag.',
      ),
    ),
    'location' => array(
      array(
        array(
          'param' => 'options_page',
          'operator' => '==',
          'value' => 'site-options',
        ),
      ),
    ),
    'description' => 'Website scripts en pixels'
  ));
}
