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
        virtualSelector: '.checkbox-wrapper .checkbox',
        hoverClass: 'hover',
        checkedClass: 'checked'
    },
    init: function() {
        this.wrap()
            .hover()
            .click();
    },
    wrap: function() {
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
            $(this).children(cfg.virtualSelector).addClass(cfg.hoverClass);
        }, function() {
            $(this).children(cfg.virtualSelector).removeClass(cfg.hoverClass);
        });
        return this;
    },
    click: function() {
        var cfg = this.config;
        $(cfg.wrapperSelector).on('click', function() {
            var checkbox = $(this).children(cfg.selector),
                checked = checkbox.is(':checked'),
                virtualCheckbox = checkbox.siblings(cfg.virtualSelector);

            console.log(checked);
            if (checked) {
                virtualCheckbox.removeClass(cfg.checkedClass);
            } else {
                virtualCheckbox.addClass(cfg.checkedClass);
            }

            checkbox.prop('checked', !checked);
        });
        return this;
    }
};

jQuery(function($) {
    checkbox.init();
});