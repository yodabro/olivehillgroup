( function( $ ) {
    "use strict";
    
    var $window = $(window);   
    var windowHeight = $window.height();
    
    /*----------------------------------------------------*/
    /* MOBILE DETECT FUNCTIONS
    /*----------------------------------------------------*/
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    /* --------------------------------*/
    /* - Doc Ready
    /* -------------------------------*/
    
    $( document ).ready( function() {           
        
        $("section, div, figure").each(function(indx) {

            if ($(this).attr("data-background")) {
                $(this).css("background-image", "url(" + $(this).data("background") + ")");
            }
        });
        
        $('#home').css({'height': windowHeight + 'px'});

        /*----------------------------------------------------*/
        /* Coming Soon Counter
         /*----------------------------------------------------*/
        var comingsoon = $('#countdown');
        var comingDate = new Date(comingsoon.data("year"),comingsoon.data("month")-1,comingsoon.data("day"));
        var padZeroes = comingsoon.data("padzeroes");
        var format = comingsoon.data("format");

        comingsoon.countdown({
            until: comingDate,
            padZeroes: padZeroes,
            format: format
        });
                
        
        /*----------------------------------------------------*/
        /*	Center Content for home
         /*----------------------------------------------------*/
        var contentHeight = $('.mainBanner-content').height();
        var topContentMargin = (windowHeight - contentHeight) / 2;
        $('.mainBanner-content').css({
            "margin-top": topContentMargin + "px"
        });

        /*----------------------------------------------------*/
      /*  Background youtub video
      /*----------------------------------------------------*/ 

        if (!isMobile.any()) {
            $(".player").mb_YTPlayer();
        }
        
    });
    
     /* --------------------------------*/
    /* - Window Load
     /* -------------------------------*/
    $window.load(function() {
        
        $('.parallax').each(function() {
            $(this).parallax("50%", 0.2);
        });
    });
    

    $.fn.parallax = function(xpos, speedFactor, outerHeight) {
        var $this = $(this);
        var getHeight;
        var firstTop;
        var paddingTop = 0;
        //get the starting position of each element to have parallax applied to it  
        function update() {

            $this.each(function() {

                firstTop = $this.offset().top;
            });
            if (outerHeight) {
                getHeight = function(jqo) {
                    return jqo.outerHeight(true);
                };
            } else {
                getHeight = function(jqo) {
                    return jqo.height();
                };
            }

            // setup defaults if arguments aren't specified
            if (arguments.length < 1 || xpos === null)
                xpos = "50%";
            if (arguments.length < 2 || speedFactor === null)
                speedFactor = 0.5;
            if (arguments.length < 3 || outerHeight === null)
                outerHeight = true;
            // function to be called whenever the window is scrolled or resized

            var pos = $window.scrollTop();
            $this.each(function() {
                var $element = $(this);
                var top = $element.offset().top;
                var height = getHeight($element);
                // Check if totally above or totally below viewport
                if (top + height < pos || top > pos + windowHeight) {
                    return;
                }

                $this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
            });
        }

        $window.on('scroll', update).resize(update);
        update();
    };



} )( jQuery );    