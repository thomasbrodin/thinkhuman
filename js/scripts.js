jQuery(document).ready(function($) {

  var $window = $(window),
      body = $('body'),
      bHeight = body.height(),
      windowHeight = $window.height(),
      heightHome = $("#masthead"),
      topBar = $('.top-navbar'),
      scrolled,
      flexslider;
  if ($("#logobar").length){
      logoBar = $('#logobar');
      lbHeight = logoBar.height();
  }
  if (bHeight > windowHeight) {
    body.addClass('no-sticky');
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
		if ( (scrolled >= 140) && (!topBar.hasClass('selected')) ){
      topBar.addClass('fixed');
		} else if ( (scrolled >= 140) && (topBar.hasClass('selected')) ) {
      topBar.removeClass('fixed');
    } else if ( (scrolled < 140) && (topBar.hasClass('selected')) ) {
      topBar.removeClass('fixed');
    } else {
      topBar.removeClass('fixed');
    }
  });
  $.material.init();
  // Sliders
  $window.load(function() {
    $('#coach-slider').flexslider({
      animation: "slide",
      animationLoop: true,
      slideshow: false,
      itemWidth: 140,
      itemMargin: 55,
      controlsContainer: ".section-graybar nav",
      controlNav: false,
      prevText: "Prev",
      nextText: "Next",
      minItems: getGridSize(),
      maxItems: getGridSize(),
      start: function(slider){
        $('body').removeClass('loading');
        flexslider = slider;
      }
    });
    $('#testimonial-slider').flexslider({
      animation: "slide",
      slideshow: false,
      controlsContainer: "#testimonial-slider nav",
      controlNav: false,
      animationLoop: true,
      directionNav: true
    });
  });
  // Resizes
  if ( ($("body.home").length) && ($(window).width() > 768) ){
    $window.on('resize',resizeFold);
    resizeFold();
  }
  $window.resize(function() {
    var gridSize = getGridSize();
    flexslider.vars.minItems = gridSize;
    flexslider.vars.maxItems = gridSize;
  });
  function resizeFold(){
		windowMax = Math.max($window.height(),780);
		heightHome.css({ height:windowMax-lbHeight});
    console.log(windowMax);
  }
  function getGridSize() {
    return (window.innerWidth < 400) ? 2 :
           (window.innerWidth < 600) ? 3 :
           (window.innerWidth < 990) ? 4 : 5;
  }
});