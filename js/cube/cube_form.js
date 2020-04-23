$(() => {

    function HexMethod(Hex) {
        let TempHex = '#';

        if (Hex == null || Hex == '#' || Hex.length == 0) { return '#000000' };
        typeof (Hex) == String ? null : Hex = Hex.toString(16);
        Hex = Hex.toUpperCase();

        for (let i in Hex) {
            if (Hex.charCodeAt(i) >= 48 && Hex.charCodeAt(i) <= 57) {
                TempHex += Hex[i];
                continue;
            }

            if (Hex[i] == '#' && i == 0) {
                continue;
            }

            if (Hex.charCodeAt(i) < 65) {
                TempHex += 'A';
                continue;
            }

            if (Hex.charCodeAt(i) > 70) {
                TempHex += 'F';
                continue;
            }
            TempHex += Hex[i];
        };

        Hex = TempHex;

        while (Hex.length < 7) {
            if ((Hex.length - 1) % 2 == 0) {
                Hex += Hex.substring(Hex.length - 2, Hex.length);
            }

            else if ((Hex.length - 1) % 3 == 0) {
                Hex += Hex.slice(Hex.length - 3, Hex.length);
            }

            else {
                Hex += Hex[Hex.length - 1];
            }
        }

        return Hex;
    };

    function setValue(targetElement, isHex) {
        switch (targetElement) {
            case 'outer': {
                if (isHex) {
                    $('#outer_propHex').val(HexMethod($('#outer_propHex').val()));

                    $('.cube_outer>div').css({
                        'background-color': HexMethod($('#outer_propHex').val()),
                        'box-shadow': `0px 0px 8px ${HexMethod($('#outer_propHex').val())}`
                    });

                    $('#outer_propRed').val(parseInt(HexMethod($('#outer_propHex').val()).substring(1, 3), 16));
                    $('#outer_propGreen').val(parseInt(HexMethod($('#outer_propHex').val()).substring(3, 5), 16));
                    $('#outer_propBlue').val(parseInt(HexMethod($('#outer_propHex').val()).substring(5, 7), 16));
                }

                else {
                    $('.cube_outer>div').css({
                        'background-color': `rgb(${$('#outer_propRed').val()},${$('#outer_propGreen').val()},${$('#outer_propBlue').val()})`,
                        'box-shadow': `0px 0px 8px rgb(${$('#outer_propRed').val()},${$('#outer_propGreen').val()},${$('#outer_propBlue').val()})`
                    });

                    $('#outer_propHex').val(`#${parseInt($('#outer_propRed').val()).toString(16) + parseInt($('#outer_propGreen').val()).toString(16) + parseInt($('#outer_propBlue').val()).toString(16)}`);
                    $('#outer_propHex').val(HexMethod($('#outer_propHex').val()));
                }

                break;
            }

            case 'inner': {
                if (isHex) {
                    $('#inner_propHex').val(HexMethod($('#inner_propHex').val()));

                    $('.cube_inner>div').css({
                        'background-color': HexMethod($('#inner_propHex').val()),
                        'box-shadow': `0px 0px 16px ${HexMethod($('#inner_propHex').val())}`
                    });

                    $('#inner_propRed').val(parseInt(HexMethod($('#inner_propHex').val()).substring(1, 3), 16));
                    $('#inner_propGreen').val(parseInt(HexMethod($('#inner_propHex').val()).substring(3, 5), 16));
                    $('#inner_propBlue').val(parseInt(HexMethod($('#inner_propHex').val()).substring(5, 7), 16));
                }

                else {
                    $('.cube_inner>div').css({
                        'background-color': `rgb(${$('#inner_propRed').val()},${$('#inner_propGreen').val()},${$('#inner_propBlue').val()})`,
                        'box-shadow': `0px 0px 16px rgb(${$('#inner_propRed').val()},${$('#inner_propGreen').val()},${$('#inner_propBlue').val()})`
                    });
                    $('#inner_propHex').val(`#${parseInt($('#inner_propRed').val()).toString(16) + parseInt($('#inner_propGreen').val()).toString(16) + parseInt($('#inner_propBlue').val()).toString(16)}`);
                    $('#inner_propHex').val(HexMethod($('#inner_propHex').val()));
                }

                break;
            }

            case 'bg': {
                if (isHex) {
                    $('#bg_propHex').val(HexMethod($('#bg_propHex').val()));

                    $('.cube_frame').css({
                        'background-color': HexMethod($('#bg_propHex').val())
                    });

                    $('#bg_propRed').val(parseInt(HexMethod($('#bg_propHex').val()).substring(1, 3), 16));
                    $('#bg_propGreen').val(parseInt(HexMethod($('#bg_propHex').val()).substring(3, 5), 16));
                    $('#bg_propBlue').val(parseInt(HexMethod($('#bg_propHex').val()).substring(5, 7), 16));
                }

                else {
                    $('.cube_frame').css({
                        'background-color': `rgb(${$('#bg_propRed').val()},${$('#bg_propGreen').val()},${$('#bg_propBlue').val()})`
                    });
                    $('#bg_propHex').val(`#${parseInt($('#bg_propRed').val()).toString(16) + parseInt($('#bg_propGreen').val()).toString(16) + parseInt($('#bg_propBlue').val()).toString(16)}`);
                    $('#bg_propHex').val(HexMethod($('#bg_propHex').val()));
                }

                break;
            }
        };
    };

    // initialization
    function initialization() {
        let tempHEX = '#';

        for (let i = 0; i <= 3; i++) {
            if (i == 3) {
                $('#outer_color input').eq(3).val(tempHEX.toUpperCase());
                tempHEX = '#';
                break;
            }
            $('#outer_color input').eq(i).val($('.cube_outer>div').css('background-color').substring(i * 5 + 4, i * 5 + 7));
            tempHEX += Number($('.cube_outer>div').css('background-color').substring(i * 5 + 4, i * 5 + 7)).toString(16);
        }

        for (let i = 0; i <= 3; i++) {
            if (i == 3) {
                $('#inner_color input').eq(3).val(tempHEX.toUpperCase());
                tempHEX = '#';
                break;
            }
            $('#inner_color input').eq(i).val($('.cube_inner>div').css('background-color').substring(i * 5 + 4, i * 5 + 7));
            tempHEX += Number($('.cube_inner>div').css('background-color').substring(i * 5 + 4, i * 5 + 7)).toString(16);
        }

        for (let i = 0; i <= 3; i++) {
            if (i == 3) {
                $('#bg_color input').eq(3).val(tempHEX.toUpperCase());
                tempHEX = '#';
                break;
            }
            $('#bg_color input').eq(i).val($('.cube_frame').css('background-color').substring(i * 5 + 4, i * 5 + 7));
            tempHEX += Number($('.cube_frame').css('background-color').substring(i * 5 + 4, i * 5 + 7)).toString(16);
        }
    }

    initialization();

    // form action

    $('input').on('blur', function () {

        switch ($(this).parents().eq(2).attr('id')) {

            case 'outer_color': {
                if ($(this).attr('id') == 'outer_propHex') {
                    setValue('outer', true);
                }

                else {
                    $(this).val() > 0 ? null : $(this).val(0);
                    $(this).val() < 255 ? null : $(this).val(255);
                }

                setValue('outer', false);

                break;
            }

            case 'inner_color': {
                if ($(this).attr('id') == 'inner_propHex') {
                    setValue('outer', true);
                }

                else {
                    $(this).val() > 0 ? null : $(this).val(0);
                    $(this).val() < 255 ? null : $(this).val(255);
                }

                setValue('inner', false);

                break;
            }

            case 'bg_color': {
                if ($(this).attr('id') == 'bg_propHex') {
                    setValue('bg', true);
                }

                else {
                    $(this).val() > 0 ? null : $(this).val(0);
                    $(this).val() < 255 ? null : $(this).val(255);
                }

                setValue('bg', false);

                break;
            }

            default: {
                break;
            }

        }

    });

});