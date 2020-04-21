$(() => {

    const SPEED = 600;

    function createDynamicBg() {

        let elementCount = $('#dynamic_bg').children().length;
        let maxElementNum = Math.ceil(($(window).width() / 180) * ($(window).height() / 90));

        function initializing() {
            while (elementCount < maxElementNum) {
                let newElement = $('<div></div>');
                newElement.addClass('dynamic_item');
                getDispersion(newElement);
                $('#dynamic_bg').prepend(newElement);
                elementCount++;
            };

            while (elementCount > maxElementNum) {
                $('#dynamic>div:last-child').remove();
                elementCount--;
            };
        };

        function getDispersion(Element) {
            if (Element != undefined) {
                let topDistance = Math.floor(Math.random() * $(window).height()) - 40;
                let leftDistance = Math.floor(Math.random() * $(window).width()) - 40;
                let edgeLength = Math.random() * 30 + 10;
                Element.css({ top: topDistance, left: leftDistance, width: edgeLength, height: edgeLength, display: 'none' });
                Element.fadeIn(SPEED);
            };
        };

        function bgAnimteMethod() {
            let maxActiveCount = 8;
            let minElementLeft = Math.ceil(maxElementNum / 2 - maxActiveCount)
            setInterval(() => {
                for (let i = 0; i < maxActiveCount; i++) {
                    let ActiveElement = $('#dynamic_bg').children().eq(Math.floor(Math.random() * elementCount));
                    ActiveElement.animate({
                        width: '-=10px',
                        height: '-=10px',
                        opacity: '0'
                    }, Math.floor(Math.random() * SPEED + SPEED), () => {
                        ActiveElement.remove();
                        elementCount--;
                    });
                };
                elementCount <= minElementLeft ? initializing() : null;
            }, SPEED);
        };

        initializing();
        getDispersion();
        bgAnimteMethod();
    };

    createDynamicBg();
    // ---
    $(window).on('resize', () => {
        $('#dynamic_bg>*').fadeOut(SPEED);
        $('#dynamic_bg').css({ width: $(window).width(), height: $(window).height() });
        createDynamicBg();
    });

});