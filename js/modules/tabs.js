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

export default tabs;