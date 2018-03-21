$(function () {
    $('.js-slider-wrap').slick({
        prevArrow: $('.js-left-arrow'),
        nextArrow: $('.js-right-arrow'),
    });
    $('.js-product-slider').slick({
        arrows:false,
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });
    $('.js-show-tablet-menu').click(function () {
        $(this).parent().toggleClass('_close');
    });
    var $thumItems = $('.js-thumb-item');
    if($thumItems.length>4){
        $('.js-gallery-arrow').show();
    }
    console.log($thumItems.length);
    var $galleryThumbnailSlick = $('.js-product-thumbnails').slick({
        arrows:false,
        vertical:true,
        dots: false,
        infinite: false,
        speed: 500,
        cssEase: 'linear',
        slidesToShow:4,
        slidesToScroll:1
    });
    var $galleryDetailSlick = $('.js-product-detail').slick({
        arrows:false,
        dots: false,
        speed: 1,
        cssEase: 'linear',
        slidesToShow:1,
        slidesToScroll:1,
        useCSS: false,
        infinite:true
    });

    $('.js-gallery-up').click(function() {
        $galleryThumbnailSlick.slick("slickPrev");
    });
    $('.js-gallery-down').click(function() {
        $galleryThumbnailSlick.slick("slickNext");
    });

    $('.js-gallery-detail-left').click(function() {
        $galleryDetailSlick.slick("slickPrev");
    });
    $('.js-gallery-detail-right').click(function() {
        $galleryDetailSlick.slick("slickNext");
    });
    $thumItems.click(function () {
        $galleryDetailSlick.slick('slickGoTo', $(this).data('num'));
    });

});