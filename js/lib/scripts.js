jQuery(document).ready(function($) {

  var $window = $(window),
      heightHome = $("#masthead"),
      topBar = $('.top-navbar'),
      main = $('#content'),
      windowMax,
      scrolled;
  // TopNav Scroll
  $window.scroll(function() {
		scrolled = Math.max(0, $window.scrollTop());
		if ( (scrolled >= 22) && (!topBar.hasClass('selected')) ){
      topBar.addClass('fixed');
      main.addClass('fixed');
		} else if ( (scrolled >= 22) && (topBar.hasClass('selected')) ) {
      topBar.removeClass('fixed');
    } else if ( (scrolled < 22) && (topBar.hasClass('selected')) ) {
      topBar.removeClass('fixed');
    } else {
      topBar.removeClass('fixed');
      main.removeClass('fixed');
    }
  });
  $.material.init();
  // Sliders
  $window.load(function() {
    $('#testimonial-slider').flexslider({
      animation: "slide",
      slideshow: false,
      controlsContainer: "#testimonial-slider nav",
      controlNav: false,
      animationLoop: true,
      directionNav: true
    });
  });
  function resizeFold(){
    windowMax = Math.max($window.height(),700);
    heightHome.css({ height:windowMax-125});
  }
  // Resizes
  if ( ($("body.home").length) && ($(window).width() > 768) ){
    $window.on('resize',resizeFold);
    resizeFold();
  }
});