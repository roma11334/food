import { modalOpen, closeModal } from "./modals";

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
    modalOpen(".modal", modalTimerId);

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
      closeModal(".modal");
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
    }, 3000);
  }
}

export default forms;
