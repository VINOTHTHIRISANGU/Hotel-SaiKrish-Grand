(function($) {

    "use strict";


    //Hide Loading Box (Preloader)
    function handlePreloader() {
        if ($('.preloader').length) {
            $('.preloader').delay(200).fadeOut(500);
        }
    }

    // ADD GA4 EVENT SCRIPT (ONCE – GLOBAL)

    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('[data-track="book-now"]').forEach(function(btn) {
            btn.addEventListener('click', function() {
                gtag('event', 'book_now_click', {
                    event_category: 'engagement',
                    event_label: 'Book Now Button',
                    value: 1
                });
            });
        });
    });


    //Update Header Style and Scroll to Top
    function headerStyle() {
        if ($('.main-header').length) {
            var windowpos = $(window).scrollTop();
            var siteHeader = $('.main-header');
            var scrollLink = $('.scroll-to-top');

            var HeaderHight = $('.main-header').height();
            if (windowpos >= HeaderHight) {
                siteHeader.addClass('fixed-header');
                scrollLink.fadeIn(300);
            } else {
                siteHeader.removeClass('fixed-header');
                scrollLink.fadeOut(300);
            }

        }
    }



    headerStyle();


    //Submenu Dropdown Toggle
    if ($('.main-header li.dropdown ul').length) {
        $('.main-header li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>');

        //Dropdown Button
        $('.main-header li.dropdown .dropdown-btn').on('click', function() {
            $(this).prev('ul').slideToggle(500);
        });

        //Dropdown Menu / Fullscreen Nav
        $('.fullscreen-menu .navigation li.dropdown > a').on('click', function() {
            $(this).next('ul').slideToggle(500);
        });

        //Disable dropdown parent link
        $('.navigation li.dropdown > a').on('click', function(e) {
            e.preventDefault();
        });

        //Disable dropdown parent link
        $('.main-header .navigation li.dropdown > a,.hidden-bar .side-menu li.dropdown > a').on('click', function(e) {
            e.preventDefault();
        });

    }

    //Mobile Nav Hide Show
    if ($('.mobile-menu').length) {

        $('.mobile-menu .menu-box').mCustomScrollbar();

        var mobileMenuContent = $('.main-header .nav-outer .main-menu').html();
        $('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
        $('.sticky-header .main-menu').append(mobileMenuContent);

        //Hide / Show Submenu
        $('.mobile-menu .navigation > li.dropdown > .dropdown-btn').on('click', function(e) {
            e.preventDefault();
            var target = $(this).parent('li').children('ul');

            if ($(target).is(':visible')) {
                $(this).parent('li').removeClass('open');
                $(target).slideUp(500);
                $(this).parents('.navigation').children('li.dropdown').removeClass('open');
                $(this).parents('.navigation').children('li.dropdown > ul').slideUp(500);
                return false;
            } else {
                $(this).parents('.navigation').children('li.dropdown').removeClass('open');
                $(this).parents('.navigation').children('li.dropdown').children('ul').slideUp(500);
                $(this).parent('li').toggleClass('open');
                $(this).parent('li').children('ul').slideToggle(500);
            }
        });

        // document.addEventListener("contextmenu", e => e.preventDefault());

        // document.onkeydown = function(e) {
        //     if (
        //         e.keyCode == 123 || (e.ctrlKey && e.shiftKey && e.keyCode == 73) || (e.ctrlKey && e.shiftKey && e.keyCode == 74) ||
        //         (e.ctrlKey && e.keyCode == 85)
        //     ) {
        //         return false;
        //     }
        // };
        //Menu Toggle Btn
        $('.mobile-nav-toggler').on('click', function() {
            $('body').addClass('mobile-menu-visible');

        });

        //Menu Toggle Btn
        $('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function() {
            $('body').removeClass('mobile-menu-visible');
            $('.mobile-menu .navigation > li').removeClass('open');
            $('.mobile-menu .navigation li ul').slideUp(0);
        });

        $(document).keydown(function(e) {
            if (e.keyCode == 27) {
                $('body').removeClass('mobile-menu-visible');
                $('.mobile-menu .navigation > li').removeClass('open');
                $('.mobile-menu .navigation li ul').slideUp(0);
            }
        });

    }


    // Add Current Class Auto
    function dynamicCurrentMenuClass(selector) {
        let FileName = window.location.href.split("/").reverse()[0];

        selector.find("li").each(function() {
            let anchor = $(this).find("a");
            if ($(anchor).attr("href") == FileName) {
                $(this).addClass("current");
            }
        });
        // if any li has .current elmnt add class
        selector.children("li").each(function() {
            if ($(this).find(".current").length) {
                $(this).addClass("current");
            }
        });
        // if no file name return
        if ("" == FileName) {
            selector.find("li").eq(0).addClass("current");
        }
    }

    if ($('.main-header .header-lower .main-menu .navigation').length) {
        dynamicCurrentMenuClass($('.main-header .header-lower .main-menu .navigation'));
    }



    //Header Search
    if ($('.search-box-outer').length) {
        $('.search-box-outer').on('click', function() {
            $('body').addClass('search-active');
        });
        $('.close-search').on('click', function() {
            $('body').removeClass('search-active');
        });

        $('.search-popup .color-layer').on('click', function() {
            $('body').removeClass('search-active');
        });
    }



    // Odometer
    if ($(".odometer").length) {
        $('.odometer').appear();
        $('.odometer').appear(function() {
            var odo = $(".odometer");
            odo.each(function() {
                var countNumber = $(this).attr("data-count");
                $(this).html(countNumber);
            });
            window.odometerOptions = {
                format: 'd',
            };
        });
    }



    //Tabs Box
    if ($('.tabs-box').length) {
        $('.tabs-box .tab-buttons .tab-btn').on('click', function(e) {
            e.preventDefault();
            var target = $($(this).attr('data-tab'));

            if ($(target).is(':visible')) {
                return false;
            } else {
                target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
                $(this).addClass('active-btn');
                target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
                target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab');
                $(target).fadeIn(300);
                $(target).addClass('active-tab');
            }
        });
    }



    //Custom Seclect Box
    if ($('.custom-select-box').length) {
        $('.custom-select-box').selectmenu().selectmenu('menuWidget').addClass('overflow');
    }




    //Main Slider Carousel
    if ($('.main-slider-carousel').length) {
        $('.main-slider-carousel').owlCarousel({
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            loop: true,
            margin: 0,
            nav: true,
            //autoHeight: true,
            smartSpeed: 500,
            autoplay: 6000,
            navText: ['<span class="flaticon-left-arrow-1"></span>', '<span class="flaticon-right-arrow-1"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                800: {
                    items: 1
                },
                1024: {
                    items: 1
                },
                1200: {
                    items: 1
                }
            }
        });
    }



    // SIngle Item Carousel
    if ($('.single-item-carousel').length) {
        $('.single-item-carousel').owlCarousel({
            //animateOut: 'fadeOut',
            //animateIn: 'fadeIn',
            loop: true,
            margin: 0,
            nav: true,
            //autoHeight: true,
            smartSpeed: 500,
            autoplay: 6000,
            navText: ['<i class="flaticon-left"></i>', '<span class="flaticon-right"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                800: {
                    items: 1
                },
                1024: {
                    items: 1
                },
                1200: {
                    items: 1
                }
            }
        });
    }



    // Three Item Carousel
    if ($('.three-item-carousel').length) {
        $('.three-item-carousel').owlCarousel({
            //animateOut: 'fadeOut',
            //animateIn: 'fadeIn',
            loop: true,
            margin: 30,
            nav: true,
            //autoHeight: true,
            smartSpeed: 500,
            autoplay: 6000,
            navText: ['<span class="left-arrow"><i class="fa fa-arrow-left left_arrow_room"></i></span>', '<span class="next-arrow"><i class="fa fa-arrow-right right_arrow_room"></i></span>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                800: {
                    items: 2
                },
                1024: {
                    items: 3
                },
                1200: {
                    items: 3
                }
            }
        });
    }


    // Offer Carousel
    if ($('.offer-carousel').length) {
        $('.offer-carousel').owlCarousel({
            //animateOut: 'fadeOut',
            //animateIn: 'fadeIn',
            loop: true,
            margin: 30,
            nav: true,
            center: true,
            //autoHeight: true,
            smartSpeed: 500,
            autoplay: 6000,
            navText: ['<span class="left-arrow"><img src="images/icons/prev-arrow.png" alt="" /></span>', '<span class="next-arrow"><img src="images/icons/next-arrow.png" alt="" /></span>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                800: {
                    items: 2
                },
                1024: {
                    items: 3
                },
                1200: {
                    items: 3
                }
            }
        });
    }



    // Gallery Carousel
    if ($('.gallery-carousel').length) {
        $('.gallery-carousel').owlCarousel({
            //animateOut: 'fadeOut',
            //animateIn: 'fadeIn',
            loop: true,
            margin: 0,
            nav: true,
            //autoHeight: true,
            smartSpeed: 500,
            autoplay: 6000,
            navText: ['<span class="left-arrow"><img src="images/icons/prev-arrow.png" alt="" /></span>', '<span class="next-arrow"><img src="images/icons/next-arrow.png" alt="" /></span>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                800: {
                    items: 2
                },
                1024: {
                    items: 3
                },
                1200: {
                    items: 3
                }
            }
        });
    }


    // Video Carousel
    if ($('.video-carousel').length) {
        $('.video-carousel').owlCarousel({
            //animateOut: 'fadeOut',
            //animateIn: 'fadeIn',
            loop: true,
            margin: 0,
            nav: true,
            center: true,
            //autoHeight: true,
            smartSpeed: 500,
            autoplay: 6000,
            navText: ['<span class="left-arrow"><img src="images/icons/prev-arrow.png" alt="" /></span>', '<span class="next-arrow"><img src="images/icons/next-arrow.png" alt="" /></span>'],
            responsive: {
                0: {
                    items: 1,
                    center: false
                },
                600: {
                    items: 1,
                    center: false
                },
                800: {
                    items: 1,
                    center: false
                },
                1024: {
                    items: 1
                },
                1200: {
                    items: 1
                }
            }
        });
    }




    //Accordion Box
    if ($('.accordion-box').length) {

        $(".accordion-box").on('mouseenter', '.accordion-block-title', function() {

            var outerBox = $(this).parents('.accordion-box');
            var target = $(this).parents('.accordion-block');

            // Close all others
            $(outerBox).find('.accordion-block-title').removeClass('active');
            $(outerBox).find('.accordion-block').removeClass('active-block');
            $(outerBox).find('.accordion-content').slideUp(300);

            // Open current
            $(this).addClass('active');
            target.addClass('active-block');
            $(this).next('.accordion-content').slideDown(300);
        });
        $(".accordion-box").on('mouseleave', function() {
            $(this).find('.accordion-block-title').removeClass('active');
            $(this).find('.accordion-block').removeClass('active-block');
            $(this).find('.accordion-content').slideUp(300);
        });


    }





    //Masonary
    function enableMasonry() {
        if ($('.masonry-items-container').length) {

            var winDow = $(window);
            // Needed variables
            var $container = $('.masonry-items-container');

            $container.isotope({
                itemSelector: '.masonry-item',
                masonry: {
                    columnWidth: '.masonry-item.col-lg-4'
                },
                animationOptions: {
                    duration: 500,
                    easing: 'linear'
                }
            });

            winDow.bind('resize', function() {

                $container.isotope({
                    itemSelector: '.masonry-item',
                    animationOptions: {
                        duration: 500,
                        easing: 'linear',
                        queue: false
                    }
                });
            });
        }
    }

    enableMasonry();




    //Fact Counter + Text Count
    if ($('.count-box').length) {
        $('.count-box').appear(function() {

            var $t = $(this),
                n = $t.find(".count-text").attr("data-stop"),
                r = parseInt($t.find(".count-text").attr("data-speed"), 10);

            if (!$t.hasClass("counted")) {
                $t.addClass("counted");
                $({
                    countNum: $t.find(".count-text").text()
                }).animate({
                    countNum: n
                }, {
                    duration: r,
                    easing: "linear",
                    step: function() {
                        $t.find(".count-text").text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $t.find(".count-text").text(this.countNum);
                    }
                });
            }

        }, {
            accY: 0
        });
    }



    // Testimonial Section Four Carousel
    if ($('.room-detail-section').length) {
        var thumbsCarousel = new Swiper('.room-detail-section .carousel-outer .thumbs-carousel', {
            spaceBetween: 0,
            slidesPerView: 5,
            direction: 'horizontal',
            breakpoints: {
                320: {
                    spaceBetween: 20,
                    direction: 'horizontal',
                    slidesPerView: 3,
                },
                640: {
                    spaceBetween: 20,
                    direction: 'horizontal',
                    slidesPerView: 6,
                },
                1023: {
                    spaceBetween: 0,
                    slidesPerView: 5,
                }

            }
        });

        var contentCarousel = new Swiper('.room-detail-section .carousel-outer .content-carousel', {
            spaceBetween: 0,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            thumbs: {
                swiper: thumbsCarousel
            },
        });
    }





    // Services Carousel
    if ($('.services-carousel').length) {
        $('.services-carousel').owlCarousel({
            //animateOut: 'fadeOut',
            //animateIn: 'fadeIn',
            loop: true,
            margin: 30,
            nav: true,
            center: true,
            smartSpeed: 500,
            autoplay: 6000,
            navText: ['<span class="left-arrow"><img src="images/icons/prev-arrow.png" alt="" /></span>', '<span class="next-arrow"><img src="images/icons/next-arrow.png" alt="" /></span>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                800: {
                    items: 2
                },
                1024: {
                    items: 3
                },
                1200: {
                    items: 3
                }
            }
        });
    }



    // Location Carousel
    if ($('.location-carousel').length) {
        $('.location-carousel').owlCarousel({
            //animateOut: 'fadeOut',
            //animateIn: 'fadeIn',
            loop: true,
            margin: 0,
            nav: true,
            smartSpeed: 500,
            autoplay: 6000,
            navText: ['<span class="left-arrow"><img src="images/icons/prev-arrow.png" alt="" /></span>', '<span class="next-arrow"><img src="images/icons/next-arrow.png" alt="" /></span>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                800: {
                    items: 3
                },
                1024: {
                    items: 4
                },
                1400: {
                    items: 4
                },
                1600: {
                    items: 5
                }
            }
        });
    }




    // Event Carousel
    if ($('.event-carousel').length) {
        $('.event-carousel').owlCarousel({
            //animateOut: 'fadeOut',
            //animateIn: 'fadeIn',
            loop: true,
            margin: 0,
            nav: true,
            center: true,
            //autoHeight: true,
            smartSpeed: 500,
            autoplay: 6000,
            navText: ['<span class="left-arrow"><img src="images/icons/prev-arrow.png" alt="" /></span>', '<span class="next-arrow"><img src="images/icons/next-arrow.png" alt="" /></span>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                800: {
                    items: 2
                },
                1024: {
                    items: 3
                },
                1200: {
                    items: 3
                }
            }
        });
    }



    // Instagram Carousel
    if ($('.instagram-carousel').length) {
        $('.instagram-carousel').owlCarousel({
            //animateOut: 'fadeOut',
            //animateIn: 'fadeIn',
            loop: true,
            margin: 30,
            nav: true,
            center: true,
            //autoHeight: true,
            smartSpeed: 500,
            autoplay: 6000,
            navText: ['<span class="left-arrow"><img src="images/icons/prev-arrow.png" alt="" /></span>', '<span class="next-arrow"><img src="images/icons/next-arrow.png" alt="" /></span>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                800: {
                    items: 3
                },
                1024: {
                    items: 4
                },
                1200: {
                    items: 5
                }
            }
        });
    }




    // Testimonial Carousel
    if ($('.testimonial-carousel').length) {
        $('.testimonial-carousel').owlCarousel({
            //animateOut: 'fadeOut',
            //animateIn: 'fadeIn',
            loop: true,
            margin: 0,
            nav: true,
            center: true,
            //autoHeight: true,
            smartSpeed: 500,
            autoplay: 6000,
            navText: ['<span class="left-arrow"><img src="images/icons/prev-arrow.png" alt="" /></span>', '<span class="next-arrow"><img src="images/icons/next-arrow.png" alt="" /></span>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                800: {
                    items: 1
                },
                1024: {
                    items: 1
                },
                1200: {
                    items: 1
                }
            }
        });
    }



    // Product Carousel Slider
    if ($('.comfort-section .image-carousel').length && $('.comfort-section .thumbs-carousel').length) {

        var $sync1 = $(".comfort-section .image-carousel"),
            $sync2 = $(".comfort-section .thumbs-carousel"),
            flag = false,
            duration = 500;

        $sync1
            .owlCarousel({
                loop: true,
                items: 1,
                margin: 0,
                nav: true,
                navText: ['<span class="left-arrow"><img src="images/icons/prev-arrow.png" alt="" /></span>', '<span class="next-arrow"><img src="images/icons/next-arrow.png" alt="" /></span>'],
                dots: false,
                autoplay: true,
                autoplayTimeout: 5000
            })
            .on('changed.owl.carousel', function(e) {
                if (!flag) {
                    flag = false;
                    $sync2.trigger('to.owl.carousel', [e.item.index, duration, true]);
                    flag = false;
                }
            });

        $sync2
            .owlCarousel({
                loop: true,
                margin: 10,
                items: 1,
                nav: false,
                navText: ['<span class="icon fa fa-angle-left"></span>', '<span class="icon fa fa-angle-right"></span>'],
                dots: false,
                center: false,
                autoplay: true,
                autoplayTimeout: 5000,
                responsive: {
                    0: {
                        items: 2,
                        autoWidth: false
                    },
                    400: {
                        items: 3,
                        autoWidth: false
                    },
                    600: {
                        items: 4,
                        autoWidth: false
                    },
                    900: {
                        items: 5,
                        autoWidth: false
                    },
                    1000: {
                        items: 5,
                        autoWidth: false
                    }
                },
            })

            .on('click', '.owl-item', function() {
                $sync1.trigger('to.owl.carousel', [$(this).index(), duration, true]);
            })
            .on('changed.owl.carousel', function(e) {
                if (!flag) {
                    flag = true;
                    $sync1.trigger('to.owl.carousel', [e.item.index, duration, true]);
                    flag = false;
                }
            });
    }




    //LightBox / Fancybox
    if ($('.lightbox-image').length) {
        $('.lightbox-image').fancybox({
            openEffect: 'fade',
            closeEffect: 'fade',
            helpers: {
                media: {}
            }
        });
    }


    //Contact Form Validation
    if ($('#contact-form').length) {
        $('#contact-form').validate({
            rules: {
                username: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                website: {
                    required: true
                },
                message: {
                    required: true
                }
            }
        });
    }



    // Scroll to a Specific Div
    if ($('.scroll-to-target').length) {
        $(".scroll-to-target").on('click', function() {
            var target = $(this).attr('data-target');
            // animate
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 1500);

        });
    }



    // Elements Animation
    if ($('.wow').length) {
        var wow = new WOW({
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 0, // distance to the element when triggering the animation (default is 0)
            mobile: true, // trigger animations on mobile devices (default is true)
            live: true // act on asynchronously loaded content (default is true)
        });
        wow.init();
    }



    /* ==========================================================================
       When document is Scrollig, do
       ========================================================================== */

    $(window).on('scroll', function() {
        headerStyle();
    });

    /* ==========================================================================
       When document is loading, do
       ========================================================================== */

    $(window).on('load', function() {
        handlePreloader();
        enableMasonry();
    });

})(window.jQuery);