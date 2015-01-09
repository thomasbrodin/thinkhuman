<?php

	if (!class_exists('Timber')){
		add_action( 'admin_notices', function(){
			echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . admin_url('plugins.php#timber') . '">' . admin_url('plugins.php') . '</a></p></div>';
		});
		return;
	}
	if( function_exists('acf_add_options_page') ) {
		acf_add_options_page();
	}
	define('THEME_URL', get_template_directory_uri());
	class StarterSite extends TimberSite {

		function __construct(){
			add_theme_support('post-formats');
			add_theme_support('post-thumbnails');
			add_theme_support('menus');
			add_filter('timber_context', array($this, 'add_to_context'));
			add_filter('get_twig', array($this, 'add_to_twig'));
			add_filter('show_admin_bar', '__return_false');
			add_action( 'after_setup_theme', array($this, 'add_editor_styles' ));
			add_action('wp_enqueue_scripts', array($this, 'load_scripts'));	
			add_action('wp_enqueue_scripts', array($this, 'load_styles'));
			add_filter('acf/options_page/settings', array($this, 'options_page_settings'));
			add_action('init', array($this,'removeHeadLinks'));	
			register_nav_menus( array(
				'primary' => 'Menu',
				'footer' => 'Footer',
			) );
			parent::__construct();
		}
		function add_editor_styles() {
    		add_editor_style( 'style-editor.css' );
		}
		
		function add_to_context($context){
			$context['options'] = get_fields('options');
			$context['menu'] = new TimberMenu('primary');
			$context['footer'] = new TimberMenu('footer');
			$context['site'] = $this;
			return $context;
		}

		function add_to_twig($twig){
			/* this is where you can add your own fuctions to twig */
			$twig->addExtension(new Twig_Extension_StringLoader());
			$twig->addFilter('myfoo', new Twig_Filter_Function('myfoo'));
			return $twig;
		}
		function load_scripts(){
			wp_enqueue_script('jquery');
			wp_enqueue_script('bootstrap', THEME_URL . '/js/bootstrap.min.js', array('jquery'), '3.3.1', true);
			wp_enqueue_script( 'easing', THEME_URL . '/js/jquery.easing.js', array('jquery'), '1.3',true);
			wp_enqueue_script( 'mousewheel', THEME_URL . '/js/jquery.mousewheel.js', array('jquery'), '3.0.6', true);
			wp_enqueue_script( 'flexslider', THEME_URL . '/js/jquery.flexslider-min.js', array('jquery'), '2.2.2',true);
			wp_enqueue_script( 'classie', THEME_URL . '/js/classie.js', '', '', true);
			wp_enqueue_script( 'select', THEME_URL . '/js/selectFX.js', '', '1.0.0', true);	
			wp_enqueue_script( 'ripples', THEME_URL . '/js/ripples.min.js', array('jquery','bootstrap'),'', true);
      		wp_enqueue_script( 'material', THEME_URL . '/js/material.min.js', array('jquery','bootstrap',), '', true);	
			wp_enqueue_script( 'site', THEME_URL . '/js/scripts.js', array('jquery'), NULL, true);
		}

		function load_styles() {
			wp_enqueue_style( 'base', THEME_URL . '/css/base.css','','3.3.1','screen');
			wp_enqueue_style( 'slider', THEME_URL . '/css/sliders.css','','2.2.0','screen');
			wp_enqueue_style( 'material', THEME_URL . '/css/material.min.css','','','screen');
			wp_enqueue_style( 'ripples', THEME_URL . '/css/ripples.min.css','','','screen');
			wp_enqueue_style( 'select', THEME_URL . '/css/select.css','','','screen');
			wp_enqueue_style( 'custom', THEME_URL . '/style.css', NULL, NULL, 'screen'); 
			wp_enqueue_style( 'mobile', THEME_URL . '/css/media-queries.css',NULL, NULL, 'screen');
		}


		function removeHeadLinks() {
	    	remove_action('wp_head', 'rsd_link');
	    	remove_action('wp_head', 'wlwmanifest_link');
	    	remove_action('wp_head', 'wp_generator');
	    }
	}

	new StarterSite();

	function myfoo($text){
    	$text .= ' bar!';
    	return $text;
	}