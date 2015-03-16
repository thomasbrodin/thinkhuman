<?php
/*
 * Template Name: Services Page
 * 
 */


$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;

$ancestors = get_post_ancestors($post->ID);
$parent = $ancestors[count($ancestors) - 1];

$args = array(
        'post_type' => 'page',
        'post_parent' => $parent,
    );
$context ['servicespages'] =  wp_list_pages("title_li=&child_of=" . $parent . "&depth=1&&echo=0");

Timber::render(array('page-service-desc.twig'), $context);