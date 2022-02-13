'use strict';

const basketCounterEl = document.querySelector('.cartIconWrap span');
const basketTotalEl = document.querySelector('.basketTotal');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const basketEl = document.querySelector('.basket');

/**
 * Обработчик открытия корзины при клике на ее значок.
 */
document.querySelector('.cartIconWrap').addEventListener('click', () => {
  basketEl.classList.toggle('hidden');
});
const basket = {};


class basketUnit {
  constructor(id, name, price, count) {
    console.log(id, name, price, count);
    this.id = id 
    this.name = name;
    this.price = price;
    this.count =count;
  }
  getUnitBasketCount() {
    return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
}

   getUnitBasketPrice() {
  return Object.values(basket).reduce((acc, product) => acc + product.price * product.count, 0);
}
  renderNewUnit(productId){
     // Получаем строку в корзине, которая отвечает за данный продукт.
  const basketRowEl = basketEl
  .querySelector(`.basketRow[data-productId="${productId}"]`);
  // Если такой строки нет, то отрисовываем новую строку.
  if (!basketRowEl) {
    this.#renderNewUnitInBasket(productId);
  return;}
  const product = basket[productId];
  // Ставим новое количество в строке продукта корзины.
  basketRowEl.querySelector('.productCount').textContent = product.count;
  // Ставим нужную итоговую цену по данному продукту в строке продукта корзины.
  basketRowEl.querySelector('.productTotalRow')
    .textContent = (product.price * product.count).toFixed(2);
  
  }

   #renderNewUnitInBasket(productId){
    const productRow = `
    <div class="basketRow" data-productId="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
      </div>
    </div>
    `;
  basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
  }

}


document.querySelector('.featuredItems').addEventListener('click', event => {
  // Проверяем, если клик был не по кнопке с селектором ".addToCart", а также
  // такого селектора не существует среди родителей элемента, по которому был
  // произведен клик, то ничего не делаем, уходим из функции.
  if (!event.target.closest('.addToCart')) {
    return;
  }
  // Получаем ближайшего родителя с классом featuredItem, в нем записаны все
  // нужные данные о продукте, получаем эти данные.
  const featuredItemEl = event.target.closest('.featuredItem');
  const id = +featuredItemEl.dataset.id;
  const name = featuredItemEl.dataset.name;
  const price = +featuredItemEl.dataset.price;
  // Добавляем в корзину продукт.
 
  if (!(id in basket)) {
    basket[id] = new  basketUnit(id, name, price, 0);
  }
  basket[id].count++;
  basketCounterEl.textContent = basket[id].getUnitBasketCount().toString();
  basketTotalValueEl.textContent = basket[id].getUnitBasketPrice().toFixed(2);
  basket[id].renderNewUnit(id);
});
