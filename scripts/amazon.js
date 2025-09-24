import { cart } from "../data/cart.js";
import { products } from "../data/products.js";

// we used accumaltor pattern (loop through each value in the data and then add it in this variable)
let productHtml = '';
// loop through products array for each item's data and display it in html using dom
products.forEach((product) => {
  productHtml += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `
})

document.querySelector('.js-products-grid')
  .innerHTML = productHtml;

// object to store timeout ids
const addedMessageTimeouts = {};

// add to cart function
document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      // we used dataset method to get values attached to data attribute then with '.' we can retrive exact value we need, and stored it into a variable
      const productId = button.dataset.productId;

      // call added to cart element here. add a class to it and styleit in css. once button clicked the message will show.
      let addedToCartElement = document.querySelector(`.js-added-to-cart-${productId}`);
      addedToCartElement.classList.add('show-added-to-cart');

      // first we check if there is any previous id in timeout obj. if it is then clear the interval.
      const previousTimeoutId = addedMessageTimeouts[productId];

      if(previousTimeoutId) {
        clearTimeout(previousTimeoutId);
      };
      // here we set timeout and assign a variable which we store into timeout object
      const timeoutId = setTimeout(() => {
        // call added to cart
        addedToCartElement.classList.remove('show-added-to-cart');
      }, 2000);
      // here we are assigning timeout object values of above variable
      addedMessageTimeouts[productId] = timeoutId;

      // we use above productId value here as these belong to button of selected item, it is basically product.id
      let quanitySelectorElement = document.querySelector(`.js-quantity-selector-${productId}`);
      let quanitySelector = Number(quanitySelectorElement.value);

      let matchingItem;
      // check if product is already in the cart then only increase the quantity. we loop through cart array and see if product is already in cart then store its value in a variable
      cart.forEach((item) => {
        if(productId === item.productId){
          matchingItem = item;
        }
      });

      // push data values into cart array in cart.js file. If product already exists increase only quantity
      if(matchingItem) {
        matchingItem.quantity += 1;
      } else {
        cart.push({
        productId,
        quanitySelector
        });
      };

      // making cart quantity element interactive. loop through cart and store the quanity value in variable(accumaltor pattern)
      let cartQuantity = 0;
      cart.forEach((item) => {
        cartQuantity += item.quanitySelector;
      });

      document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;

    });
  });