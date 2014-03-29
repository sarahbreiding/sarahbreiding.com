(function () {

  $.fn.sarahsSlideToggle = function () {
    return this.each(function () {
      var $el = $(this);
      if ($el.is(':visible')) {
        $el.animate({ width: 0 }, 750, function () {
          $el.hide();
        });
      } else {
        $el.css({ width: 0 });
        $el.show();
        $el.animate({ width: '100%' }, 750);
      }
    });
  };

  var $contactForm = $('#contact-form');

  var sendMessage = function () {
    return $.ajax({
      type: 'POST',
      dataType: 'JSON',
      url: 'http://courier.crbapps.com',
      data: $contactForm.serialize()
    });
  };

  $(".envelope").click(function(e) {
    e.preventDefault();
    $(".contact").sarahsSlideToggle();
  });

  $contactForm.submit(function (e) {
    e.preventDefault();

    $('#submit').after($('<div class="processing">Sending&hellip;</div>')).remove();

    sendMessage().then(function () {
      $contactForm.slideUp(500, function() {
        $contactForm.after("<div class='response'>Your message has been sent - Thank you!</div").remove();
      });
    });
  });

}());
