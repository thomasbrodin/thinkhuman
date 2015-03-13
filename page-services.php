<?php
/*
 * Template Name: List of services 
 * 
 */


$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;

Timber::render(array('page-services.twig'), $context);