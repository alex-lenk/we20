function documentMouseup(elClass, twoClass) {
    $(document).mouseup(function (e) {
        if (!$(elClass).is(e.target) && $(elClass).has(e.target).length === 0) {
            $(elClass).removeClass(twoClass)
        }
    });
}

$(document).ready(function () {

    if ($(window).width() < 1100) $(".scroll__box").niceScroll(".scroll__box_in", {cursoropacitymin: 1, cursorcolor: "#990000"});

    /* BEGIN Нажатие плюс минус на товаре */

    /* END */


    /* BEGIN Действия при переключение в горизонталку и обратно */

    $('.catalog-btn__sort').click(function () {
        $('.catalog-btn__sort.catalog-btn__sort-active').removeClass('catalog-btn__sort-active');
        $(this).toggleClass('catalog-btn__sort-active');
    });


    $('.catalog-btn__list').click(function () {
        $('.catalog-wrapper').addClass('catalog-view__list');

        $('.snippet-card-extended').each(function () {
            let snippetCardAmount = $(this).find('.snippet-card-amount'),
                snippetCardBottom = $(this).find('.snippet-card-bottom');

            snippetCardAmount.appendTo($(this).find('.snippet-card-amount__wrap'));
            snippetCardBottom.addClass('col-3');
        });

        ym(52227139, 'reachGoal', 'horizontalCatalog'); // счетчик переключений в горизонтальную развертку Я.Метрика
    });

    $('.catalog-btn__grid').click(function () {
        $('.catalog-wrapper').removeClass('catalog-view__list');

        $('.snippet-card-extended').each(function () {
            let snippetCardAmount = $(this).find('.snippet-card-amount'),
                snippetCardBottom = $(this).find('.snippet-card-bottom');

            snippetCardAmount.prependTo($(this).find(snippetCardBottom));
            snippetCardBottom.removeClass('col-3');
        });
    });

    /* END */


    /* BEGIN: открытие и закрытие параметров в фильтрах */
    var filterSelectOpen = 'filter-select__open',
        filterSelect = '.filter-select-js',
        filterSelectView = $('.filter-select__view-js');

    filterSelectView.click(function () {
        if ($(this).closest(filterSelect).hasClass(filterSelectOpen)) {
            $(filterSelect).removeClass(filterSelectOpen);
        } else {
            $(filterSelect).removeClass(filterSelectOpen);
            $(this).closest(filterSelect).addClass(filterSelectOpen);
        }
    });

    $('.filter-select__view-js:not(.filter-select__selected)').click(function () {
        $(this).next().find('.checkbox').prop('checked', false);
    });

    if ($(window).width() >= 576) documentMouseup(filterSelect, filterSelectOpen);

    /* END */


    /* Открытие и закрытие селекта сортировки*/
    var filterSelectSort = '.filter-select-sort',
        filterSelectSortOpen = 'filter-select-sort-open';

    $('.filter-select-sort-view').click(function () {
        if ($(this).closest(filterSelectSort).hasClass(filterSelectSortOpen)) {
            $(filterSelectSort).removeClass(filterSelectSortOpen);
        } else {
            $(filterSelectSort).removeClass(filterSelectSortOpen);
            $(this).closest(filterSelectSort).addClass(filterSelectSortOpen);
        }
    });
    documentMouseup(filterSelectSort, filterSelectSortOpen);

    $('.filter-select__clear').click(function () {
        $('.filter-select__dropdown').hide();
    });

    /* END */


    var htmlElement = $('html');
    $('.bx-filter-toggle-js').click(function () {
        htmlElement.toggleClass('filter-catalog__open');
        $('.filter-select').removeClass('filter-select__open');
        $('.bx-filter .panel-heading__text').text('Фильтр');
    });

    $('.bx-filter-toggle-js.close').click(function () {
        htmlElement.removeClass('filter-select__view-open');
    });


    var btnPrice = $('.btn-price'),
        btnPriceSelected = 'btn-price__selected';

    btnPrice.click(function () {
        btnPrice.removeClass(btnPriceSelected);
        $(this).toggleClass(btnPriceSelected);
    });


    /* BEGIN поисковое поле для фильтрации огромного списка в фильтрах в каталоге */
    $(".filt-items").each(function () {
        var filt = $(this);

        $(this).find(".filter-search__field").on("keyup", function () {
            var value = $(this).val().toLowerCase();

            filt.find(".bx-filter-param-label").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });
    /* END */


    if ($(window).width() < 576) {
        $('.filter-select__collections-js').click(function () {
            htmlElement.toggleClass('filter-select__collections-open');
            htmlElement.removeClass('filter-select__view-open');
        });

        filterSelectView.click(function () {
            htmlElement.addClass('filter-select__view-open');
            var text = $(this).find('.filter-select__view-text').text();
            $('.bx-filter .panel-heading__text').text(text);
        });

        $('.panel-heading__back').click(function () {
            htmlElement.removeClass('filter-select__view-open');
            $('.filter-select').removeClass('filter-select__open');
            $('.bx-filter .panel-heading__text').text('Фильтр');
        });
    }
});