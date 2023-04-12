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

export default menu;