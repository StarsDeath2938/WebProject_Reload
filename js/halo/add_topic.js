$(() => {

    function getDate() {
        let date = new Date();
        let arrMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return `${arrMonth[date.getMonth()]}.${date.getDate()} ${date.getFullYear()}`;
    }

    getDate($('.getDate'));

    function createElement() {
        let newElement = `
            <div class="content">
                <h2>${$("#topictitle").val().trim()}</h2>
                <div class="divider"></div>
                <p>${$('textarea').val().trim()}</p>
                <div class="avator_frame">
                    <div class="avator_info">
                        Last Edited By <a class="avator_name">${$('#username').val().trim()}</a>,
                        <span class="getDate">${getDate()}</span>
                    </div>
                    <div class="avator"></div>
                </div>
            </div>
        `;
        $('.content_frame').append(newElement);
    }

    // ---

    $('#add_new_topic').on('click', () => {
        $('.hover_frame').css({ display: 'flex' });
    });

    $('.hover_submit').on('click', (ev) => {
        ev.stopPropagation();
    });

    $('.hover_submit *').on('blur', () => {
        if ($('#username').val().trim() != '' && $('#topictitle').val().trim() != '' && $('textarea').val().trim() != '') {
            $('#submit').html('Click Here To Submit');
        }
    })

    $('.hover_frame').on('click', () => {
        $('.hover_frame').css({ display: 'none' });

        $('#username').val('');
        $('#topictitle').val('');
        $('textarea').val('');
    });

    $('#submit').on('click', () => {
        if ($('#username').val().trim() != '' && $('#topictitle').val().trim() != '' && $('textarea').val().trim() != '') {
            createElement();
            $('#submit').html('Click Anywhere else to Exit');

            $('.hover_frame').css({ display: 'none' });
            $('#username').val('');
            $('#topictitle').val('');
            $('textarea').val('');
        }
    });

});