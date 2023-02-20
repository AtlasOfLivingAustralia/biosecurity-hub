($ => {
  $(document).ready(($) => {

    function readCookie(name) {
        var nameEQ = encodeURIComponent(name) + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0)
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return null;
    }

    /**
     * Display login/logout buttons (ES6)
     */
    var alaJSAuthCookieName='ALA-js-auth';
    var alaJSAuthCookieValue = readCookie(alaJSAuthCookieName);
    // console.log('Cookie '+alaJSAuthCookieName+' cookie has value '+alaJSAuthCookieValue);
    if (alaJSAuthCookieValue == 'loggedin'){
      $('.ala-auth-buttons-logged-in').removeClass("d-none");
      $('.ala-auth-buttons-logged-out').addClass("d-none");
    } else {
      $('.ala-auth-buttons-logged-in').addClass("d-none");
      $('.ala-auth-buttons-logged-out').removeClass("d-none");
    }

    /**
     * Mobile (off-canvas) menu
     */
    $('[data-toggle="offcanvas"]').on('click', function () {
      $('.site').toggleClass('offcanvas-open');
    });

    /**
     * Tooltips
     */
    $('[data-toggle="tooltip"]').tooltip();

    $('[data-sticky]').stickybits({
      useStickyClasses: true,
      stickyBitStickyOffset: 20
    });

    if($('#anchorList').length) {
      $('body').scrollspy({ target: '#anchorList' });
    }

    // filter handling for a /dir/ OR /indexordefault.page
    function filterPath(string) {
      return string
        .replace(/^\//, '')
        .replace(/(index|default).[a-zA-Z]{3,4}$/, '')
        .replace(/\/$/, '');
    }

    const locationPath = filterPath(location.pathname);
    $('a[href*="#"]').not('[data-toggle]').each(function () {
      const thisPath = filterPath(this.pathname) || locationPath;
      const hash = this.hash;
      if ($("#" + hash.replace(/#/, '')).length) {
        if (locationPath == thisPath && (location.hostname == this.hostname || !this.hostname) && this.hash.replace(/#/, '')) {
          const $target = $(hash), target = this.hash;
          if (target) {
            $(this).click(function (event) {
              event.preventDefault();
              $('html, body').animate({scrollTop: $target.offset().top}, 1000, function () {
                location.hash = target;
                $target.focus();
                if ($target.is(":focus")){ //checking if the target was focused
                  return false;
                }else{
                  $target.attr('tabindex','-1'); //Adding tabindex for elements not focusable
                  $target.focus(); //Setting focus
                }
              });
            });
          }
        }
      }
    });

  });

  //Collapse tabs if opened on mobile
  const collapseTabs = () => {
    if($(window).outerWidth() < 768) {
      $('.tab-box').find('[aria-expanded=true]').click();
    }
  };

  collapseTabs();

  // end document.ready
})(jQuery);
