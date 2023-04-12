function slider() {
  //slider
  function offerSlider() {
    const slideWrapper = document.querySelector(".offer__slider-wrapper"),
      slider = document.querySelector(".offer__slider"),
      slidesInner = document.querySelector(".slides__inner"),
      width = window.getComputedStyle(slideWrapper).width,
      slides = document.querySelectorAll(".offer__slide"),
      current = document.querySelector("#current"),
      total = document.querySelector("#total"),
      prevSlide = document.querySelector(".offer__slider-prev"),
      nextSlide = document.querySelector(".offer__slider-next");

    let slideIndex = 1;
    let offset = 0;

    slider.style.position = "relative";

    const indicators = document.createElement("ol"),
      dots = [];
    indicators.classList.add("carousel-indicators");
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
      let dot = document.createElement("li");
      dot.setAttribute("data-slide-to", i + 1);
      dot.classList.add("dot");
      if (i + 1 == slideIndex) {
        dot.style.opacity = 1;
      }
      indicators.append(dot);
      dots.push(dot);
    }

    slidesInner.style.width = 100 * slides.length + "%";
    slidesInner.style.transition = "0.5s all";
    slidesInner.style.display = "flex";

    slideWrapper.style.overflow = "hidden";

    slides.forEach((slide) => {
      slide.style.width = width;
    });

    function dotsActive() {
      dots.forEach((dot) => {
        dot.style.opacity = 0.5;
      });
      dots[slideIndex - 1].style.opacity = 1;
    }

    function toNumb(str) {
      return +str.replace(/\D/g, "");
    }

    nextSlide.addEventListener("click", () => {
      if (offset == toNumb(width) * (slides.length - 1)) {
        offset = 0;
      } else {
        offset += toNumb(width);
      }
      slidesInner.style.transform = `translateX(-${offset}px)`;

      if (slideIndex == slides.length) {
        slideIndex = 1;
      } else {
        slideIndex++;
      }
      current.textContent = "0" + slideIndex;
      dotsActive();
    });

    prevSlide.addEventListener("click", () => {
      if (offset == 0) {
        offset = toNumb(width) * (slides.length - 1);
      } else {
        offset -= +width.slice(0, width.length - 2);
      }

      slidesInner.style.transform = `translateX(-${offset}px)`;

      if (slideIndex == 1) {
        slideIndex = slides.length;
      } else {
        slideIndex--;
      }
      current.textContent = "0" + slideIndex;
      dotsActive();
    });

    dots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        const slideTo = e.target.getAttribute("data-slide-to");
        slideIndex = slideTo;
        dotsActive();

        offset = toNumb(width) * (slideTo - 1);
        slidesInner.style.transform = `translateX(-${offset}px)`;

        current.textContent = "0" + slideIndex;
      });
    });
    // console.log(current.textContent);
    // showSlide(slideIndex);

    // function showSlide(n) {
    //   if (n > slides.length) {
    //     slideIndex = 1;
    //   }
    //   if (n < 1) {
    //     slideIndex = slides.length;
    //   }
    //   slides.forEach((slide) => (slide.style.display = "none"));
    //   slides[slideIndex - 1].style.display = "block";
    // }

    // function plusSlide(n) {
    //   showSlide((slideIndex += n));
    // }

    // prevSlide.addEventListener("click", () => {
    //   plusSlide(-1);
    //   current.textContent = "0" + slideIndex;
    // });
    // nextSlide.addEventListener("click", () => {
    //   plusSlide(1);
    //   current.textContent = "0" + slideIndex;
    // });
  }
  offerSlider();
}
export default slider;
