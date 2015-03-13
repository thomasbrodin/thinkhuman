<?php
/*
 * Template Name: Services Page
 * 
 */


$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;

Timber::render(array('page-service-desc.twig'), $context);