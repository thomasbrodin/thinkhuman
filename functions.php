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
			wp_enqueue_script('main', THEME_URL . '/js/main.min.js', array('jquery'), NULL, true);
		}

		function load_styles() {
			wp_enqueue_style( 'main', THEME_URL . '/css/main.min.css','','3.3.1','screen');
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