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

/* 
    onClickVolag - AJAX-добавление товара в корзину
    GetCartCount - AJAX-запрос на получение количества строчек товаров в корзине
    ReloadCartCount - обновляет данные о количестве строк в корзине
    addcartpopup - добавляет эффек всплывающего окна о том, что товар добавлен в корзину
    onClickUserConsert - клик по галочке согласие с правилами сайта при оформлении заказа
    number_format - служебная функция форматирования чисел
*/

function onClickVolag(el) {

    addcartpopup(); /* всплывающее окошко */

    let itemId = el.dataset.id;
    let itemQuantity = 1;

    if (el.hasAttribute('data-q')) {
        itemQuantity = +el.dataset.q;
    }

    $.ajax({
        type: 'POST',
        url: '/ajax/cart/addcart.php',
        data: 'ID=' + itemId + "&Q=" + itemQuantity,
        success: function () {
            ReloadCartCount();
        }
    });

    return false;
}

function GetCartCount() {
    let resCount;

    $.ajax({
        type: 'POST',
        url: '/ajax/cart/count.php',
        async: false,
        data: '',
        success: function (result) {
            resCount = result;
        }
    });

    return resCount;
}

function ReloadCartCount() {
    $('.header-basket__element').attr('data-basket-amount', GetCartCount());
}

function addcartpopup() {
    $.when(ShowCartPop()).done(function () {
        HideCartPop();
    });
}

function ShowCartPop() {
    $(".popalert").animate({
        top: "+=140px", opacity: "1"
    }, "1000").delay(1000);

}

function HideCartPop() {
    $(".popalert").animate({
        top: "-=140px", opacity: "0"
    }, "1000");
}

function onClickUserConsert(el) {
    el.value = el.value === 'Y' ? 'N' : 'Y';

    btnsOrderConfirm = document.querySelectorAll('a.btn-order-save');
    btnsOrderConfirm.forEach(
        function (element, i, arr) {
            if (el.value === 'Y') {
                element.classList.remove('disabled');
            } else {
                element.classList.add('disabled');
            }
        }
    );
}

function number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    let n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            let k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

$(document).ready(function () {
    setTimeout(function () {
        ReloadCartCount();
    }, 4000);
});

// обработчик события клика по кнопке 18+
$('.modal-year__close').click(function () {
    $.ajax({
        type: 'POST',
        url: '/ajax/setyear.php',
        data: 'YEAR=Y',
        success: function (data) {
        }
    });

    $('body').removeClass('modal-year__open');
    $('.modal-year__wrap').fadeOut();
});
// tabs https://codepen.io/rafaelavlucas/pen/MLKGba?editors=1010

let tabLinks = document.querySelectorAll(".tab-links"),
    tabContent = document.querySelectorAll(".tab-pane");


Array.prototype.forEach.call(tabLinks,function (el) {
    el.addEventListener("click", openTabs);
});


function openTabs(el) {
    let btnTarget = el.currentTarget,
        idTab = btnTarget.dataset.tab;

    Array.prototype.forEach.call(tabContent,function (el) {
        el.classList.remove("active");
    });

    Array.prototype.forEach.call(tabLinks,function (el) {
        el.classList.remove("active");
    });

    document.querySelector("#" + idTab).classList.add("active");

    btnTarget.classList.add("active");
}
let acc = document.getElementsByClassName("js__accordion"),
    i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("collapsed");
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}
window.addEventListener("DOMContentLoaded", function () {
    let callFormTel = document.querySelectorAll('#soa-property-2, input[name="form_text_2"]');

    Array.prototype.forEach.call(callFormTel, function (input) {
        let keyCode;

        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            let pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            let matrix = "+7 (___) ___ ____",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                });
            i = new_value.indexOf("_");
            if (i !== -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            let reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function (a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
            if (event.type === "blur" && this.value.length < 5) this.value = ""
        }

        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false)
    });
});