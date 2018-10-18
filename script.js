(function () {
  $('.mail-button').click(function(e){
    e.preventDefault();

    $('.contact-form-section').toggleClass('hidden');
  })

  $('.close-form').click(function(e){
    e.preventDefault();

    $('.contact-form-section').toggleClass('hidden');
  });

  var $contactForm = $('#contact-form');

  $contactForm.submit(function(e){
    e.preventDefault();

    $('#submit').after($('<div class="processing">Sending&hellip;</div>')).remove();

   // $.post($contactForm.attr('action'), $contactForm.serialize()).then(function () {
      $contactForm.slideUp(500, function() {
        $contactForm.after("<div class='response'>Your message has been sent - Thank you!</div").remove();
      });
    //});
  });

}());
