/* 
 *  Universidade Federal do Espírito Santo
 *  Núcleo de Processamento de Dados
 *  Todos os direitos reservados
 
 *  Autor: Vicente Bissoli Sessa
 *  Contato: vicente.sessa@ufes.br
 */


var checkbox = {
    config: {
        selector: 'input[type=checkbox]',
        wrapperClass: 'checkbox-wrapper',
        wrapperElem: '<span>',
        wrapperSelector: '.checkbox-wrapper',
        virtualClass: 'checkbox',
        virtualElem: '<span>',
        virtualSelector: '.checkbox',
        hoverClass: 'hover',
        checkedClass: 'checked'
    },
    init: function() {
        return this.wrapper();
    },
    wrapper: function() {
        var cfg = this.config;
        $(cfg.selector).each(function() {
            $(this).after(cfg.virtualElem)
                .next().addClass(cfg.virtualClass);

            $(this).nextUntil(cfg.selector)
                .andSelf().wrapAll(cfg.wrapperElem)
                .parent().addClass(cfg.wrapperClass);
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
            var checkbox = $(this).children(cfg.selector),
                isChecked = checkbox.is(':checked');

            if (!isChecked) {
                $(this).addClass(cfg.checkedClass);
            } else {
                $(this).removeClass(cfg.checkedClass);
            }
            checkbox.prop('checked', !isChecked);
        });
        return this;
    }
};

jQuery(function($) {
    checkbox.init()
        .hover()
        .click();
});