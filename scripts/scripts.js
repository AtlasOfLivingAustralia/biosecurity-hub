/*!
 Scripts Name:   ALA Biosecurity Hub
 Description:  Scripts for ALA Biosecurity Hub
 Author:       Ares Yang
 Author URI:   https://transitgraphics.com.au/
 Version:      1.0
*/

jQuery(document).ready(function ($) {
  /* Set VW VH without horizontal scrollbar
  ========================================================================== */

  function setVwVh() {
    const vw = document.documentElement.clientWidth / 100;
    document.documentElement.style.setProperty("--vw", "".concat(vw, "px"));

    const vh = document.documentElement.clientHeight / 100;
    document.documentElement.style.setProperty("--vh", "".concat(vh, "px"));
  }

  window.addEventListener("resize", () => {
    setVwVh();
  });

  setVwVh();

  /* Invasive species slides
  ========================================================================== */

  $.fn.isInViewport = function () {
    const elementTop = $(this).offset().top;
    const elementBottom = elementTop + $(this).outerHeight();

    const viewportTop = $(window).scrollTop();
    const viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
  };

  $(".hub-invasive__species-container").on("init", () => {
    $(window).on("resize scroll", function () {
      if (
        $(".hub-invasive").isInViewport() &&
        !$(".hub-invasive__species-container .slick-list").is(":focus")
      ) {
        $(".hub-invasive__species-container .slick-list")
          .attr("tabindex", 0)
          .get(0)
          .focus({
            preventScroll: true,
          });
      } else if (
        !$(".hub-invasive").isInViewport() &&
        $(".hub-invasive__species-container .slick-list").is(":focus")
      ) {
        $(".hub-invasive__species-container .slick-list").blur();
      }
    });
  });

  $(".hub-invasive__species-container").slick({
    dots: false,
    speed: 500,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 601,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
    ],
  });

  /* ALA tools tab
  ========================================================================== */

  $(document).on(
    "click",
    ".hub-tools__tab:not(.hub-tools__tab--active)",
    (e) => {
      $(".hub-tools__tab--active").removeClass("hub-tools__tab--active");
      $(".hub-tools__content--active")
        .removeClass("hub-tools__content--active")
        .fadeOut(200, () => {
          const currentTab = e.currentTarget;
          const tool = $(currentTab).data("tool");

          $(`.hub-tools__tab[data-tool='${tool}']`).addClass(
            "hub-tools__tab--active"
          );

          $(`.hub-tools__content[data-tool='${tool}']`)
            .addClass("hub-tools__content--active")
            .fadeIn(200);
        });
    }
  );

  /* Sponsors
  ========================================================================== */

  $(document).on(
    "mouseover",
    ".hub-sponsors__logo:not(.hub-sponsors__logo--disabled)",
    (e) => {
      const newSponsor = $(e.currentTarget).data("sponsor");
      const currentSponsor = $(
        ".hub-sponsors__content-text-container--active"
      ).data("sponsor");

      if (newSponsor !== currentSponsor) {
        $(".hub-sponsors__content-text-container--active")
          .removeClass("hub-sponsors__content-text-container--active")
          .fadeOut(200, () => {
            $(
              `.hub-sponsors__content-text-container[data-sponsor='${newSponsor}']`
            )
              .addClass("hub-sponsors__content-text-container--active")
              .fadeIn(200);
          });
      }
    }
  );
});
