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

export default calc;
