
( function( $ ) {
    "use strict";
    
    var windowSize = $(window).width();    
    var blogGrid = $('#blog-grid-container'),
        filtersContainer = $('#blog-filters-container'),
        wrap,filtersCallback;

    /* --------------------------------*/
    /* - Doc Ready
    /* -------------------------------*/
    
    $( document ).ready( function() {       
           
        
        /*----------------------------------------------------*/
        /* Blog
        /*----------------------------------------------------*/
        if(windowSize < 400)
        {		
            $('.cbp-l-filters-dropdown, .cbp-l-filters-dropdownWrap, #blog-header .top-search-form').css({"width":"100%"});
            $('#blog-header .top-search-form input').css({"width":"92%"});
            $('#blog-header .tool-panel, #blog-header .goToTop').css({'height':'119px'});	
        }        
          

        /*********************************
            init cubeportfolio
        *********************************/

       blogGrid.cubeportfolio({
            layoutMode: 'grid',
            rewindNav: true,
            scrollByPage: false,
            defaultFilter: '*',
            animationType: blogGrid.data('animationtype'),
            gapHorizontal: blogGrid.data('gaphorizontal'),
            gapVertical: blogGrid.data('gapvertical'),
            gridAdjustment: 'responsive',
            mediaQueries: [{
                width: 1100,
                cols: 3
            }, {
                width: 800,
                cols: 2
            }, {
                width: 500,
                cols: 2
            }, {
                width: 320,
                cols: 1
            }],
            caption: blogGrid.data('caption'),
            displayType: 'lazyLoading',
            displayTypeSpeed: 100,
        });
        
        /*********************************
            add listener for filters
         *********************************/
        if (filtersContainer.hasClass('cbp-l-filters-dropdown')) {
            wrap = filtersContainer.find('.cbp-l-filters-dropdownWrap');

            wrap.on({
                'mouseover.cbp': function() {
                    wrap.addClass('cbp-l-filters-dropdownWrap-open');
                },
                'mouseleave.cbp': function() {
                    wrap.removeClass('cbp-l-filters-dropdownWrap-open');
                }
            });

            filtersCallback = function(me) {
                wrap.find('.cbp-filter-item').removeClass('cbp-filter-item-active');
                wrap.find('.cbp-l-filters-dropdownHeader').text(me.text());
                me.addClass('cbp-filter-item-active');
                wrap.trigger('mouseleave.cbp');
            };
        } else {
            filtersCallback = function(me) {
                me.addClass('cbp-filter-item-active').siblings().removeClass('cbp-filter-item-active');
            };
        }

        filtersContainer.on('click.cbp', '.cbp-filter-item', function() {
            var me = $(this);

            if (me.hasClass('cbp-filter-item-active')) {
                return;
            }

            // get cubeportfolio data and check if is still animating (reposition) the items.
            if (!$.data(blogGrid[0], 'cubeportfolio').isAnimating) {
                filtersCallback.call(null, me);
            }

            // filter the items
            blogGrid.cubeportfolio('filter', me.data('filter'), function() {});
        });
        
          /*********************************
            add listener for load more
         *********************************/
        $('.cbp-l-loadMore-button-blog-link').on('click.cbp', function(e) {
            e.preventDefault();
            var clicks, me = $(this),
                oMsg;

            if (me.hasClass('cbp-l-loadMore-button-stop')) {
                return;
            }

            // get the number of times the loadMore link has been clicked
            clicks = $.data(this, 'numberOfClicks');
            clicks = (clicks) ? ++clicks : 1;
            $.data(this, 'numberOfClicks', clicks);

            // set loading status
            oMsg = me.text();
            me.text('LOADING...');

            // perform ajax request
            $.ajax({
                url: me.attr('href'),
                type: 'GET',
                dataType: 'HTML'
            }).done(function(result) {
                var items, itemsNext;

                // find current container
                items = $(result).filter(function() {
                    return $(this).is('div' + '.cbp-loadMore-block' + clicks);
                });

                blogGrid.cubeportfolio('appendItems', items.html(),
                    function() {
                        // put the original message back
                        me.text(oMsg);

                        // check if we have more works
                        itemsNext = $(result).filter(function() {
                            return $(this).is('div' + '.cbp-loadMore-block' + (clicks + 1));
                        });

                        if (itemsNext.length === 0) {
                            me.text('NO MORE WORKS');
                            me.addClass('cbp-l-loadMore-button-stop');
                        }

                    });

            }).fail(function() {
                // error
            });

        });



       
        
    });
    
    /* --------------------------------*/
    /* - Window Scroll
    /* -------------------------------*/
    $(window).scroll(function() {
        
        var blogHeader = $("#blog-header").height();
 	var navHeight = $("nav .container-fluid").outerHeight();
	var scrollHeight =  blogHeader - navHeight * 2;       

        ($(window).scrollTop() > scrollHeight) ? $('.tool-panel').addClass('goToTop') : $('.tool-panel').removeClass('goToTop');              
        
    });   
    
} )( jQuery );    