$(function(){
    changeCurrency();
    $('.print__button').click(function(){
        window.print();
    })
    imageSlider();
    stickyTabs();
    sideTeamCarousel();
});

function changeCurrency(){
    $('.meta-dropdown__list-item').click(function(){
        let text = $(this).find('span').text();
        console.log(text);
        $('.preloader').css('display', 'flex');
        $.ajax({
            type: 'GET',
            url: window.location.href,
            data: {'currency': text},
            cache: false,
            success: function(response){
                $('.preloader').css('display', 'none');
            }
        });
        let header_value = $('.page-header__item').find("li:contains('"+text+"')").attr('data-price');
        $('.meta-dropdown').find('li').removeClass('meta-dropdown__list-item_current');
        let list = $('.meta-dropdown').find("li:contains('"+text+"')").addClass('meta-dropdown__list-item_current');
        for(let i = 0; i < list.length; i++){
            let value = $(list[i]).attr('data-price');
            $(list[i]).closest('.property-card__header-meta').find('.property-card__price').html(value);
        }
        $('.property-header__price').html(header_value);
        $('.property-card__header-meta .meta-dropdown__button').html(text);
        $('.page-header__item .meta-dropdown__button').html(text);


        // $('.property-header__price').empty().html(value);
    });
}

const imageSlider = () => {
    let sliderSelector = '.slider-container',
        thumbsSelector = '.thumb-container';

    let slidesOptions = {
        wrapperClass: 'slider-wrapper',
        slideClass: 'slider-item',
        spaceBetween: 20,
        loop: true,
        loopedSlides: 5,
        navigation: {
            nextEl: '.slider-btn__next',
            prevEl: '.slider-btn__prev'
        }
    };

    let thumbOptions = {
        wrapperClass: 'thumb-wrapper',
        slideClass: 'thumb-item',
        spaceBetween: 10,
        // centeredSlides: true,
        slidesPerView: 4,
        touchRatio: 0.2,
        slideToClickedSlide: true,
        loop: true,
        loopedSlides: 5,
        direction: 'vertical'
    };

    let thumbSlider = new Swiper(thumbsSelector, thumbOptions);
    let imageSlider = new Swiper(sliderSelector, slidesOptions);

    imageSlider.controller.control = thumbSlider;
    thumbSlider.controller.control = imageSlider;

    // Popup For Single Image
    $('.slider-item a')
        .not('.swiper-slide-duplicate a')
        .magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });
};

const stickyTabs = () => {
    let $window = $(window);
    let $sidebar = $('.p-sidebar__item_sticky');
    let $sidebarHeight = $sidebar.innerHeight();
    let $footerOffsetTop = '';
    let $sidebarOffset = $sidebar.offset();

    

    let stickyRun = () => {
        $window.scroll(function() {
            if ($window.scrollTop() + 140 >= $sidebarOffset.top) {
                $sidebar.addClass('fixed');
            } else {
                $sidebar.removeClass('fixed');
            }
            if ($window.scrollTop() + $sidebarHeight > $footerOffsetTop - 105) {
                $sidebar.css({
                    top: -(
                        $window.scrollTop() +
                        $sidebarHeight -
                        $footerOffsetTop -
                        55
                    )
                });
            } else {
                $sidebar.css({ top: '140px' });
            }
        });
    };

    $(window).resize(function(){
        $footerOffsetTop = $('.property-page__cb-form').offset().top;

        if(window.matchMedia('(min-width:1024px)').matches){
            stickyRun();
            $sidebar.css('position', '');

        } else {
            $sidebar.css('position', 'inherit');
        }
    }).resize();

};

const sideTeamCarousel = () => {
    const breakpoint = window.matchMedia('(min-width:992px)');
    let teamSlider;
    let teamList = document.querySelectorAll('.team-card_simple');
    // let sliderSelector = '.sidebar__team';


    let breakpointChecker = function() {
        // if (breakpoint.matches === true) {
        //     return enableSlider();
            
        // } else if (breakpoint.matches === false) {
        //     if (teamSlider !== undefined) teamSlider.destroy(true, true);
            
        //     return;
        // }

        if(window.innerWidth <= 991.98 && teamList.length >= 3){
            return enableSlider();

        } else if(window.innerWidth <= 520 && teamList.length >= 2){
            return enableSlider();

        } else {

            if (teamSlider !== undefined) teamSlider.destroy(true, true);
            
            return;
        }
    };

    

    const enableSlider = function() {
        teamSlider = new Swiper ('.sidebar__team', {
            wrapperClass: 'sidebar__team-wrapper',
            slideClass: 'team-card_simple',
            speed: 600,
            slidesPerView: 2,
            spaceBetween: 30,
            threshold: 10,
            navigation: {
                nextEl: '.sidebar__team .property-slider__button-next',
                prevEl: '.sidebar__team .property-slider__button-prev'
            },
            scrollbar: {
                el: '.sidebar__team .property-slider__scrollbar',
                draggable: true
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 1,
                    spaceBetween: 60
                },

                575: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
    
                767: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
            }
        });
    };

    breakpoint.addListener(breakpointChecker);
    breakpointChecker();

};