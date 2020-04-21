$(() => {
    $('#dismiss').on('click', function (ev) {
        ev.preventDefault();
        $(this).parent().parent().slideUp(600);
    })
});