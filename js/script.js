import tabs from "./modules/tabs";
import modals from "./modules/modals";
import calc from "./modules/calc";
import forms from "./modules/forms";
import menu from "./modules/menu";
import slider from "./modules/slider";
import timer from "./modules/timer";
import { modalOpen } from "./modules/modals";

document.addEventListener("DOMContentLoaded", () => {
  const modalTimerId = setTimeout(() => modalOpen(".modal", modalTimerId), 300000);
  tabs();
  modals("[data-modal]", ".modal", modalTimerId);
  calc();
  forms(modalTimerId);
  menu();
  slider();
  timer();
});
