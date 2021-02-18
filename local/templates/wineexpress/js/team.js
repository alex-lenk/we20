$(document).ready(function () {
    $('.winery-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 5000,
        dots: true,
        infinite: true,
        adaptiveHeight: false,
        prevArrow: '<button type="button" class="slider-arrow slider-prev"><svg class="slider-arrow-icon"><use xlink:href="/local/templates/wineexpress/img/icons.svg#arrow"></use></svg></button>',
        nextArrow: '<button type="button" class="slider-arrow slider-next"><svg class="slider-arrow-icon"><use xlink:href="/local/templates/wineexpress/img/icons.svg#arrow"></use></svg></button>',
        responsive: [
            {
                breakpoint: 575,
                settings: {
                    dots: false
                }
            }]
    });
});