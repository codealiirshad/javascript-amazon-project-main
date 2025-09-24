import { cart, addToCart } from "../data/cart.js";
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

// update cart quantity using selector
function updateCartQuantity() {
  let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quanitySelector;
    });

    document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity;
};

// display message 'added' and set timeout for it to disappear
function addedMessageTimeout(productId) {

  let addedToCartElement = document.querySelector(`.js-added-to-cart-${productId}`);
  addedToCartElement.classList.add('show-added-to-cart');
  
  // first we check if there is any previous id in timeout obj. 
  // if it is then clear the interval.
  const previousTimeoutId = addedMessageTimeouts[productId];
  if(previousTimeoutId) {
    clearTimeout(previousTimeoutId);
  };

  // here we set timeout and assign a variable which we store into timeout object
  const timeoutId = setTimeout(() => {
    addedToCartElement.classList.remove('show-added-to-cart');
  }, 2000);

  // here we are assigning timeout object values of above variable
  addedMessageTimeouts[productId] = timeoutId;
};

// add to cart button. add items to cart, update cart quantity, and timeout for added message
document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      
      // getting data from data attribute on button
      const productId = button.dataset.productId;      

      /* it calls selector input and gets its value. Why did not i put it in update func?
       becaue i need to use this as a parameter for add to cart function and i can not call it from a function */
      let quanitySelectorElement = document.querySelector(`.js-quantity-selector-${productId}`);
      let quanitySelector = Number(quanitySelectorElement.value);

      addToCart(productId, quanitySelector); // invoke function to add items to cart
      updateCartQuantity(); // invoke function to update cart items'quantity
      
      addedMessageTimeout(productId); // invoke function to display message once button clicked
    
    });
  });