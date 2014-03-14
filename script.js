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

  var reverse = function(word) {
    return word.split('').reverse().join('');
  };

  var $contactForm = $('#contact-form');

  var messageData = function () {
    var name = $('#name').val();
    var email = $('#email').val();
    var message = $('#message').val();

    return {
      key: 'rPNtGh3XdGX45uKEpeZGjA',
      template_name: 'website-contact-form',
      template_content: [
        { name: 'contact-name', content: name },
        { name: 'contact-email', content: email },
        { name: 'contact-message', content: message }
      ],
      message: {
        from_name: name,
        from_email: email,
        to: [{ email: [reverse('haras.gnidierb'), reverse('moc.liamg')].join('@') }]
      }
    };
  };

  var sendMessage = function () {
    return $.ajax({
      type: 'POST',
      dataType: 'JSON',
      url: 'https://mandrillapp.com/api/1.0/messages/send-template.json',
      data: messageData()
    });
  };

  $(function() {

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

  });

}());
