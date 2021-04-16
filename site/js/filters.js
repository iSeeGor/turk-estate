$(function () {
    var currency = "EUR";
    activeDistrict();
    sendRequest();
    formTabsClick();
    paginationClick();
    submitForm();
    popstateClick();
    currencyClick();

})

function submitForm(){
    $('.search-form').submit(function(e){
        e.preventDefault();
        generateUrl();
    });
}

function paginationClick(){
    $(document).on('click', '.pagination__list a', function(e){
        e.preventDefault();
        $('html,body').animate({
            scrollTop: $(".filter-bar").offset().top
        }, 'slow');
        var page = $(this).attr('href').split('page=')[1];
        generateUrl(page);
    });
}

function formTabsClick(){
    $(document).on('click', '.search-form__tab_current', function () {
        // $(this).removeClass('search-form__tab_current');
        generateUrl();
    })
}

function popstateClick(){
    $(window).on('popstate', function (event) {
        event.preventDefault();
        $.ajax({
            type: 'GET',
            url: window.location.href,
            cache: false,
            success: function (response) {
                $('.property-view__grid .row').empty().html(response.objects);
                $('.property-view__pagination .container').empty().html(response.pagination);
                $(document).find('.pagination').mgPgnation();
                $('.filter-bar__view-count').empty().html(response.object_count);
                lazyLoadImage();
            },
        })
    });
}

function activeDistrict() {
    let city = $(".select-city").val();
    if (city != '' && city != undefined) {
        $('.district .nice-select').removeClass('disabled');
        $('.select-district').removeAttr('disabled');
    }
    $(".select-city").change(function (e) {
        $('.preloader').css('display', 'flex');
        let city = $(this).val();
        if (city != '' && city != undefined) {
            $('.district .nice-select').removeClass('disabled');
            $('.select-district').removeAttr('disabled');
            $.ajax({
                type: "GET",
                url: '/district/'+city,
                datatype: "html",
                cache: false,
                success: function (response) {
                    let string = '<option selected value="">Все районы</option>';
                    response.map(function(e){
                        string += '<option value="'+e.slug+'">'+e.name+'</option>'
                    });
                    $('.nice-select').remove()
                    $('.select-district').empty().html(string);
                    $('.select').niceSelect();
                    generateUrl();
                },
            })
        }
        else {
            selectDefaultDistrict();
            generateUrl();
        }
    });
}

function selectDefaultDistrict(){
    $('.district .nice-select').addClass('disabled');
    $('.select-district').attr('disabled', 'true');
    $('.district .nice-select .current').html($('.district .nice-select ul>li:first').text());
    $('.district .nice-select ul').find('li').removeClass('selected')
    $('.district .nice-select ul>li:first').addClass('selected');
    $('.select-district').find('option').removeAttr('selected');
    $('.select-district option:first').attr('selected', 'true');
}

function sendRequest() {

    $(document).on('click', '.search-form__tab:not(.search-form__tab_current)',function () {
        $('.search-form__tab').removeClass('search-form__tab_current');
        $(this).addClass('search-form__tab_current');

        generateUrl();
    })

    $('.search-form').on('change', '.select:not(.select-city)', function () {
        generateUrl();
    });

    $('.select[name="sort"]').change(function(){
        generateUrl();
    });
}


function ajaxQuery(url) {
    $('.preloader').css('display', 'flex');
    // if($('.property-view').width() > 768){
        // $('.preloader').css('width', $('.property-view').width());
        // $('.preloader').css('height', $('.property-view').height());
    // }
    $.ajax({
        type: "GET",
        url: url,
        datatype: "html",
        data: {'currency': this.currency},
        cache: false,
        success: function (response) {
            history.pushState('', '', url);
            $('.preloader').css('display', 'none');
            $('.filter-bar__view-count').empty().html(response.object_count);
            $('.property-view__grid .row').empty().html(response.objects);
            $('.property-view__pagination .container').empty().html(response.pagination);
            $(document).find('.pagination').mgPgnation();
            $(document).prop('title', response.title);
            $("meta[name='description']").attr('content', response.description);
            $("meta[name='keywords']").attr('content', response.keywords);
            $('.catalog-text').empty().html(response.seo_text);
            $('.page-title').empty().html(response.header);
            lazyLoadImage();
            ym(61583263, 'hit', url);
            gtag('config', 'UA-162543148-1', {'page_path': url});
        },
    })

}

function generateUrl(page = null) {
    let link        = $(document).find('.search-form').attr('action');
    let status      = $('.search-form__tab_current .search-form__tab-name').attr('data-value');
    let data        = $(document).find('.search-form .select').serializeArray();
    let price_from  = $('.search-form input[name="price_from"]').val();
    let price_to    = $('.search-form input[name="price_to"]').val();
    let id          = $('.search-form input[name="object_id"]').val();
    let sort        = $('.select[name="sort"]').val();

    if(location.pathname == '/favorites'){
        link = $('.nav__wishlist-btn').attr('href');
    }

    if (status != undefined) {
        link += '/' + status + '_status';
    }

    data.map(function (e) {
        if (e.value != '') {
            link += '/' + e.value + '_' + e.name ;
        }
    });

    if(price_from != undefined && price_to != undefined){
        link = setQueryParameters(link, 'price_from', price_from.replace(' ', ''));
        link = setQueryParameters(link, 'price_to', price_to.replace(' ', ''));
    }
    link = setQueryParameters(link, 'object_id', id);
    link = setQueryParameters(link, 'sort', sort);

    if(page){
        link = setQueryParameters(link, 'page', page);
    }

    if(location.pathname == '/'){
        window.location.replace(link['href']);
    }

    ajaxQuery(link);
}

function setQueryParameters(link, key, value){
    var url = new URL(link);
    if(value != '' && value != undefined){
        if(url.searchParams.has(key)){
            url.searchParams.set(key, value);
        }
        else{
            url.searchParams.append(key, value);
        }
    }
    return url;
}

function currencyClick(){
    $(document).on('click','.currency-list',function(){
        currency = $(this).text();
        ajaxQuery(location.href);
    })
}
