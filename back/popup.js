$(function(){
    mainPopupShow();
});

function mainPopupShow(){

    if(site_popup['visible'] == true){
        var check_cookie = $.session.get('main_popup');
        
        // var check_cookie = undefined;
        var cookieMin = 60;
        var timeoutMs = site_popup['time']*1000;

        $('#popup__stock .popup-header__title').html(site_popup['title']);
        $('#popup__stock .popup-header__message').html(site_popup['description']);
        $('#popup__stock .button_orange').html(site_popup['button']);
        if (check_cookie == undefined) {
            var date = new Date();
            date.setTime(new Date().getTime() + cookieMin * 60 * 1000);
            $.session.set('main_popup', 'yes', {
            expires: date
            });

            var runPopup = function runPopup() {
            $.magnificPopup.open({
                items: {
                    src: '#popup__stock'
                },
                type: 'inline',
                preloader: false,
                focus: '#username',
                modal: true,
                callbacks: {
                open: function open() {
                    $('.mfp-bg').css({
                    background: '#e8f7ff',
                    opacity: '0.8'
                    });
                    $('.mfp-wrap').addClass('mfp-slideInUp');
                    var validator = $('.popup__form').validate({
                    errorClass: 'form__error',
                    rules: {
                        name: {
                        required: true,
                        minlength: 3
                        },
                        email: {
                        required: true,
                        email: true
                        },
                        phone: {
                        required: true,
                        minlength: 10
                        }
                    },
                    messages: {
                        name: {
                        required: 'Введите ваше Имя',
                        minlength: 'Минимальное количество символов - 3'
                        },
                        email: {
                        required: 'Введите ваш email',
                        email: 'Пожалуйста введите корректный почтовый адрес'
                        },
                        phone: {
                        required: 'Введите ваш номер телефона',
                        minlength: 'Минимальное количество символов - 10'
                        }
                    }
                    });
                },
                close: function close() {
                    $('.mfp-bg').css({
                    background: '#0b0b0b',
                    opacity: '0.8'
                    });
                }
                }
            });
            };

            setTimeout(runPopup, timeoutMs);
        }
    }
}
