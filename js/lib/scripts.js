jQuery(document).ready(function($) {

  var $window = $(window),
      heightHome = $("#masthead"),
      topBar = $('.top-navbar'),
      main = $('#content'),
      windowMax,
      scrolled;
  if ($("#logobar").length){
      logoBar = $('#logobar');
      lbHeight = logoBar.height();
  }
  $('.cs-placeholder').click(function() {
    topBar.addClass('selected');
    $('.top-yellow-bar').addClass('selected');
  });
  $('.cs-select .cs-options li').click(function() {
    topBar.removeClass('selected');
    $('.top-yellow-bar').removeClass('selected');
  });
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
    heightHome.css({ height:windowMax-lbHeight});
  }
  // Resizes
  if ( ($("body.home").length) && ($(window).width() > 768) ){
    $window.on('resize',resizeFold);
    resizeFold();
  }
});