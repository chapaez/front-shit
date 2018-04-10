$(function () {
    var $scroller = $('.js-slide-up'),
        $scrollContainer = $('.page-content');

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
    $('.js-popup-close').click(function () {
        hidePopup($($(this).data('target')));
    });
    function hidePopup(popup) {
        popup.addClass('_hidden');
    }
    function showProductPopup(product) {
        $('#product-popup').removeClass('_hidden');
    }
    $('.js-show-product-popup').click(function () {
        showProductPopup($(this));
    });

    function checkScroller() {
        if($(window).scrollTop()>0 && !($scroller.hasClass('_showed'))){
            $scroller.addClass('_showed');
        }
        if($(window).scrollTop()===0){
            $scroller.removeClass('_showed');
        }
    }
    setInterval(function() {
        if(didScroll) {
            didScroll = false;
            checkScroller();
        }
    }, 300);
    function scrollStuff() {
        didScroll = true;
    }
    $(window).on('touchmove',function(){
        scrollStuff();
    });
    $(window).scroll(function(){
        scrollStuff();
    });
    $scroller.click(function () {
        $(window).scrollTop(0,0);
        $(this).removeClass('_showed');
    });
});