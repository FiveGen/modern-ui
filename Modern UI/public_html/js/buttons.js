/*
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
        selector:
            'button, ' +
            'input[type=button], ' +
            'input[type=submit], ' +
            'input[type=reset]'
    },
    init: function() {
        this.hover()
            .click();
    },
    hover: function() {
        $(this.config.selector).hover(function() {
            $(this).toggleClass('hover', 150);
        });
        return this;
    },
    click: function() {
        var elemPressed = null,
            paddingOffset = 2;

        $(this.config.selector).on('mousedown', function() {
            var height = $(this).css('height'),
                width = $(this).css('width');

            elemPressed = $(this);
            elemPressed.css({
                'height': height,
                'width': width
            }).animate({
                'padding': '-=' + paddingOffset,
                'borderWidth': paddingOffset
            }, 50);
        });

        $(document).on('mouseup', function() {
            if (elemPressed === null)
                return;

            elemPressed.animate({
                'padding': '+=' + paddingOffset,
                'borderWidth': 0
            }, 50);
            elemPressed = null;
        });
        return this;
    }
};

var iconButton = {
    config: {
        selector:
            'input[type=button][data-icon], ' +
            'input[type=submit][data-icon], ' +
            'input[type=reset][data-icon], ' +
            'button[data-icon]'
    },
    init: function() {
        $(this.config.selector).each(function() {
            var cssMod = $.extend(iconButton.getCssMod($(this)), {
                'background-image': 'url(' + $(this).attr('data-icon') + ')',
                'background-repeat': 'no-repeat'
            });

            $(this).css(cssMod);
        });
    },
    getCssMod: function(elem) {
        var paddingLeft,
            backgroundSize,
            backgroundPosition;

        if (elem.hasClass('smaller')) {
            paddingLeft = 22;
            backgroundSize = 12;
            backgroundPosition = 5;
        } else if (elem.hasClass('small')) {
            paddingLeft = 30;
            backgroundSize = 16;
            backgroundPosition = 7;
        } else if (elem.hasClass('big')) {
            paddingLeft = 52;
            backgroundSize = 24;
            backgroundPosition = 14;
        } else if (elem.hasClass('bigger')) {
            paddingLeft = 64;
            backgroundSize = 32;
            backgroundPosition = 16;
        } else {
            paddingLeft = 40;
            backgroundSize = 20;
            backgroundPosition = 10;
        }
        return {
            'padding-left': paddingLeft,
            'background-size': backgroundSize,
            'background-position': backgroundPosition + 'px center'
        };
    }
};

jQuery(function($) {
    button.init();
    iconButton.init();
//    toggleButton.init();
//    dropdownButton.init();
});
