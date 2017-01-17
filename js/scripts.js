$(document).ready(function(){

	setup_hero_image();

	setup_navigation();

	setup_faq();

	setup_print_view(); // add ?print to see print view
});

function setupScrollEvents(){
	$(window).scroll(function(){
	   $('.section').each(function(){
	      scrollControl('#' + $(this).attr('id'));  
	   });
	});
}

$(window).on("load", function(){
	window.scrollTo(0, 0);
	$('#loader').fadeOut(600);
	setupScrollEvents();
	setTimeout(function(){
		$('#section-1').removeClass('not_loaded');
	}, 350);
	//simulateLoading();	
});

function simulateLoading(){
	setTimeout(function(){
		window.scrollTo(0, 0);
		$('#loader').fadeOut(600);
		setupScrollEvents();
		setTimeout(function(){
			$('#section-1').removeClass('not_loaded');
		}, 350);
	}, 2000);
}

function scrollControl(element_selector){
	w = $(window).scrollTop() + $(window).height();
	e = $(element_selector).offset().top + 290;
	if( w >= e){
		if(element_selector == "#section-4" && $(element_selector).hasClass('not_loaded')){
			setupGauges();
		}
		$(element_selector).removeClass('not_loaded');
	}
}

function setup_hero_image(){
	$('.hero-image a.cta').click(function(){
		$(window).scrollTo('#contact', 800);
	});
}

function setup_navigation(){
	$('.burger-btn').click(function(){
		$(this).toggleClass('is-open');
		$('#navigation').toggleClass('is-visible');
	});

	$('#navigation ul li').click(function(e){

		the_a = $(this).children('a');
		the_href = the_a.attr('href');

		// if its a scrollTo link
		if(the_href.substr(0,1) == '#') {
			$(window).scrollTo(the_href, 1000);
			e.preventDefault();
		}
	});
}

function setup_print_view(){

   // add ?print to url to get print view

   var getUrlParameter = function getUrlParameter(sParam) {
      var sPageURL = decodeURIComponent(window.location.search.substring(1)),
         sURLVariables = sPageURL.split('&'),
         sParameterName,
         i;

      for (i = 0; i < sURLVariables.length; i++) {
         sParameterName = sURLVariables[i].split('=');
         if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
         }
      }
   }

   if(getUrlParameter('print')) {
      $('body').addClass('print-view');
   }

}

function setup_faq() {
	$('#faq .faqContainer ul li').click(function(){
		the_title = $(this).html();
		$('#faq-popup h3').html(the_title);
		$('#faq #blanket, #faq #faq-perspective, #faq #faq-popup').removeClass('hidden');
		disableScroll();
	});

	$('#faq #close-btn').click(function(){
		$('#faq #faq-popup').addClass('hidden');
		setTimeout(function(){
			$('#faq #faq-perspective, #faq #blanket').addClass('hidden');
		}, 300);
		enableScroll();
	});

}

//scrollTo
  ;(function(f){"use strict";"function"===typeof define&&define.amd?define(["jquery"],f):"undefined"!==typeof module&&module.exports?module.exports=f(require("jquery")):f(jQuery)})(function($){"use strict";function n(a){return!a.nodeName||-1!==$.inArray(a.nodeName.toLowerCase(),["iframe","#document","html","body"])}function h(a){return $.isFunction(a)||$.isPlainObject(a)?a:{top:a,left:a}}var p=$.scrollTo=function(a,d,b){return $(window).scrollTo(a,d,b)};p.defaults={axis:"xy",duration:0,limit:!0};$.fn.scrollTo=function(a,d,b){"object"=== typeof d&&(b=d,d=0);"function"===typeof b&&(b={onAfter:b});"max"===a&&(a=9E9);b=$.extend({},p.defaults,b);d=d||b.duration;var u=b.queue&&1<b.axis.length;u&&(d/=2);b.offset=h(b.offset);b.over=h(b.over);return this.each(function(){function k(a){var k=$.extend({},b,{queue:!0,duration:d,complete:a&&function(){a.call(q,e,b)}});r.animate(f,k)}if(null!==a){var l=n(this),q=l?this.y_contentWindow||window:this,r=$(q),e=a,f={},t;switch(typeof e){case "number":case "string":if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(e)){e= h(e);break}e=l?$(e):$(e,q);case "object":if(e.length===0)return;if(e.is||e.style)t=(e=$(e)).offset()}var v=$.isFunction(b.offset)&&b.offset(q,e)||b.offset;$.each(b.axis.split(""),function(a,c){var d="x"===c?"Left":"Top",m=d.toLowerCase(),g="scroll"+d,h=r[g](),n=p.max(q,c);t?(f[g]=t[m]+(l?0:h-r.offset()[m]),b.margin&&(f[g]-=parseInt(e.css("margin"+d),10)||0,f[g]-=parseInt(e.css("border"+d+"Width"),10)||0),f[g]+=v[m]||0,b.over[m]&&(f[g]+=e["x"===c?"width":"height"]()*b.over[m])):(d=e[m],f[g]=d.slice&& "%"===d.slice(-1)?parseFloat(d)/100*n:d);b.limit&&/^\d+$/.test(f[g])&&(f[g]=0>=f[g]?0:Math.min(f[g],n));!a&&1<b.axis.length&&(h===f[g]?f={}:u&&(k(b.onAfterFirst),f={}))});k(b.onAfter)}})};p.max=function(a,d){var b="x"===d?"Width":"Height",h="scroll"+b;if(!n(a))return a[h]-$(a)[b.toLowerCase()]();var b="client"+b,k=a.ownerDocument||a.document,l=k.documentElement,k=k.body;return Math.max(l[h],k[h])-Math.min(l[b],k[b])};$.Tween.propHooks.scrollLeft=$.Tween.propHooks.scrollTop={get:function(a){return $(a.elem)[a.prop]()}, set:function(a){var d=this.get(a);if(a.options.interrupt&&a._last&&a._last!==d)return $(a.elem).stop();var b=Math.round(a.now);d!==b&&($(a.elem)[a.prop](b),a._last=this.get(a))}};return p});
