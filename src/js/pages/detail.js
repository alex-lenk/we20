if (document.documentElement.clientWidth < 576) {
    $(document).ready(function () {
        $('.detail-property__item .component-sticker').appendTo('.detail-inner .component-sticker-wrap');
    });
}

window.addEventListener('load', function () {
    baguetteBox.run('.detail-media');
});
