jQuery(function ($) {

    var Contact = {

        init : function () {
            this.$contactForm = $('#contact-form');
            this.inputs = $('.contact-input').map(function () {
                return new Input(this);
            });

            this.addEvents();
        },

        addEvents : function () {
            this.$contactForm.on('submit', $.proxy(this.onSubmit, this));
        },

        onSubmit : function (e) {
            e.preventDefault();

            if( this.inputsValid() && !$('.processing').length ) {
                this.$contactForm
                    .find('button')
                        .after( $('<div class="processing" />') )
                        .remove();
                this.sendMessage();
            }
        },

        inputsValid : function () {
            var allValid = true;

            // gonna be lazy and just make sure it's not blank
            this.inputs.each(function () {
                var inputValid = this.validate();

                if ( !inputValid ) {
                    allValid = false;
                }
            });

            return allValid;
        },

        errorTemplate : function (error) {
            return '<div class="error-message">Please enter ' + error + '.</div>';
        },

        sendMessage : function () {
            $.ajax({
                type : 'POST',
                url : '/send-message',
                data : this.$contactForm.serialize(),
                success : $.proxy( this.close, this)
            });
        },

        close : function (response) {
            this.$contactForm.slideUp(500, $.proxy(function () {
                this.$contactForm
                    .after(response)
                    .remove();
            }, this));
        }

    };

    var Input = function (el) {
        this.$el = $(el)
                    .on('focus', $.proxy(this.onFocus, this))
                    .on('blur', $.proxy(this.onBlur, this));

        this.onBlur();
    };

    Input.prototype = {

        onFocus : function () {
            if ( !this.isValid() ) {
                this.$el.val('');
            } else {
                this.$el.select();
            }
        },

        onBlur : function (e) {
            if ( this.isValid() ) {
                this.$el.removeClass('default');
                this.removeError();
            } else {
                this.$el
                    .val( this.$el.attr('title') )
                    .addClass('default');
            }
        },

        validate : function () {
            if( !this.isValid() ) {
                this.addError();
                return false;
            }
            return true;
        },

        isValid : function () {
            return this.$el.val() !== '' && this.$el.val() !== this.$el.attr('title');
        },

        addError : function () {
            var name = this.$el.attr('name'),
                error = (name === "message" ? ' a ' : ' your ') + name;

            this.$el.closest('fieldset')
                .addClass('error')
                .append( Contact.errorTemplate(error) );
        },

        removeError : function () {
            this.$el
                .closest('.error')
                    .removeClass('error')
                        .find('.error-message')
                            .remove();
        }

    };

    Contact.init();

}(jQuery));