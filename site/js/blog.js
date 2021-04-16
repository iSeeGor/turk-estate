$(function(){
    newsCategory();
    popstateClick();
    paginationClick();
    anchorScroll();
})

function newsCategory(){
    $('.posts-categories__item').click(function(e){
        $('.preloader').css('display', 'flex');
        $('.posts-categories__list').find('.posts-categories__item_active').removeClass('posts-categories__item_active');
        $(this).addClass('posts-categories__item_active');
        let url = $(this).attr('data-url');

        $.ajax({
            type: "GET",
            url: url,
            datatype: "html",
            cache: false,
            success: function (response) {
                successQuery(response, url);
            },
        });
    });
}
function popstateClick(){
    $(window).on('popstate', function (event) {
        event.preventDefault();
        $.ajax({
            type: 'GET',
            url: window.location.href,
            cache: false,
            success: function (response) {
                $('.posts-view__list').empty().html(response.news_view);
                $('.posts-view__pagination').empty().html(response.pagination);
                $(document).find('.pagination').mgPgnation();
                lazyLoadImage();
            },
        })
    });
}
function paginationClick(){
    $(document).on('click', '.pagination__list a', function(e){
        e.preventDefault();
        $('.preloader').css('display', 'flex');
        $('html,body').animate({
            scrollTop: $(".page-header__deco-block").offset().top
        }, 'slow');
        var page = $(this).attr('href');
        $.ajax({
            type: "GET",
            url: page,
            datatype: "html",
            cache: false,
            success: function (response) {
                successQuery(response, page);
            },
        });
    });
}

function successQuery(response, url){
    history.pushState('', '', url);
    $('.preloader').css('display', 'none');
    $('.posts-view__list').empty().html(response.news_view);
    $('.posts-view__pagination').empty().html(response.pagination);
    $(document).find('.pagination').mgPgnation();
    $(document).prop('title', response.seo_title);
    $("meta[name='description']").attr('content', response.seo_description);
    if (response.header !== ''){
        $('.page-title').text(response.header);
    }
    lazyLoadImage();
    ym(61583263, 'hit', url);
    gtag('config', 'UA-162543148-1', {'page_path': url});
}

const anchorScroll = () => {

    $('.typography a[href*="#a_"]:not([href="#"])').click(function() {
        if (
            location.pathname.replace(/^\//, '') ===
                this.pathname.replace(/^\//, '') &&
            location.hostname === this.hostname
        ) {
            let target = $(this.hash);
            if (target.length) {
                $('html, body').animate(
                    {
                        scrollTop: target.offset().top - 160
                    },
                    800
                );
                return false;
            }
        }
    });
};