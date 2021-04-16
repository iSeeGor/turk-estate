$(function(){
    changeCurrency();
});

function changeCurrency(){
    $(document).on('click', '.meta-dropdown__list-item', function(){
        let text = $(this).text();
        $('.preloader').css('display', 'flex');
        $.ajax({
            type: 'GET',
            url: window.location.href,
            data: {'currency': text},
            cache: false,
            success: function(response){
                $('.bestseller-section .property-slider__body').empty().html(response.hot);
                $('.newPropertys-section .property-slider__body').empty().html(response.new);
                $('.preloader').css('display', 'none');
                propertySLider();
                lazyLoadImage();
            },
        });
    });
}