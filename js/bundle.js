/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
  //calc

  const result = document.querySelector(".calculating__result span");
  let sex, weight, height, age, ratio;

  if (localStorage.getItem("sex")) {
    sex = localStorage.getItem("sex");
  } else {
    sex = "female";
    localStorage.setItem("sex", "female");
  }

  if (localStorage.getItem("ratio")) {
    ratio = localStorage.getItem("ratio");
  } else {
    ratio = 1.375;
    localStorage.setItem("ratio", 1.375);
  }

  function initLocalSettings(activeClass, selector) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((element) => {
      element.classList.remove(activeClass);

      if (element.getAttribute("data-ratio") == localStorage.getItem("ratio")) {
        element.classList.add(activeClass);
      }

      if (element.getAttribute("id") == localStorage.getItem("sex")) {
        element.classList.add(activeClass);
      }
    });
  }
  initLocalSettings(
    "calculating__choose-item_active",
    ".calculating__choose_big div"
  );
  initLocalSettings("calculating__choose-item_active", "#gender div");

  function calcTotal() {
    if (!sex || !weight || !height || !age || !ratio) {
      result.textContent = "____";
      return;
    } else if (sex == "male") {
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      result.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  }
  calcTotal();

  function getStaticInformation(activeClass, parentSelector) {
    const elements = document.querySelectorAll(`${parentSelector} div`);

    elements.forEach((item) => {
      item.addEventListener("click", (e) => {
        if (e.target.hasAttribute("data-ratio")) {
          ratio = +e.target.getAttribute("data-ratio");
          localStorage.setItem("ratio", +e.target.getAttribute("data-ratio"));
        } else {
          sex = e.target.getAttribute("id");
          localStorage.setItem("sex", e.target.getAttribute("id"));
        }
        elements.forEach((item) => {
          item.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }

  getStaticInformation(
    "calculating__choose-item_active",
    ".calculating__choose_big"
  );
  getStaticInformation("calculating__choose-item_active", "#gender");

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);
    input.addEventListener("input", (e) => {
      if (e.target.value.match(/\D/g)) {
        console.log(e.target.value);
        e.target.style.border = "1px solid red";
      } else {
        e.target.style.border = "";
      }

      switch (e.target.getAttribute("id")) {
        case "height":
          height = +e.target.value;
          break;
        case "weight":
          weight = +e.target.value;
          break;
        case "age":
          age = +e.target.value;
      }
      calcTotal();
    });
  }

  getDynamicInformation(".calculating__choose_medium");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modals */ "./js/modules/modals.js");


function forms(modalTimerId) {
  const forms = document.querySelectorAll("form");
  const status = {
    ok: "Ваше сообщение доставлено)",
    loading: "img/form/spinner.svg",
    failure: "Что-то пошло не так(",
  };

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: data,
    });
    return await res.json();
  };

  function postForm(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const message = document.createElement("img");
      message.src = status.loading;
      message.classList.add("status");
      message.style.cssText = "display: block; margin: 0 auto;";
      form.insertAdjacentElement("afterend", message);

      const formData = new FormData(form);

      const obj = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", obj)
        .then((data) => {
          console.log(data);
          showThanksModal(status.ok);
          message.remove();
        })
        .catch(() => {
          showThanksModal(status.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }
  forms.forEach((item) => {
    postForm(item);
  });

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    (0,_modals__WEBPACK_IMPORTED_MODULE_0__.modalOpen)(".modal", modalTimerId);

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
    <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
    </div>
    `;
    document.querySelector(".modal").append(thanksModal);

    setTimeout(() => {
      (0,_modals__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".modal");
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
    }, 3000);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./js/modules/menu.js":
/*!****************************!*\
  !*** ./js/modules/menu.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function menu() {
    //Меню на день из классов
  class Menu {
    constructor(name, img, desc, price, parent, ...classes) {
      this.name = name;
      this.img = img;
      this.desc = desc;
      this.price = price;
      this.parent = document.querySelector(parent);
      this.classes = classes || ["menu__item", "big"];
    }
    render() {
      let menuItem = document.createElement("div");

      if (this.classes.length == 0) {
        menuItem.classList.add("menu__item");
      } else {
        this.classes.forEach((className) => menuItem.classList.add(className));
      }

      menuItem.innerHTML = `
        <img src="${this.img}" alt="vegy" />
        <h3 class="menu__item-subtitle">${this.name}</h3>
        <div class="menu__item-descr">
          ${this.desc}
        </div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;
      this.parent.append(menuItem);
    }
  }

  const getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Error ${res.status} on url: ${url}`);
    }
    return await res.json();
  };

  getResource("http://localhost:3000/menu").then((data) => {
    data.forEach(({ title, img, descr, price }) => {
      new Menu(title, img, descr, price, ".menu .container").render();
    });
  });

  // axios.get("http://localhost:3000/menu").then((data) => {
  //   data.data.forEach(({ title, img, descr, price }) => {
  //     new Menu(title, img, descr, price, ".menu .container").render();
  //   });
  // });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menu);

/***/ }),

/***/ "./js/modules/modals.js":
/*!******************************!*\
  !*** ./js/modules/modals.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "modalOpen": () => (/* binding */ modalOpen)
/* harmony export */ });
function modalOpen(modal, modalTimerId) {
  const openModal = document.querySelector(modal);
  openModal.classList.add("show");
  openModal.classList.remove("hide");
  document.body.style.overflow = "hidden";
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function closeModal(modal) {
  const openModal = document.querySelector(modal);
  openModal.classList.add("hide");
  openModal.classList.remove("show");
  document.body.style.overflow = "";
}

function modals(triggerModal, modalSelector, modalTimerId) {
  //Модальное окно
  const openModal = document.querySelectorAll(triggerModal),
    windowsModal = document.querySelector(modalSelector);

  openModal.forEach((item) => {
    item.addEventListener("click", (e) => {
      modalOpen(modalSelector, modalTimerId);
    });
  });

  windowsModal.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("modal") ||
      e.target.hasAttribute("data-close")
    ) {
      closeModal(modalSelector);
    }
  });

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      modalOpen(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  window.addEventListener("scroll", showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modals);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(){

    const tabs = document.querySelectorAll(".tabheader__item"),
    tabContent = document.querySelectorAll(".tabcontent"),
    tabHeader = document.querySelector(".tabheader__items");

  function hideContent() {
    tabContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show");
      item.classList.remove("animate");
    });
  }

  function showContent(i = 0) {
    tabContent[i].classList.add("show");
    tabContent[i].classList.remove("hide");
    tabContent[i].classList.add("animate");

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
    tabs[i].classList.add("tabheader__item_active");
  }

  hideContent();
  showContent();

  tabHeader.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideContent();
          showContent(i);
        }
      });
    }
  });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {
  //Timer
  const deadline = new Date("2023-06-08");

  function showDeadline(date) {
    const t = date - new Date();
    let days, hours, minutes, seconds;
    if (t <= 0) {
      days = hours = minutes = seconds = 0;
    } else {
      (days = Math.floor(t / (1000 * 60 * 60 * 24))),
        (hours = Math.floor((t / (1000 * 60 * 60)) % 24)),
        (minutes = Math.floor((t / (1000 * 60)) % 60)),
        (seconds = Math.floor((t / 1000) % 60));
    }

    return {
      t,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  function getZero(elem) {
    if (elem < 10) {
      return "0" + elem;
    } else {
      return elem;
    }
  }

  function insertTime() {
    const days = document.querySelector("#days"),
      hours = document.querySelector("#hours"),
      minutes = document.querySelector("#minutes"),
      seconds = document.querySelector("#seconds"),
      t = setInterval(updateClock, 1000);

    function updateClock() {
      let time = showDeadline(deadline);
      days.innerHTML = getZero(time.days);
      hours.innerHTML = getZero(time.hours);
      minutes.innerHTML = getZero(time.minutes);
      seconds.innerHTML = getZero(time.seconds);

      if (time.t < 0) {
        clearInterval(t);
      }
    }
    updateClock();
  }

  insertTime();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modals */ "./js/modules/modals.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/menu */ "./js/modules/menu.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");









document.addEventListener("DOMContentLoaded", () => {
  const modalTimerId = setTimeout(() => (0,_modules_modals__WEBPACK_IMPORTED_MODULE_1__.modalOpen)(".modal", modalTimerId), 300000);
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_modals__WEBPACK_IMPORTED_MODULE_1__["default"])("[data-modal]", ".modal", modalTimerId);
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])(modalTimerId);
  (0,_modules_menu__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])();
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map