$(() => {

    function Initalalization() {
        let globalInfo = {
            "Fanver": {
                "pack_version": [
                    "v1.2",
                    "v1.3",
                    "v2.3",
                    "v2.4.2",
                    "v2.6.4",
                    "v2.7.3",
                    "v2.7.4",
                    "v2.8.4",
                    "v2.9",
                    "v2.9.1",
                    "v3.0.0",
                    "v3.0.1",
                    "v3.0.2",
                    "v4.0.0",
                    "v4.0.1",
                    "v4.1.0",
                    "v4.1.1",
                    "v5.0.0",
                    "v6.0.5"
                ],
                "mc_version": [
                    "1.2.x",
                    "1.3.x",
                    "1.4.x",
                    "1.5.x",
                    "1.6.x",
                    "1.7.x",
                    "1.7.x",
                    "1.8.x",
                    "1.9.x",
                    "1.9.x",
                    "1.10.x",
                    "1.10.x",
                    "1.10.x",
                    "1.11.x",
                    "1.11.x",
                    "1.12.x",
                    "1.12.x",
                    "1.13.x",
                    "1.14.x"
                ]
            },
            "Invictus": {
                "pack_version": [
                    "v0.1",
                    "v0.2",
                    "v0.2.1",
                    "v0.3",
                    "v1.0",
                    "v2.0",
                    "v2.1",
                    "v3.1",
                    "v4.1",
                    "v4.3.1"
                ],
                "mc_version": [
                    "1.7.x",
                    "1.7.x",
                    "1.7.x",
                    "1.7.x",
                    "1.7.x",
                    "1.8.x",
                    "1.8.x",
                    "1.9.x",
                    "1.11.x",
                    "1.12.x"
                ]
            }
        }
        // ---
        $.each(globalInfo.Fanver.pack_version, function (i) {
            // console.log(globalInfo.Fanver.pack_version[i], globalInfo.Fanver.mc_version[i]);
            let newElement = `
            <tr>
                <td>${globalInfo.Fanver.pack_version[i]}</td>
                <td>${globalInfo.Fanver.mc_version[i]}</td>
                <td><a href="#">Download</a></td>
            </tr>`
            $('.table_frame').eq(0).children('table').children('tbody').prepend(newElement);
        });
        // ---
        $.each(globalInfo.Invictus.pack_version, function (i) {
            // console.log(globalInfo.Fanver.pack_version[i], globalInfo.Fanver.mc_version[i]);
            let newElement = `
            <tr>
                <td>${globalInfo.Invictus.pack_version[i]}</td>
                <td>${globalInfo.Invictus.mc_version[i]}</td>
                <td><a href="#">Download</a></td>
            </tr>`
            $('.table_frame').eq(1).children('table').children('tbody').prepend(newElement);
        });
    }

    function tableElementsMethod(tableElement) {
        let pageCount = tableElement.parents('.table_frame').find('.table_pagination').children('.active').index();
        let showEntriesCount = parseInt(tableElement.parents('.table_frame').find('select[name=table_select]').val());
        // ---
        if (isSearchMethod(tableElement)) {
            tableElement.children('[getSearched=true]').hide();
            for (let i = (pageCount - 1) * showEntriesCount; i < pageCount * showEntriesCount; i++) {
                tableElement.children('[getSearched=true]').eq(i).show();
            }
        }
        else {
            tableElement.children().hide();
            for (let i = (pageCount - 1) * showEntriesCount; i < pageCount * showEntriesCount; i++) {
                tableElement.children().eq(i).show();
            }
        }
    }

    function tablePaginationMethod(pagination, tableElement) {
        pagination.children().hide();
        pagination.children().removeClass('active');
        pagination.children(':first-child, :last-child').show();
        pagination.children().eq(1).addClass('active');
        // ---
        let index = 0;
        let showEntriesCount = parseInt(tableElement.parents('.table_frame').find('select[name=table_select]').val());
        // ---
        if (isSearchMethod(tableElement)) {
            while (index * showEntriesCount < tableElement.children('[getSearched=true]').length) {
                pagination.children().eq(index + 1).show();
                index++;
            }
            tableElementsMethod(tableElement, true);
        }
        else {
            while (index * showEntriesCount < tableElement.children().length) {
                pagination.children().eq(index + 1).show();
                index++;
            }
            tableElementsMethod(tableElement);
        }
    }

    function tableInfoStringMethod(strElement, tableElement) {
        let pageCount = tableElement.parents('.table_frame').find('.table_pagination').children('.active').index();
        let showEntriesCount = parseInt(tableElement.parents('.table_frame').find('select[name=table_select]').val());
        // ---
        let totalElementLength = tableElement.children().length;
        let firstVisibleIndex = (pageCount - 1) * showEntriesCount + 1;
        let lastVisibleIndex = tableElement.children(':visible').eq(showEntriesCount - 1).index() + 1;
        // ---
        isSearchMethod(tableElement) ? totalElementLength = tableElement.children('[getSearched=true]').length : null;
        lastVisibleIndex == 0 ? lastVisibleIndex = totalElementLength : null;
        // ---
        strElement.children('i').eq(0).html(firstVisibleIndex);
        strElement.children('i').eq(1).html(lastVisibleIndex);
        strElement.children('i').eq(2).html(totalElementLength);
    }

    function isSearchMethod(tableElement) {
        if (tableElement.parents('.table_frame').attr('searchMethod') === undefined) {
            tableElement.parents('.table_frame').attr('searchMethod', false);
        }
        return tableElement.parents('.table_frame').attr('searchMethod');
    }

    Initalalization();
    tablePaginationMethod($('.table_pagination').eq(0), $('.table_frame tbody').eq(0));
    tablePaginationMethod($('.table_pagination').eq(1), $('.table_frame tbody').eq(1));
    tableInfoStringMethod($('.table_info').eq(0), $('tbody').eq(0));
    tableInfoStringMethod($('.table_info').eq(1), $('tbody').eq(1));

    $('select[name=table_select]').on('change', function () {
        showEntriesCount = parseInt($(this).val());
        tablePaginationMethod($(this).parents('.table_frame').find('.table_pagination'), $(this).parents('.table_frame').find('tbody'));
        tableInfoStringMethod($(this).parents('.table_frame').find('.table_info'), $(this).parents('.table_frame').find('tbody'));
    });

    $('.table_pagination a').click((e) => {
        e.preventDefault();

        let activeIndex = $(e.target).parents('.table_pagination').children('.active').index();
        let listMaxLength = $(e.target).parents('.table_pagination').children('li:visible').length;

        if ($(e.target).parent().index() == 0) {
            if (activeIndex != 1) {
                $(e.target).parents('.table_pagination').children('.active').removeClass('active');
                $(e.target).parents('.table_pagination').children().eq(activeIndex - 1).addClass('active');
                // ---
                tableElementsMethod($(e.target).parents('.table_frame').find('tbody'));
                tableInfoStringMethod($(e.target).parents('.table_frame').find('.table_info'), $(e.target).parents('.table_frame').find('tbody'));
            }
        }

        else if ($(e.target).parent().index() == $(e.target).parents('.table_pagination').children().length - 1) {
            if (activeIndex != listMaxLength - 2) {
                $(e.target).parents('.table_pagination').children('.active').removeClass('active');
                $(e.target).parents('.table_pagination').children().eq(activeIndex + 1).addClass('active');
                // ---
                tableElementsMethod($(e.target).parents('.table_frame').find('tbody'));
                tableInfoStringMethod($(e.target).parents('.table_frame').find('.table_info'), $(e.target).parents('.table_frame').find('tbody'));
            }
        }

        else {
            $(e.target).parents('.table_pagination').children('.active').removeClass('active');
            $(e.target).parent().addClass('active');
            // ---
            tableElementsMethod($(e.target).parents('.table_frame').find('tbody'));
            tableInfoStringMethod($(e.target).parents('.table_frame').find('.table_info'), $(e.target).parents('.table_frame').find('tbody'));
        }

    });

    $('input[name=table_search]').on('blur', function () {
        if ($(this).val().trim() != '') {
            $(this).parents('.table_frame').attr('searchMethod', true);
            $(this).parents('.table_frame').find('tbody').children().removeAttr('getSearched').hide();
            $(this).parents('.table_frame').find('tbody>tr').children(`:contains(${$(this).val()})`).parent().attr('getSearched', true).show();
            // ---
            tablePaginationMethod($(this).parents('.table_frame').find('.table_pagination'), $(this).parents('.table_frame').find('tbody'), true);
            tableInfoStringMethod($(this).parents('.table_frame').find('.table_info'), $(this).parents('.table_frame').find('tbody'));
        }
        // ---
        else {
            $(this).parents('.table_frame').attr('searchMethod', false);
            tablePaginationMethod($(this).parents('.table_frame').find('.table_pagination'), $(this).parents('.table_frame').find('tbody'));
            tableInfoStringMethod($(this).parents('.table_frame').find('.table_info'), $(this).parents('.table_frame').find('tbody'));
        }
    })

});
