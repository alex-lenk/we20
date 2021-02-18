$(document).ready(function () {
    $('.basket-items-list-item-container').each(function () {
        let thisEl = $(this);
        let basketInput = thisEl.find('.basket-input'); // поле с ценой со скидкой
        let basketInputPercent = thisEl.find('.basket-input__percent'); // поле процентов
        let getBasePrice = thisEl.find($('.price-base-1')).text().replace(/[^0-9]/gi, ''); // получаем базовую цену и очищаем её от символов

        thisEl.find(basketInputPercent).on('keyup  change', function (event) {
            event.preventDefault();
            let thisPercent = $(this).val();
            let resultPrice = getBasePrice / 100 * thisPercent; //вычисление суммы из известной нам базовой цены и введенного процента
            basketInput.val(Math.ceil(getBasePrice - resultPrice)); // Округляем и вставляем в поле
        });

        thisEl.find(basketInput).on('keyup change', function () {
            let thisPrice = $(this).val();
            let resultPrice = Math.round(100 - thisPrice * 100 / getBasePrice); //вычисление процентов из известной нам базовой цены и новой цены
            basketInputPercent.val(resultPrice);
        });
    });


    /* Написанный ниже код для демонстрации как должно работать */

    $('.js__get-link').click(function () {
        console.log(randomString(44));
        $('.basket-control__copy--input').val('https://wineexpress.ru/' + randomString(44));
    });


    $('.basket-control__copy--btn').click(function () {
        myFunction();
    });


    function randomString(i) {
        let rnd = '';
        while (rnd.length < i)
            rnd += Math.random().toString(36).substring(2);
        return rnd.substring(0, i);
    }


    function myFunction() {
        let copyText = document.getElementById("myInput");
        copyText.select();
        document.execCommand("copy");
        alert("Скопировано: " + copyText.value);
    }
});
