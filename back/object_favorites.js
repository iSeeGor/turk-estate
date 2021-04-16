$(function () {
    favorites();
})

function favorites() {
    $(document).on('click', '.to-favorit__button', function (e) {
        e.preventDefault();

        let cookie = Cookies.getJSON('favorites');
        if (!cookie) {
            cookie = [];
        }

        let id = $(this).attr('data-id');
        let find = cookie.find(function (e) {
            return e === id;
        })

        if (!find) {
            cookie.push(id);
            $(this).addClass('to-favorit__button_active');
        } else {
            cookie = $.grep(cookie, function (value) {
                return value != id;
            });
            $(this).removeClass('to-favorit__button_active');
        }

        cookie = $.grep(cookie, function (value) {
            return value != null;
        });

        $('.nav__wishlist-count span').html(cookie.length);

        Cookies.set('favorites', cookie, { expires: 365, path: '/' });
    })
}
