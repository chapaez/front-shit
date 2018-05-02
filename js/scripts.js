$(function () {
    var $scroller = $('.js-slide-up'),
        $scrollContainer = $('.page-content'),
        didScroll=false,
        $burger = $('.js-show-tablet-menu');

    $('.js-slider-wrap').slick({
        prevArrow: $(this).find('.js-left-arrow'),
        nextArrow: $(this).find('.js-right-arrow'),
    });
    $('.js-product-slider').slick({
        arrows:false,
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });

    $('[data-scrollto-block]').click(function () {
        $('html, body').scrollTop($($(this).data('scrollto-block')).offset().top - 60);
    });
    $('[data-show-block]').click(function () {
        $($(this).data('show-block')).removeClass('_hidden').addClass('_shown');
    });
    $('[data-hide-block]').click(function () {
        $($(this).data('hide-block')).removeClass('_shown').addClass('_hidden');
    });
    // show product sliders
    imageGaleryBlock($('.js-product-gallery-wrap')).show();

    $('.js-popup-close').click(function () {
        hidePopup($($(this).data('target')));
    });
    function hidePopup(popup) {
        popup.addClass('_hidden');
    }
    function showProductPopup(product) {
        $('#product-popup').removeClass('_hidden');
        imageGaleryBlock($('.js-popup-product-gallery-wrap')).show();
    }
    $('.js-show-product-popup').click(function () {
        showProductPopup($(this));
    });
    /////////////////////////////////////////////////
    function imageGaleryBlock(obj) {
        if(obj.length===0){
            return {
                show:function () {
                },
                hide:function () {
                },
                error:true
            };
        }
        var $galleryUpBtn = obj.find('.js-gallery-up'),
            $galleryDownBtn = obj.find('.js-gallery-down'),
            $galleryDetailLeftBtn = obj.find('.js-gallery-detail-left'),
            $galleryDetailRightBtn = obj.find('.js-gallery-detail-right'),
            $galleryArrowBlock = obj.find('.js-gallery-arrow'),
            $thumbItem = obj.find('.js-thumb-item'),
            $thumbnailList = obj.find('.js-product-thumbnails'),
            $detailList = obj.find('.js-product-detail');


        var getThumbnailOptions = function () {
            return{
                arrows:false,
                vertical:true,
                dots: false,
                infinite: false,
                speed: 500,
                cssEase: 'linear',
                slidesToShow:4,
                slidesToScroll:1,
                responsive: [
                    {
                        breakpoint: 1240,
                        settings: {
                            arrows: false,
                            slidesToShow: 3,
                            vertical:false,
                        }
                    },
                ]
            };
        };
        var getDetailSlickOptions = function()  {
            return {
                arrows:false,
                dots: false,
                speed: 1,
                cssEase: 'linear',
                slidesToShow:1,
                slidesToScroll:1,
                useCSS: false,
                infinite:true,
                responsive: [
                    {
                        breakpoint: 651,
                        settings: {
                            dots: true,
                        }
                    },
                ]
            };
        };
        var init = function () {

        };
        init();
        return {
            object: obj,
            $galleryDetailSlick: {},
            $galleryThumbnailSlick: {},
            error:false,
            init:function () {

            },
            show: function () {
                if($thumbItem.length>4){
                    $galleryArrowBlock.show();
                }

                this.$galleryDetailSlick = $detailList.slick(getDetailSlickOptions());
                this.$galleryThumbnailSlick = $thumbnailList.slick(getThumbnailOptions());
                var self = this;
                $galleryUpBtn.click(function() {
                    self.$galleryThumbnailSlick.slick("slickPrev");
                });
                $galleryDownBtn.click(function() {
                    self.$galleryThumbnailSlick.slick("slickNext");
                });

                $galleryDetailLeftBtn.click(function() {
                    self.$galleryDetailSlick.slick("slickPrev");
                });
                $galleryDetailRightBtn.click(function() {
                    self.$galleryDetailSlick.slick("slickNext");
                });
                $thumbItem.click(function () {
                    self.$galleryDetailSlick.slick('slickGoTo', $(this).data('num'));
                });

            },
            hide: function () {

            }

        };
    }


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
    $burger.click(function () {
        $(this).parent().toggleClass('_close');
        $('body').toggleClass('_no-overflow');
        $('.js-tablet-menu-overlay').toggleClass('_active');
        $('.js-tablet-menu').toggleClass('_active');
    });
    /*$burger.bigSlide({menu:'.js-tablet-menu-body'});*/
});