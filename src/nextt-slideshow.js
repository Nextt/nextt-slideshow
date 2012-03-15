var Nextt = Nextt || {};

Nextt.SlideShowController = {

	defaultOptions : {},

	init : function (opts) {
		var jqThis = $(this);
		var jqContainer = $('<div class="nexttslideshow-container"><div class="slider-container" /></div>');
		var jqSelectedContainer = $('<div class="selected-container"></div>');
		var jqSlidePreviousLink = $('<a class="previous inactive">&nbsp;</a>');
		var jqSlideNextLink = $('<a class="next">&nbsp;</a>');
		jqThis.wrap(jqContainer).addClass('options').before(jqSlidePreviousLink).after(jqSlideNextLink);
		jqThis.closest('.nexttslideshow-container').prepend(jqSelectedContainer);

		var jqLis = jqThis.find('li');
		if (jqLis.size() === 1){
			jqThis.closest('.slider-container').hide();

		} 
	
		jqLis.bind('mouseenter.nexttslideshow', Nextt.SlideShowController.hover)
								.bind('click.nexttslideshow',  Nextt.SlideShowController.click);
		jqSlideNextLink.bind('click.nexttslideshow', Nextt.SlideShowController._slideClick);
		jqSlidePreviousLink.bind('click.nexttslideshow', Nextt.SlideShowController._slideClick);

		if (opts && opts.click){
			jqSelectedContainer.bind('click.nexttslideshow', opts.click);
		}
		jqLis.first().mouseenter();
		$(window).load(function () {
			Nextt.SlideShowController._updateSliderArrows.call( jqThis[0] );	
		});
	},

	hover : function (event){
		var activeItemClass = 'active-item';
		var jqThis = $(this);
		jqThis.addClass(activeItemClass);
		jqThis.siblings().removeClass(activeItemClass);
		jqThis.closest('.nexttslideshow-container').find(".selected-container").html(jqThis.html());
	},

	click : function (event) {
		//Just return false to prevent any action on the elements of the slider
		return false;
	},

	_slideClick : function (event){
		var container = $(this).closest('.nexttslideshow-container');
		var jqList = container.find('ul');
		var previousLink = container.find('a.previous');
		var nextLink = container.find('a.next');
		var operator;
		
		if ( $(event.target).is(nextLink) ) {
			operator = '+=';
		} else if ( $(event.target).is(previousLink) ) {
			operator = '-=';
		}

		jqList.animate( { scrollLeft : operator + jqList.width() }, Nextt.SlideShowController._updateSliderArrows);

		return false;
	},

	_updateSliderArrows : function () {
		var jqList = $(this);
		var previousLink = jqList.prev();
		var nextLink = jqList.next();

		if (jqList.scrollLeft() === 0) {
			previousLink.addClass('inactive');
		} else {
			previousLink.removeClass('inactive');
		}

		var noScroll = jqList[0].scrollWidth <= jqList.width();
		if ( noScroll || jqList[0].scrollWidth -  jqList.scrollLeft() <= jqList.width() ) {
			nextLink.addClass('inactive');
		} else {
			nextLink.removeClass('inactive');
		}
	}

};


$.extend($.fn, {

	nexttSlideshow : function( method ) {

		if ( Nextt.SlideShowController[method] ) {
			return Nextt.SlideShowController[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		
		} else if ( typeof method === 'object' || ! method ) {
			
			var opts = $.extend( Nextt.SlideShowController.defaultOptions, method );
			return this.each( function() {
				Nextt.SlideShowController.init.apply( this, [opts] );
			});
		
		} else {

			$.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
		}
	}

});
