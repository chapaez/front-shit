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

});