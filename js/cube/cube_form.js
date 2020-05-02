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

    function setValue(formElement, isHex) {
        let Red = formElement.find('[mappingValue=Red]').val();
        let Green = formElement.find('[mappingValue=Green]').val();
        let Blue = formElement.find('[mappingValue=Blue]').val();
        let rgbHEX = formElement.find('[mappingValue=rgbHEX]').val();

        if (isHex) {
            formElement.find('[mappingValue=rgbHEX]').val(HexMethod(rgbHEX));

            $(`[binding=${formElement.attr('formTarget')}]`).css({
                'background-color': HexMethod(rgbHEX),
                'box-shadow': `0px 0px 8px ${HexMethod(rgbHEX)}`
            });

            formElement.find('[mappingValue=Red]').val(parseInt(HexMethod(rgbHEX).substring(1, 3), 16));
            formElement.find('[mappingValue=Green]').val(parseInt(HexMethod(rgbHEX).substring(3, 5), 16));
            formElement.find('[mappingValue=Blue]').val(parseInt(HexMethod(rgbHEX).substring(5, 7), 16));
        }

        else {
            $(`[binding=${formElement.attr('formTarget')}]`).css({
                'background-color': `rgb(${Red},${Green},${Blue})`,
                'box-shadow': `0px 0px 8px rgb(${Red},${Green},${Blue})`
            });
            formElement.find('[mappingValue=rgbHEX]').val(HexMethod(`#${parseInt(Red).toString(16) + parseInt(Green).toString(16) + parseInt(Blue).toString(16)}`));
        }
    };

    // initialization

    function initialization(formElement) {
        let Red = parseInt($(`[binding=${formElement.attr('formTarget')}]`).css('background-color').substring(4, 7));
        let Green = parseInt($(`[binding=${formElement.attr('formTarget')}]`).css('background-color').substring(9, 12));
        let Blue = parseInt($(`[binding=${formElement.attr('formTarget')}]`).css('background-color').substring(14, 17));
        // ---
        formElement.find('[mappingValue=Red]').val(Red);
        formElement.find('[mappingValue=Green]').val(Green);
        formElement.find('[mappingValue=Blue]').val(Blue);
        formElement.find('[mappingValue=rgbHEX]').val(`#${Red.toString(16)}${Green.toString(16)}${Blue.toString(16)}`.toUpperCase());
    }

    initialization($('[formTarget=outerBox]'));
    initialization($('[formTarget=innerBox]'));
    initialization($('[formTarget=Background]'));

    // form action

    $('input').on('blur', function () {

        if ($(this).attr('mappingValue') == 'rgbHEX') {
            setValue($(this).parents('[formTarget]'), true);
        }

        else {
            $(this).val() < 0 ? $(this).val(0) : null;
            $(this).val() > 255 ? $(this).val(255) : null;
            setValue($(this).parents('[formTarget]'));
        }


    });

});