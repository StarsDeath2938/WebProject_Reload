$(() => {

    let elementCount = 0;
    let elementHeight = $('.list_frame').children('div').height();

    $(window).on('scroll', () => {

        if ($('.list_frame').children('div').eq(elementCount).length == 0) {
            return;
        }

        while (Math.floor($('.list_frame').children('div').eq(elementCount).offset().top - $(document).scrollTop() - $(window).height() + elementHeight / 3) < 0) {
            elementCount += 3;
            elementCount >= $('.list_frame>div').length ? elementCount = $('.list_frame>div').length : null;
            $('.list_frame').children(`div:lt(${elementCount})`).children('.img_effect').animate({ 'opacity': 1 }, 'fast');
            if ($('.list_frame').children('div').length == elementCount) { break; }
        }

    });

});