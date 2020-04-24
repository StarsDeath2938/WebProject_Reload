$(() => {

    let TempSelected = 0;

    function getDate() {
        let date = new Date();
        let arrMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return `${arrMonth[date.getMonth()]}.${date.getDate()} ${date.getFullYear()}`;
    };

    function createElement() {
        let newElement = `
        <div>
            <div class="avator_0${TempSelected + 1} img_effect"></div>
            <div class="item_info">
                <h3>${$('#mainTitle').val().trim()}</h3>
                <span>${$('#subTitle').val().trim()}</span>
                <div class="getDate">${getDate()}</div>
            </div>
        </div>
        `;
        $('.list_frame').append(newElement);
    };

    // ---

    $('.input_avator>div').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        TempSelected = $(this).index();
    });

    // ---

    $('#fixed_btn').on('click', () => {
        $('.hover_frame').css({ display: 'flex' });
    });

    $('.hover_submit').on('click', (ev) => {
        ev.stopPropagation();
    });

    $('.hover_submit *').on('blur', () => {
        if ($('#mainTitle').val().trim() != '' && $('#subTitle').val().trim() != '') {
            $('#submit').html('Click Here To Submit');
        }
    })

    $('.hover_frame').on('click', () => {
        $('.hover_frame').hide();
        $('input').val('');
    });

    $('#submit').on('click', () => {
        if ($('#mainTitle').val().trim() != '' && $('#subTitle').val().trim() != '') {
            createElement();
            if (Math.floor($('.list_frame>div:last-child').offset().top - $(document).scrollTop() - $(window).height() + $('.list_frame').children('div').height() / 3) < 0) {
                $('.list_frame>div:last-child').children('.img_effect').animate({ 'opacity': 1 }, 'fast');
            }

            $('#submit').html('Click Anywhere else to Exit');
            $('.hover_frame').hide();
            $('input').val('');
        }
    });

});