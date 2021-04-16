$(function(){
    categoryRequest();
    paginationClick();
})

function categoryRequest(){

    $('.posts-categories__item').click(function(){
        let url = '/faq';
        $('.preloader').css('display', 'flex');
        if($(this).hasClass('posts-categories__item_active')){
            $(this).removeClass('posts-categories__item_active');
        }
        else{
            $('.posts-categories__item').removeClass('posts-categories__item_active');
            $(this).addClass('posts-categories__item_active');
            let category = $(this).attr('data-slug');
            url = '/faq/'+category;
        }

        $.ajax({
            type: "GET",
            url: url,
            cache: false,
            datatype: 'html',
            success: function(response){
                history.pushState('', '', url);
                $('.preloader').css('display', 'none');
                $('.faq_content').empty().html(response.view);
                $('.accordion__pagination').empty().html(response.pagination);
                $(document).find('.pagination').mgPgnation();
                $(document).prop('title', response.title);
                $("meta[name='description']").attr('content', response.description);
                $("meta[name='keywords']").attr('content', response.keywords);
            }
        });
    });

}

function paginationClick(){
    $(document).on('click', '.pagination__list a', function(e){
        e.preventDefault();
        $('.preloader').css('display', 'flex');
        $('html,body').animate({
            scrollTop: $(".faq-content__text").offset().top
        }, 'slow');
        var page = $(this).attr('href');
        $.ajax({
            type: "GET",
            url: page,
            datatype: "html",
            cache: false,
            success: function (response) {
                history.pushState('', '', page);
                $('.preloader').css('display', 'none');
                $('.faq_content').empty().html(response.view);
                $('.accordion__pagination').empty().html(response.pagination);
                $(document).find('.pagination').mgPgnation();
            },
        });
    });
}
