jQuery(document).ready(function($) {
  var $window = $(window),
      heightHome = $("#masthead"),
      topBar = $('.top-navbar'),
      main = $('#content'),
      flexslider = { vars:{} },
      windowMax,
      scrolled;
  $(function () {
    SyntaxHighlighter.all();
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
    $('#logo-slider').flexslider({
      animation: "slide",
      animationLoop: true,
      slideshow: true,
      itemWidth: 180,
      itemMargin:0,
      keyboard: true,
      move:3,
      slideshowSpeed: 7000,    
      animationSpeed: 600,  
      directionNav: true,
      controlsContainer: "#logo-slider nav",
      controlNav: false,
      minItems: getGridSize(),
      maxItems: getGridSize(),
      start: function(slider){
        $('body').removeClass('loading');
        flexslider = slider;
        console.log(getGridSize());
      }
    });
  });

  // Resizes
  if ( ($("body.home").length) && ($window.width() > 768) ){
    $window.on('resize', function() {
      resizeFold();
      var gridSize = getGridSize();
      flexslider.vars.minItems = gridSize;
      flexslider.vars.maxItems = gridSize;
      console.log(gridSize);
    });
    resizeFold();
  }
  function getGridSize() {
        return (window.innerWidth < 320) ? 2 :
               (window.innerWidth < 400) ? 3 :
               (window.innerWidth < 992) ? 4 :
               (window.innerWidth < 1200) ? 5 : 6 ;
  }
  function resizeFold(){
    windowMax = Math.max($window.height(),700);
    heightHome.css({ height:windowMax-125});
  }
});