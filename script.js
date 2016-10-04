(function () {
  $('.contact-handle').click(function(){
    $('.contact-form-section').toggleClass('slideUp slideDown');
    $('.hidden-contact-section').slideToggle();
  })

  $('.flex-item-1').click(function(){
    $(this).toggleClass('showAboutText');
    $('.flex-item-2').toggleClass('hideSocialMedia');
    $('.about-text').slideToggle('slow');
  });

  $('.flex-item-4').click(function(){
    $(this).toggleClass('showWorkExamples');
    $('.flex-item-4 h1').toggleClass('moveWorkHeader');
    $('.flex-item-3').toggleClass('hideRubyTop');
    $('.work-examples').slideToggle('slow');
  })

  $('.flex-item-4 img').click(function(){
    var imgName = $(this).attr('class');
    $('#' + imgName).show();
    $('.light-box').click(function(){
      $('.light-box').hide();
    })
  })

  var $contactForm = $('#contact-form');

  var sendMessage = function () {
    return $.ajax({
      type: 'POST',
      dataType: 'JSON',
      url: 'http://courier.crbapps.com',
      data: $contactForm.serialize()
    });
  };

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
