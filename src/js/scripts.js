/*
* 1. Открытие и закрытие подсказок в хедере по классу .top-panel-info__text
* 2. Открытие и закрытие винотек в хедере по классу .header-address
* 3. Скрипт для кнопки вверх scroll to top
* 4. Маска номера телефона для ID #call-form__tel
* 5. Открытие формы заказа звонка call-form
* 6. Логика для поиска при вводе от двух символов
* 7. Добавления и удаление класса для панели меню
* 8. При скроле странице появляется палавающая область
* 9. Открытие и закрытие подсказки в рейтинге товара
* 10 . +-addtocart Манипуляции элементами корзины
* */

'use strict';

function documentMouseup(elClass, twoClass) {
    $(document).mouseup(function (e) {
        if (!$(elClass).is(e.target) && $(elClass).has(e.target).length === 0) {
            $(elClass).removeClass(twoClass)
        }
    });
}


function ValidMail() {
    let re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i,
        myMail = document.getElementById('subscription-field').value,
        valid = re.test(myMail),
        output;

    if (!valid) {
        output = '<div class="footer-subscription__error">E-mail не верен!</div>';
    } else {
        output = '<div class="footer-subscription__error">отправляем</div>';
    }
    document.querySelector('.subscribe-form-item').insertAdjacentHTML('afterbegin', output);

    return valid;
}


$(document).ready(function () {
    $('.detail-gallery__for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.detail-gallery__nav'
    });
    $('.detail-gallery__nav').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.detail-gallery__for',
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 3
                }
            }
        ]
    });

    $('.fast-filter__item').click(function () {
        $('.catalog-tags__link').removeClass('catalog-tags__link-active');
        $(this).find('.catalog-tags__link').addClass('catalog-tags__link-active');
    });

    $('#__red').click(function () {
        $('.production').removeClass().addClass('production is-red');
    });
    $('#__white').click(function () {
        $('.production').removeClass().addClass('production is-white');
    });
    $('#__pink').click(function () {
        $('.production').removeClass().addClass('production is-pink');
    });
    $('#__sparkling').click(function () {
        $('.production').removeClass().addClass('production is-sparkling');
    });
    $('#__alcohol').click(function () {
        $('.production').removeClass().addClass('production is-alcohol');
    });
    /*
    $('#__champagne').click(function () {
        $('.production').removeClass().addClass('production is-champagne');
    });
        $('#__cognac').click(function () {
            $('.production').removeClass().addClass('production is-cognac');
        });
        $('#__wine').click(function () {
            $('.production').removeClass().addClass('production is-wine');
        });
        */


    $('.slick-init').slick();

    /* BEGIN: 1 */
    let topPanelInfoText = $('.top-panel-info__text'),
        topPanelInfoActive = 'top-panel-info__active';

    topPanelInfoText.click(function () {
        if (!$(this).hasClass(topPanelInfoActive)) {
            $('.top-panel-info__text.top-panel-info__active').removeClass(topPanelInfoActive);
            $(this).addClass(topPanelInfoActive);
        } else {
            $(this).removeClass(topPanelInfoActive);
        }
    });
    documentMouseup(topPanelInfoText, topPanelInfoActive);
    /* END: 1 */


    /* BEGIN: 2 */
    let headerAddressActive = 'header-address__active';

    if ($(window).width() < 1100) {
        $('.header-address__label').click(function () {
            if (!$(this).hasClass(headerAddressActive)) {
                $('.header-address__label.header-address__active').removeClass(headerAddressActive);
                $(this).addClass(headerAddressActive);
            } else {
                $(this).removeClass(headerAddressActive);
            }
        });
    }
    /* END: 2 */


    /* BEGIN: 3 */
    if ($(window).width() > 1099) {
        let scrollToTop = $('.scroll-to-top');
        $(window).scroll(function () {
            if ($(this).scrollTop() > 450) {
                scrollToTop.fadeIn();
            } else {
                scrollToTop.fadeOut();
            }
        });

        // scroll body to 0px on click
        scrollToTop.click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 400);
            return false;
        });
    }
    /* END: 3 */


    /* BEGIN: 5 */
    let callForm = '.call-form-dialog .call-form';
    let callFormOpened = 'call-form-opened';

    $('.top-panel-js, .call-form .close').click(function () {
        $('.call-form-dialog').toggleClass(callFormOpened);
    });

    $(document).mouseup(function (e) {
        if (!$(callForm).is(e.target) && $(callForm).has(e.target).length === 0) {
            $('.call-form-dialog').removeClass(callFormOpened)
        }
    });
    /* END: 5 */


    /* BEGIN: 6  */
    let headerSearch = $('.header-search'),
        headerSearchInner = $('.header-search__inner'),
        headerSearchField = $('.header-search__field'),
        headerSearchClose = $('.header-search__close'),
        headerSearchActive = 'header-search__active',
        headerSearchActiveClear = 'header-search__active-clear';

    headerSearchClose.click(function () {
        headerSearchInner.removeClass(headerSearchActive);
        headerSearchInner.removeClass(headerSearchActiveClear);
        headerSearchField.val('');
    });

    $('.header-search__clear').click(function () {
        headerSearchField.val('').focus();
        headerSearchInner.removeClass(headerSearchActiveClear);
    });

    headerSearchField.keyup(function () {
        let Value = $(this).val().length;

        if (Value >= 2) {
            headerSearchInner.addClass(headerSearchActive);
            headerSearchInner.addClass(headerSearchActiveClear);
        } else {
            headerSearchInner.removeClass(headerSearchActive);
            headerSearchInner.removeClass(headerSearchActiveClear);
        }
    });

    $('.header-search__view').click(function () {
        headerSearch.slideDown();
        $('.header-search__field').focus();
        $('body').addClass('header-search__opened');
    });

    if ($(window).width() < 1099) {
        headerSearchClose.click(function () {
            headerSearch.slideUp();
            $('body').removeClass('header-search__opened');
        });

        $(document).mouseup(function (e) {
            if (!headerSearch.is(e.target) && headerSearch.has(e.target).length === 0) {
                headerSearch.slideUp();
                $('body').removeClass('header-search__opened');
            }
        });
    }
    /* END: 6  */


    /* BEGIN: 7 */
    $('.menu-toggle').click(function () {
        $('html').toggleClass('menu-opened');
        $('.menu-nav__inner').toggleClass('menu-nav__inner-open');
    });
    $('.nav-bar-close, .nav-bar-content__close').click(function () {
        $('html').removeClass('menu-opened');
        navBar.removeClass(navBarPanelOpened);
        navBarPointParent.removeClass(navBarLayerOpened);
        navBarPanelTitle.text('');
    });
    /* END: 7 */


    /* BEGIN: 8 */
    if ($(window).width() > 1199) {
        let headerInner = '.header-inner';

        $(window).scroll(function () {
            if ($(this).scrollTop() > 450) {
                $(headerInner).addClass('nav-scroll');

                $('.menu-nav__inner').addClass('nav-scroll__menu');

                $('.header-logo__wrap').removeClass('col-lg-3 col-4').addClass('col-xl-1 col-lg-2');

                $('.header-search').addClass('offset-xl-1');

                $('.header-call').removeClass('col-2');
            } else {
                $(headerInner).removeClass('nav-scroll');

                $('.menu-nav__inner').removeClass('nav-scroll__menu');

                $('.header-logo__wrap').addClass('col-lg-3 col-4').removeClass('col-xl-1 col-lg-2');

                $('.header-search').removeClass('offset-xl-1');

                $('.header-call').addClass('col-2');
            }
        });
    }
    /* END: 8 */


    /* BEGIN: 9. sticker-rating logic */

    let stickerRating = $('.sticker-rating'),
        stickerRatingOpened = 'sticker-rating__opened';

    stickerRating.click(function () {
        if (!$(this).hasClass(stickerRatingOpened)) {
            $('.sticker-rating.sticker-rating__opened').removeClass(stickerRatingOpened);
            $(this).addClass(stickerRatingOpened);
        } else {
            $(this).removeClass(stickerRatingOpened);
        }
    });

    documentMouseup(stickerRating, stickerRatingOpened);

    /* END: sticker-rating logic */


    let navBar = $('.nav-bar'),
        navBarPointParent = $('.nav-bar-point__parent'),
        navBarPanelTitle = $('.nav-bar-panel__title'),
        navBarPanelBack = $('.nav-bar-panel__back'),
        navBarPanelOpened = 'nav-bar-panel__opened',
        navBarPointText = '.nav-bar-point__text',
        navBarLayerOpened = 'nav-bar-layer__opened';

    navBarPointParent.click(function () {
        navBar.addClass(navBarPanelOpened);
        $(this).addClass(navBarLayerOpened);
        let text = $(this).find(navBarPointText).text();
        navBarPanelTitle.text(text);
    });

    navBarPanelBack.click(function () {
        navBar.removeClass(navBarPanelOpened);
        navBarPointParent.removeClass(navBarLayerOpened);
        navBarPanelTitle.text('');
    });

    /* BEGIN 10 */
    $('.volag-elementcard-plus').click(function () {
        let input = $(this).prev('.volag-elementcard-count'),
            totalCost = $(this).closest('.volag-elementcard-panel').find('.volag-elementcard-totalsum'),
            defaultCost = $(this).closest('.volag-elementcard-panel').find('.volag-elementcard-newsum'),
            sumDefault = parseInt(defaultCost.text().replace(/\s/g, ''));

        input.val(parseInt(input.val()) + 1);

        let count = parseInt(input.val());
        totalCost.text(number_format(sumDefault * count, 0, ',', ' ') + ' ₽');

        // ampse - обновляем количество в кнопке добавления в корзину
        $(this).closest('.volag-elementcard-panel').find('button.volag-button-addtocart').attr('data-q', count);

    });

    $('.volag-elementcard-minus').click(function () {
        let input = $(this).next('.volag-elementcard-count'),
            totalCost = $(this).closest('.volag-elementcard-panel').find('.volag-elementcard-totalsum'),
            defaultCost = $(this).closest('.volag-elementcard-panel').find('.volag-elementcard-newsum'),
            sumDefault = parseInt(defaultCost.text().replace(/\s/g, ''));

        if (input.val() > 1) {
            input.val(parseInt(input.val()) - 1);

            let count = parseInt(input.val());


            totalCost.text(number_format(sumDefault * count, 0, ',', ' ') + ' ₽');

            // ampse - обновляем количество в кнопке добавления в корзину
            $(this).closest('.volag-elementcard-panel').find('button.volag-button-addtocart').attr('data-q', count);
        } else {
            $(this).closest('.volag-elementcard-panel').find('button.volag-button-addtocart').attr('data-q', '1');
        }
    });
    /*      END 10          --- */


    if ($(headerSearchField).length > 0) {
        $(headerSearchField).autocomplete({
            source: function (request, response) {
                let term_data = "<ul class='preUpLoader'><li><a style='text-decoration:none; color:gray'>Идёт поиск...</a></li></ul>";
                $('.ui-autocomplete').show().html(term_data);

                if (document.querySelector('.preUpLoader') == null) {
                    $("<ul class='preUpLoader'><li><a style='text-decoration:none; color:gray'>Идёт поиск...</a></li></ul>").insertAfter($(".form__search-input"));
                } else {
                    $('.preUpLoader').show();
                }

                $.ajax({
                    url: '/ajax/search/autocomplete.php',
                    dataType: "json",
                    data: {
                        term: request.term
                    },
                    success: function (data) {
                        response(data);
                    }
                }, 'json');
            },
            minLength: 2,
            focus: function (event, ui) {
                event.preventDefault();
            },
            select: function (event, ui) {
                if (!ui.item) return false;
                if (!$(ui.item.value).hasClass('do_not_show')) {
                    $(headerSearchField).val($(ui.item.value).find('.item_name').text());
                }
                return false;
            },
            appendTo: ".header__search"
        }).data("ui-autocomplete")._renderItem = function (ul, item) {
            $('.preUpLoader').hide();
            return $(item.value).data("item.ui-autocomplete", item).appendTo(ul);
            //return ul.append(item.value);
        };
    }

    /* Begin: Home page */
    $('.main-slider').slick({
        "slidesToShow": 1,
        "slidesToScroll": 1,
        "autoplay": true,
        "autoplaySpeed": 5000,
        "dots": true,
        "fade": true,
        "responsive": [{
            "breakpoint": 575,
            "settings": {"dots": false}
        }]
    });
    /* END: Home page */
});

if (document.documentElement.clientWidth > 576) {
    /* Begin: винотеки */
    $(document).ready(function () {
        $('.winery-nav__list').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            variableWidth: true,
            arrows: true,
            dots: false,
            responsive: [{
                breakpoint: 1100,
                settings: {
                    slidesToShow: 4
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2
                }
            }]
        });
    });
    /* END: Кинотеки */
}

window.addEventListener('load', function () {
    baguetteBox.run('.winery-slider');
});

//= snippet/cart.js
//= snippet/tab.js
//= snippet/accordion.js
//= snippet/mask.js
