var navigation = responsiveNav('#site-nav', {
	animate: true,
	transition: 200,
	label: '<i class='fa fa-bars'></i> Menu',
	insert: 'before',
	customToggle: '',
	openPos: 'relative',
	jsClass: 'js',
	init: function() {},
	open: function() {},
	close: function() {}
});

$('html').click(function() {
	if ($(navigation.wrapper).hasClass('opened')) {
		navigation.toggle();
	}
});

$('#site-nav').click(function(event) {
	event.stopPropagation();
});

$(function() {
	$('article').fitVids();
});

$('a[href$=".jpg"],a[href$=".jpeg"],a[href$=".JPG"],a[href$=".png"],a[href$=".gif"]').addClass('image-popup');

$(document).ready(function() {
	$('.image-popup').magnificPopup({
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0, 1]
		},
		image: {
			tError: '<a href="%url%"">Image #%curr%</a> could not be loaded.',
		},
		removalDelay: 300,
		mainClass: 'mfp-fade'
	});
});