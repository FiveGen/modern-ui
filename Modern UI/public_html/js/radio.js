/* 
 *  Universidade Federal do Espírito Santo
 *  Núcleo de Processamento de Dados
 *  Todos os direitos reservados
 
 *  Autor: Vicente Bissoli Sessa
 *  Contato: vicente.sessa@ufes.br
 */


var radio = {
    config: {
        selector: 'input[type=radio]',
        wrapperClass: 'radio-wrapper',
        wrapperElem: '<span>',
        wrapperSelector: '.radio-wrapper',
        virtualRadioClass: 'radio',
        virtualRadioElem: '<span>',
        virtualRadioSelector: '.radio-wrapper .radio'
    },
    init: function() {
        this.wrap()
            .hover()
            .click();
    },
    wrap: function() {
        $(this.config.selector).each(function() {
            $(this).after(radio.config.virtualRadioElem).next().addClass(radio.config.virtualRadioClass);
            $(this).nextUntil(radio.config.selector).andSelf()
                .wrapAll(radio.config.wrapperElem).parent().addClass(radio.config.wrapperClass);
        });
        return this;
    },
    hover: function() {
        $(this.config.wrapperSelector).hover(function() {
            $(this).children(radio.config.virtaulRadioSelector).addClass('hover');
        }, function() {
            $(this).children(radio.config.virtaulRadioSelector).removeClass('hover');
        });
        return this;
    },
    click: function() {
        $(this.config.wrapperSelector).on('click', function() {
            $(this).siblings(radio.config.wrapperSelector)
                .children(radio.config.virtualRadioSelector).removeClass('checked')
                .siblings(radio.config.selector).prop('checked', false);

            $(this).children(radio.config.virtualRadioSelector).addClass('checked')
                .siblings(radio.config.selector).prop('checked', true);
        });
        return this;
    }
};

jQuery(function($) {
    radio.init();
});