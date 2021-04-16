$(function(){

    $('.print__button').click(function(){
        ym(61583263,'reachGoal','print');
        gtag('event', 'click', {
            'event_category': 'print',
            });
    });

    $('.goal_faq_button').click(function(){
        ym(61583263,'reachGoal','faq_button_click');
        gtag('event', 'button_click', {
            'event_category': 'faq',
            });
    });
    $('.header_callback_button').click(function(){
        ym(61583263,'reachGoal','header_callback_button')
        gtag('event', 'button_click', {
            'event_category': 'header_callback_button',
            });
    });

});