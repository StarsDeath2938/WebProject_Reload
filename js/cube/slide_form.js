$(() => {
    let isMoving = false;
    let targetElement = null;

    function formAction(Element) {
        if (Element == null) { return };
        Element.parents('[formTarget]').children('input').val(
            (Math.floor(Element.position().left / (Element.parent('.prop_scroll_box').width() - Element.outerWidth()) * 100) - 2) / 100
        );
    };

    function setOpacity() {
        $('[binding=outerBox]').css({ 'opacity': $('[formTarget=outerBox]').find('[mappingValue=Opacity]').val() });
        $('[binding=innerBox]').css({ 'opacity': $('[formTarget=innerBox]').find('[mappingValue=Opacity]').val() });
    };

    $('.scroll_btn').on('mousedown', function (e) {
        isMoving = true;
        targetElement = $(this);
    });

    $('.prop_scroll_box').on('mousemove', function (e) {
        if (isMoving) {
            let eOffset = e.pageX - $(this).offset().left;
            eOffset < targetElement.outerWidth() / 2 ? eOffset = targetElement.outerWidth() / 2 : null;
            if (eOffset > $(this).outerWidth() - targetElement.outerWidth() / 2) { eOffset = $(this).outerWidth() - targetElement.outerWidth() / 2 };
            targetElement.css({ 'left': `${eOffset}px` });
            formAction(targetElement);
            setOpacity();
        };
    });

    $('.prop_scroll_box').on('click', function (e) {
        targetElement = $(this).children('.scroll_btn');
        let eOffset = e.pageX - $(this).offset().left;
        eOffset < targetElement.outerWidth() / 2 ? eOffset = targetElement.outerWidth() / 2 : null;
        if (eOffset > $(this).outerWidth() - targetElement.outerWidth() / 2) { eOffset = $(this).outerWidth() - targetElement.outerWidth() / 2 };
        $(this).children('.scroll_btn').css({ 'left': `${eOffset}px` });
        formAction(targetElement);
        setOpacity();
    });

    $('.scroll_btn').on('mouseup', () => {
        isMoving = false;
    });

    $('.prop_scroll_box').on('mouseleave', () => {
        isMoving = false;
    });

    // ---

    $('[mappingValue=Opacity]').val('0.5');

    $('[mappingValue=Opacity]').on('blur', function () {
        isNaN($(this).val()) ? $(this).val(0) : null;
        let value = $(this).val() * ($('.prop_scroll_box').outerWidth() - $('.scroll_btn').outerWidth() / 2);
        value <= $('.scroll_btn').outerWidth() / 2 ? value = $('.scroll_btn').outerWidth() / 2 : null;
        value >= $('.prop_scroll_box').width() - $('.scroll_btn').outerWidth() / 2 ? value = $('.prop_scroll_box').width() - $('.scroll_btn').outerWidth() / 2 : null;
        $(this).val() < 0 ? $(this).val(0) : null;
        $(this).val() > 1 ? $(this).val(1) : null;
        $(this).siblings('.prop_scroll_frame').children().children().css({ 'left': `${value}px` });
        setOpacity();
    });

});