var Nextt = Nextt || {};


Nextt.SlideShowController = {

	defaultOptions : {},

	init : function (opts) {
		var jqThis = $(this);
		var jqContainer = $('<div class="nexttslideshow-container"><div class="slider-container" /></div>');
		var jqSelectedContainer = $('<div class="selected-container"></div>');
		var jqSlidePreviousLink = $('<a class="previous">&nbsp;</a>');
		var jqSlideNextLink = $('<a class="next">&nbsp;</a>');
		jqThis.wrap(jqContainer).addClass('options').before(jqSlidePreviousLink).after(jqSlideNextLink);
		jqThis.closest('.nexttslideshow-container').prepend(jqSelectedContainer);

		var jqLis = jqThis.find('li');
		if (jqLis.size() == 1){
			jqThis.closest('.slider-container').hide();

		} 
	
		jqLis.bind('mouseenter.nexttslideshow', Nextt.SlideShowController.hover)
								.bind('click.nexttslideshow',  Nextt.SlideShowController.click);
		jqSlideNextLink.bind('click.nexttslideshow', Nextt.SlideShowController.slideNextClick);
		jqSlidePreviousLink.bind('click.nexttslideshow', Nextt.SlideShowController.slidePreviousClick);

		if (opts && opts.click){
			jqSelectedContainer.bind('click.nexttslideshow', opts.click);
		}

		jqLis.first().mouseenter();
	},

	hover : function (event){
		var jqThis = $(this);
		jqThis.closest('.nexttslideshow-container').find(".selected-container").html(jqThis.html())
	},

	click : function (event) {
		//Just return false to prevent any action on the elements of the slider
		return false;
	},

	slideNextClick : function (event){
		var jqList = $(this).closest('.nexttslideshow-container').find('ul');
		jqList.animate({scrollLeft : '+=' + jqList.width() })
		return false;
	},

	slidePreviousClick : function (event){
		var jqList = $(this).closest('.nexttslideshow-container').find('ul');
		jqList.animate({scrollLeft : '-=' + jqList.width() })
		return false;
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
