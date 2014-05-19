(function($) {
    $.fn.raaccordion = function() {
        this.each( function() {
        	$(this).addClass('raccordion');
            $(this).children('div:first').addClass('raccordion-title');
            $(this).children('div').eq(1).addClass('raccordion-content');
            $(this).children('div.raccordion-title').addClass('arrow-up');
            $(this).children('div.raccordion-content').slideUp();
        });
        this.children('div.raccordion-title').click(function() {
             if($(this).hasClass('arrow-up')) {
            	 $(this).siblings('div').slideToggle();
                 $(this).removeClass('arrow-up');
                 $(this).addClass('arrow-down');
             } else {
                 $(this).siblings('div').slideToggle();
                 $(this).removeClass('arrow-down');
                 $(this).addClass('arrow-up');
            }
        });
        return this;
    };
}(jQuery));