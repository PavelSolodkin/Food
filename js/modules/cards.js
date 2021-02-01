import { getResource } from "../services/services";

function cards() {
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 75;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");

      if (this.classes.length === 0) {
        this.classes = "menu__item";
        element.classList.add(this.classes);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `
            <img class="menu__image" src=${this.src} alt=${this.alt}" />
            <h3 class="menu__subtitle">${this.title}</h3>
            <p class="menu__description">${this.descr}</p>
            <div class="menu__divider"></div>
            <div class="menu__price">
              <p class="menu__cost">Цена:</p>
              <p class="menu__total"><span>${this.price}</span> руб/день</p>
            </div>
            `;
      this.parent.append(element);
    }
  }

  getResource("http://localhost:3000/menu").then((data) => {
    data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(img, altimg, title, descr, price, ".menu__items").render();
    });
  });
}

export default cards;
