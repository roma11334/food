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

export default modals;
export { modalOpen, closeModal };
