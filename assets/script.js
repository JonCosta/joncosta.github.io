$(document).ready(function () {

    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    $(".navbar-nav li").click(function () {
        $(".navbar-nav li").removeClass("active");
        $(this).addClass("active");
    });

    $('.my-form').on('submit', function (event) {
        event.preventDefault();
    });

    $('a[href*="#"]')
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                // Determine element to change to
                var target = $(this.hash);
                target = target.length ? target : $('[name="' + this.hash.slice(1) + '"]');
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top - 100
                    }, 1000, function () {
                        // Callback after animation, must change focus
                        var $target = $(target);
                        // Checking if target was focused
                        if ($target.is(":focus")) {
                            return false;
                        } else {
                            // Adding tabindex for elements not focusable
                            $target.attr('tabindex', '-1');
                        }
                    });
                }
            }
        });

    function setCurrentYear() {
        var currentYear = new Date().getFullYear();
        $('#current-year').text(currentYear);
    }

    setCurrentYear();
});