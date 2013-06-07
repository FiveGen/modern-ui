/* 
 *  Universidade Federal do Espírito Santo
 *  Núcleo de Processamento de Dados
 *  Todos os direitos reservados
 
 *  Autor: Vicente Bissoli Sessa
 *  Contato: vicente.sessa@ufes.br
 */

(function($) {
    $.fn.toggleSwitch = function(settings) {
        var config = {
            'class': 'toggle-switch-wrapper',
            'checked': true,
            'value': 'teste'
        };
        if (settings) {
            $.extend(config, settings);
        }

        return this.each(function() {

            var build = function(elem) {
                var $this = elem,
                    $checkbox,
                    $toggleSwitch;

                $this.addClass(config.class)
                    .append('<span class="toggle-switch">')
                    .append('<input id="' + $this.attr('id') + '"type="checkbox" name="' + config.name + '" value="' + config.value + '" />')
                    .append('<label for="' + $this.attr('id') + '">' + config.label + '</label>');

                $checkbox = $this.children(':eq(1)');
                $toggleSwitch = $this.children(':first');

                if (config.checked) {
                    $checkbox.prop('checked', true);
                    $toggleSwitch.addClass('on');
                } else {
                    $checkbox.prop('checked', false);
                    $toggleSwitch.addClass('off');
                }

                $toggleSwitch.append('<span class="switch">');
            };

            var init = function(elem) {
                var $this = elem;
                $this.on('click', function() {
                    var checked = $(this).children('input[type=checkbox]').is(':checked'),
                        $toggleSwitch = $(this).children(':first');

                    if (checked) {
                        $toggleSwitch.animate({
                            'borderColor': 'rgb(192, 57, 43)'
                        }).children().animate({
                            'backgroundColor': 'rgb(231, 76, 60)',
                            'left': '38px'
                        }).end().toggleClass('on off');
                    } else {
                        $toggleSwitch.animate({
                            'borderColor': 'rgb(39, 174, 96)'
                        }).children().animate({
                            'backgroundColor': 'rgb(46, 204, 113)',
                            'left': '2px'
                        }).end().toggleClass('on off');
                    }
                    $this.children('input[type=checkbox]').prop('checked', !checked);
                });
            };

            build($(this));
            init($(this));
        });
    };
})(jQuery);

