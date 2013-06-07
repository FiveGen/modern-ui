
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

jQuery(function() {
    iconButton.init();
    toggleButton.init();
    dropdownButton.init();
});