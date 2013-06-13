/*
 *  @todo Criar botões com ícones. Mexer no padding e usar background image para renderizar a image. A url deve ser escificada no atributo data-icon="";
 *  @todo Criar o dropdown button customizado.
 *  @todo Criar slide toggle buttons baseados em http://bashooka.com/wp-content/uploads/2013/03/flat-ui-inspiration-58.jpg e em http://pinterest.com/pin/112871534383411673/
 *  @todo Ao fazer o toggle button, dar uma olhada no jquery ui para saber como fazer um bom plugin: Ex: Tabs. Ele não deve conflitar com o checkbox normal.
 */

var dropdownButton = {
    config: {
        button: "div.dropdown-button button, div.dropdown-button input[type=button]",
        caret: "div.dropdown-button input[type=button] span.caret",
        list: "div.dropdown-button ul"
    },
    init: function() {
        this.click();
    },
    click: function() {
        $(this.config.button).on('click', this.effects.click);
        $(document).on('click', {list: this.config.list}, this.removeVisibility);
        return this;
    },
    effects: {
        click: function(event) {
            var $button = $(event.target),
                clicked = $button.data('clicked');

            if (clicked === undefined) {
                clicked = false;
            }

            if (!clicked) {
                $button.addClass('pressed');
                $button.next('ul')
                    .show()
                    .children('li').each(function() {
                    dropdownButton.effects.fadeIn($(this));
                });
            } else {
                $button.removeClass('pressed');
                $.when($button.next('ul')
                    .children('li').each(function() {
                    dropdownButton.effects.fadeOut($(this));
                })).done(function() {
                    $(this).parent().hide();
                });
            }
            $button.data('clicked', !clicked);
        },
        fadeIn: function(elem) {
            elem.delay(parseInt(elem.index()) * 20).animate({
                duration: 20,
                'opacity': 1
            });
        },
        fadeOut: function(elem) {
            elem.delay(parseInt(elem.siblings().andSelf().size() - elem.index()) * 20).animate({
                duration: 20,
                'opacity': 0
            });
        }
    },
    removeVisibility: function(event) {
        $(event.data.list).children({
            duration: 100,
            complete: function() {
                $(this).hide();
            }
        });
    }
};

var iconButton = {
    selector: "button[data-icon]",
    init: function() {
        $(this.selector).each(function() {
            var bgImage = $(this).attr('data-icon');
            $('<span class="icon">').appendTo($(this)).css({
                'background-image': 'url(' + bgImage + ')',
                'background-position': 'center center',
                'background-repeat': 'no-repeat',
                'background-size': '16px'
            });
        });
    }
};

var toggleButton = {
    selector: 'span.toggle-button',
    init: function() {
        $(this.selector).data('clicked', false);
        $(this.selector).append('<span class="slider">').on('click', function() {
            var clicked = $(this).data('clicked');
            if (!clicked) {
                $(this).animate({
                    'backgroundColor': 'rgb(231, 76, 60)'
                }).children().animate({
                    'left': '30px'
                });
            } else {
                $(this).animate({
                    'backgroundColor': 'rgb(39, 174, 96)'
                }).children().animate({
                    'left': '2px'
                });
            }
            $(this).data('clicked', !clicked);
        });
    }
};

var button = {
    config: {
        selector: 'button, input[type=button], input[type=submit], input[type=reset]'
    },
    init: function() {
        this.hover()
            .click();
    },
    hover: function() {
        var cfg = this.config;
        $(cfg.selector).hover(function() {
            $(this).toggleClass('hover', 150);
        });
        return this;
    },
    click: function() {
        var cfg = this.config,
            elemPressed = null,
            offset = 3;

        $(cfg.selector).on('mousedown', function() {
            elemPressed = $(this);
            $(this).animate({
                'padding-top': '-=' + offset + 'px',
                'padding-right': '-=' + offset + 'px',
                'padding-bottom': '-=' + offset + 'px',
                'padding-left': '-=' + offset + 'px',
                'margin-top': '+=' + offset + 'px',
                'margin-right': '+=' + offset + 'px',
                'margin-bottom': '+=' + offset + 'px',
                'margin-left': '+=' + offset + 'px'
            }, 50);
        });

        $(document).on('mouseup', function() {
            if (elemPressed === null)
                return;

            elemPressed.animate({
                'padding-top': '+=' + offset + 'px',
                'padding-right': '+=' + offset + 'px',
                'padding-bottom': '+=' + offset + 'px',
                'padding-left': '+=' + offset + 'px',
                'margin-top': '-=' + offset + 'px',
                'margin-right': '-=' + offset + 'px',
                'margin-bottom': '-=' + offset + 'px',
                'margin-left': '-=' + offset + 'px'
            }, 50);
            elemPressed = null;
        });
        return this;
    }
};

jQuery(function($) {
    button.init();
//    buttonWithIcon.init();
//    iconButton.init();
//    toggleButton.init();
//    dropdownButton.init();
});
