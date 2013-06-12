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
        virtualRadioSelector: '.radio',
        hoverClass: 'hover',
        checkedClass: 'checked'
    },
    init: function() {
        return this.wrapper();
    },
    wrapper: function() {
        var cfg = this.config;
        $(cfg.selector).each(function() {
            $(this).after(cfg.virtualRadioElem).next().addClass(cfg.virtualRadioClass)
                .end().nextUntil(cfg.selector).andSelf()
                .wrapAll(cfg.wrapperElem).parent().addClass(cfg.wrapperClass);

            if ($(this).is(':checked')) {
                $(this).parent(cfg.wrapperSelector).addClass(cfg.checkedClass);
            }
        });
        return this;
    },
    hover: function() {
        var cfg = this.config;
        $(cfg.wrapperSelector).hover(function() {
            $(this).toggleClass(cfg.hoverClass);
        });
        return this;
    },
    click: function() {
        var cfg = this.config;
        $(cfg.wrapperSelector).children().on('click', function(e) {
            e.preventDefault();
        });
        $(cfg.wrapperSelector).on('click', function() {
            $(this).siblings(cfg.wrapperSelector)
                .removeClass(cfg.checkedClass)
                .children(cfg.selector).prop('checked', false);

            $(this).addClass(cfg.checkedClass)
                .children(cfg.selector).prop('checked', true);
        });
        return this;
    }
};

jQuery(function($) {
    radio.init()
        .hover()
        .click();
});