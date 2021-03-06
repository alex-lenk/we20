if (document.documentElement.clientWidth > 576) {
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
}

window.addEventListener('load', function () {
    $('#call-form__tel2').mask("+7 (999) 999-99-99");
    baguetteBox.run('.winery-slider');
});
