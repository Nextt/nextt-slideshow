require('../../src/slideshow');

var fixture = "<ul><li>Lorem</li><li>Ipsum</li></ul>";
beforeEach(function(){
		$('body').html(fixture);
});


describe('Before starting', function(){

	beforeEach(function(){
		$('body').html(fixture);
	});
	
	it("must have Jquery in the context", function(){
		expect(jQuery).toBeTruthy();
	});

	it("must have added method nexttSlideshow to the effin", function(){
		expect($.fn.nexttSlideshow).toBeTruthy();
	});

    it("must keep the chaining", function () {
    	var jqSelector = $('ul').nexttSlideshow();
    	expect(jqSelector).toBe("ul");
    });
});

describe("On clean initialization", function(){
	beforeEach(function(){
		jqElem = $('ul');
		jqLi = jqElem.find("li:first")
		spyOnEvent(jqLi, 'mouseenter');
		jqElem.nexttSlideshow();
	})

	it("must create a div container with the class nexttslideshow-container", function(){
		expect($('div.nexttslideshow-container')).toExist();		
	});

	it("must create a div container with the class slider-container and be parent of the element", function(){
		expect(jqElem.parent()).toBe('div.slider-container');		
	});

	it("must create a div inside the container for showing the midsized images", function(){
		expect($('div.nexttslideshow-container > div.selected-container').size()).toEqual(1);
	});

	it("must have created slider action links (to show more options) before and after the element", function(){
		expect($('a.previous')).toExist();
		expect(jqElem.prev()).toBe('a.previous');
		expect($('a.next')).toExist();
		expect(jqElem.next()).toBe('a.next');
	});

	it("must add class 'options' to the element", function(){
		expect(jqElem).toBe(".options");
	});

	it("must have binded hover event on element <li>", function(){
		expect(jqElem.find('li')).toHandle('mouseenter');
	});

	it("must have binded click event on element <li>", function(){
		expect(jqElem.find('li')).toHandle('click');
	});

	it ("must have fired the hover event on the first <li>", function(){
		expect('mouseenter').toHaveBeenTriggeredOn(jqLi);	
	});
});

describe("On initialization with custom click event", function(){
	beforeEach(function(){
		jqElem = $('ul');
		jqElem.nexttSlideshow({ click: function (){return false;}});
	});

	it("must have binded click event on .selected-container element", function(){
		expect($("div.selected-container")).toHandle('click');
	});
});


describe("On single item initialization", function(){
	beforeEach(function(){
		$('body').html('<ul><li>Lorem</li></ul>');
		jqElem = $('ul');
		jqElem.nexttSlideshow();
	});

	it("must hide .slider-container", function(){
		expect($("div.slider-container")).toBeHidden();
	});
});

describe("On hover on an element", function(){
	beforeEach(function(){
		jqElem = $('ul').nexttSlideshow();
		jqLi = jqElem.find('li:last');
		spyOnEvent(jqLi, 'mousenter');
		jqLi.mouseenter();
	});

	it("must set the content of the item in the .selected-container html", function(){
		expect($("div.selected-container")).toHaveHtml(jqLi.html());
	});
});

describe("On click to show next items", function(){

	beforeEach(function(){
		jqElem = $('ul').nexttSlideshow();
		jqNext = $('a.next');
		spyOnEvent(jqNext, 'click');
		jqNext.click();
	});

	xit("should add to scroll left the width of the element", function(){
		//TODO descobrir uma forma de realizar este teste
		expect(jqElem.scrollLeft()).toBeGreaterThan(0);
	});
	
});

describe("On click to show previous items", function(){
	xit("should subtract to scroll left the width of the element", function(){
		//TODO descobrir uma forma de realizar este teste
		expect(jqElem.scrollLeft()).toEqual(-1);
	});
});