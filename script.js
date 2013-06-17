$.fn.sarahsSlideToggle = function () {
	return this.each(function () {
		var $el = $(this);
		if ($el.is(':visible')) {
			$el.animate({ width: 0 }, 1000, function () {
				$el.hide();
			});
		} else {
			$el.css({ width: 0 });
			$el.show();
			$el.animate({ width: '100%' }, 1000);
		}	
	});
};
	
$(document).ready(function() {
	var $contactForm = $('#contact-form');
	$.get('http://courier.crbapps.com/wake');

    $(".envelope").click(function(e) {
        e.preventDefault();
        $(".contact").sarahsSlideToggle();
    });

	$contactForm.submit(function (e) {
        e.preventDefault();
      	$('#submit-contact').after($('<div class="processing">Sending&hellip;</div>')).remove();
		$.ajax({
	      dataType: 'JSONP',
	      url: 'http://courier.crbapps.com/send',
	      data: $contactForm.serialize(),
	      success: function (response) {
		    $contactForm.slideUp(500, function() {
		      $contactForm.after("<div class='response'>" + response + "</div").remove();
		    });
	      }
	    });
	});	    	
});
